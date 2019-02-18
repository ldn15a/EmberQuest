SET pixiProjectPath=%~dp0

:: Open pixi application the prefered way
start chrome --new-window "http://127.0.0.1:8080"

::uncomment the next line and comment out the previous line if chrome isn't working due to permissions
::start firefox --new-window "http://127.0.0.1:8080"

::If you are still having trouble then you can change the address from "http://192.168.0.2:8080" to whatever ip is printed in command prompt

http-server %pixiProjectPath:%