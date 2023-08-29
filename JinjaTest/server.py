from flask import Flask, session, request, redirect, url_for, send_from_directory, render_template
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from argon2 import PasswordHasher
from dataclasses import dataclass
from datetime import timedelta
from os import listdir
import smtplib
import sqlite3
import time
import ssl

app = Flask(__name__, static_folder="/")
app.secret_key = "super_secret"
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=2)
app.config['SESSION_COOKIE_HTTPONLY'] = True

ph = PasswordHasher(memory_cost=131072, time_cost=1)

root = "C:/Users/marku/Documents/Projects/JinjaTest"

@dataclass
class user_record:
    email: str
    password: str

con = sqlite3.connect("users.db", check_same_thread=False)
cur = con.cursor()

cur.execute("CREATE TABLE IF NOT EXISTS users(username, displayname, email, password)")

@app.context_processor
def utility():
    def get_displayname(username):
        name = cur.execute(f"SELECT displayname FROM users WHERE username='{username}'").fetchone()
        if name is not None:
            return name[0]
        else: 
            return "__error"
    return dict(get_displayname=get_displayname)


@app.route("/")
def index():
    return render_template("homepage.html")

@app.route("/articles/<num>")
def articles(num):
    if "username" in session:
        return render_template(f"article{num}.html")
    return render_template("login_required.html")

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    dbpass = cur.execute(f"SELECT password FROM users WHERE username='{username}'").fetchone()
    if dbpass is not None and ph.verify(dbpass[0], password):
        session['username'] = username
        return redirect("/")
    else:
        return "Invalid login details"

register_message = '''
    An account has been created using your email address. If this was not you, please
    reply to this email (ignore the noreply), and I'll manually remove it. I
    haven't figured out how to do verification links yet.
'''
    
message = MIMEMultipart()
message["From"] = "noreply@markusme.com"
message["Subject"] = "Test"

message.attach(MIMEText(register_message, "plain"))
    
@app.route("/register", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        email = request.form['email']
        displayname = request.form['displayname']
        username = request.form['username']
        password = request.form['password']
        confirm = request.form['confirm']
        if cur.execute(f"SELECT EXISTS(SELECT 1 FROM users WHERE username='{username}')").fetchone()[0] == 1:
            return "Username already registered"
        elif cur.execute(f"SELECT EXISTS(SELECT 1 FROM users WHERE displayname='{displayname}')").fetchone()[0] == 1:
            return "Display name already used"
        elif password != confirm:
            return "Passwords don't match"
        else:
            context = ssl.create_default_context()
            smtpobj = smtplib.SMTP("smtp.gmail.com", 587)
            smtpobj.starttls(context=context)
            smtpobj.login("markus.m.eliassen@gmail.com", "lpbblxbtbcejhzfg")
            smtpobj.sendmail("noreply@markusme.com", email, message.as_string())

            #TODO: Send verification link, and create user after it is clicked
            cur.execute(f"INSERT INTO users VALUES ('{username}', '{displayname}', '{email}', '{ph.hash(password)}')")
            con.commit()
            return redirect("/")
    else:
        return render_template("register.html")

@app.route('/logout', methods=["post"])
def logout():
    session.pop('username', None)
    return redirect("/")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)