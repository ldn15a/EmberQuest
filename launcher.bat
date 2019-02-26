SET pixiProjectPath=%~dp0

start firefox --new-window "localhost:8000"

cd %pixiProjectPath%

php -S localhost:8000 -t ./