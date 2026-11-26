import re

path = r"src\app\commu\page.jsx"
src = open(path, encoding="utf-8").read()
report = []

# 1) озвращаем пропавшую ветку "Требуется вход"
anchor = ') : messagesAuthStatus === "error" ? ('
block = (
    '{messagesAuthStatus === "unauthenticated" ? (\n'
    '          <div className={styles.authPrompt} role="alert">\n'
    '            <strong>Требуется вход</strong>\n'
    '            <Link href="/LoginPage" className={styles.authLink}>\n'
    '              вторизоваться\n'
    '            </Link>\n'
    '          </div>\n'
)
if anchor in src and 'messagesAuthStatus === "unauthenticated" ? (' not in src:
    src = src.replace(anchor, block + anchor, 1)
    report.append("branch 1 inserted")
else:
    report.append("branch 1 NOT FOUND")

# 2) озвращаем закрытие окна чата и заглушку "ыберите диалог"
pat = re.compile(
    r'\{error && <div className=\{styles\.chatError\}>\{error\}</div>\s*\n'
    r'\s*<span>\s*\n\s*ыберите пользователя слева или найдите нового собеседника\s*\n'
    r'\s*</span>\s*\n\s*</div>\s*\n\s*\)\}'
)
repl = (
    '{error && <div className={styles.chatError}>{error}</div>}\n'
    '              </div>\n'
    '            ) : (\n'
    '              <div className={styles.chatEmpty}>\n'
    '                <FiMessageCircle />\n'
    '                <strong>ыберите диалог</strong>\n'
    '                <span>\n'
    '                  ыберите пользователя слева или найдите нового собеседника\n'
    '                </span>\n'
    '              </div>\n'
    '            )}'
)
src, n = pat.subn(lambda m: repl, src, count=1)
report.append("branch 2 inserted" if n == 1 else "branch 2 NOT FOUND")

open(path, "w", encoding="utf-8").write(src)
print("\n".join(report))
