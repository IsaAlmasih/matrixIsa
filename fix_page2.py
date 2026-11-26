import re

path = r"src\app\commu\page.jsx"
src = open(path, encoding="utf-8-sig").read()

pat = re.compile(
    r"(\{error && <div className=\{styles\.chatError\}>\{error\}</div>\s*\n)"
    r"(\s*<span>[\s\S]*?</span>\s*\n)"
    r"(\s*</div>\s*\n)"
    r"(\s*\)\})"
)

def repl(m):
    return (
        m.group(1)
        + "                </div>\n"
        + "              ) : (\n"
        + "                <div className={styles.chatEmpty}>\n"
        + "                  <FiMessageCircle />\n"
        + m.group(2)
        + "                </div>\n"
        + "              )}"
    )

src, n = pat.subn(repl, src, count=1)

if n == 1:
    open(path, "w", encoding="utf-8").write(src)
    print("branch 2 inserted")
else:
    print("branch 2 NOT FOUND")
