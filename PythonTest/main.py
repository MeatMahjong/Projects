import re
import cmd

if (match := re.match(r"(.+)\((.*)\)", input())) and match.group(1) == 'test':
    print(match.groups())