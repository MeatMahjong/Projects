from jinja2 import Environment, PackageLoader, select_autoescape
from dataclasses import dataclass
from os import listdir

env = Environment(
    loader=PackageLoader("test"),
    autoescape=select_autoescape()
)

@dataclass
class Link:
    url: str
    title: str


articles = [file for file in listdir("./templates") if file.startswith("article")]
links = [Link("/JinjaTest/articles/"+a, a) for a in articles]
for l in links:
    l.title = env.get_template(l.title).module.Title

template = env.get_template("layout.html", globals = {"Links": links})

for a in articles:
    a_tmp = env.get_template(a).module.Title
    with open("articles/"+a, "w") as out:
        print(template.render(Content=a, Title=a_tmp), file=out)
        
with open("index.html", "w") as out:
    print(template.render(Content="homepage.html", Title="Home"), file=out)