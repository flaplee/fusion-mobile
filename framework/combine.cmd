cd /d %~dp0
terser src\qsa-scope.js src\svgClassList.js src\require.js src\browser.js src\init.js -c hoist_vars,unsafe,comparisons -m -o all.js