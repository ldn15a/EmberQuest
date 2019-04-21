SET pixiProjectPath=%~dp0

start firefox --new-window "index.html"

cd %pixiProjectPath%

php -S localhost:8000 -t ./
