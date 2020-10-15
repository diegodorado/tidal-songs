import sys
import re
import subprocess

def split_on_empty_lines(s):
    # greedily match 2 or more new-lines
    blank_line_regex = r"(?:\r?\n){2,}"
    return re.split(blank_line_regex, s.strip())

def getchar():
   #Returns a single character from standard input
   import tty, termios, sys
   fd = sys.stdin.fileno()
   old_settings = termios.tcgetattr(fd)
   try:
      tty.setraw(sys.stdin.fileno())
      ch = sys.stdin.read(1)
   finally:
      termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)
   return ch
   
file = open("guide.tidal")
guide = file.read()
file.close()
steps = split_on_empty_lines(guide)

def print_step(i):
    a=steps[i].replace('"', '\\"')
    b=steps[i+1].replace('"', '\\"')
    args = "-n -w $'\033[30;41m' -x $'\033[0m' -y $'\033[30;42m' -z $'\033[0m'"
    cmd = f'wdiff {args} <(echo -e "{a}") <(echo -e "{b}") | colordiff'
    p = subprocess.Popen(cmd, shell=True, executable='/bin/bash', stdout=subprocess.PIPE)
    out = p.communicate()[0].decode('ascii')
    print("\033c", end="")
    sys.stdout.write(out)

s = 0
print_step(s)
while 1:
    ch = getchar()
    if ch=='j':
        s = s + 1
        print_step(s)
    elif ch=='k':
        s = s - 1
        print_step(s)
    else:
        break
