SET pixiProjectPath=%~dp0

::  We have to use firefox because Chrome will throw permission errors which we can look into later. This is a security feature of Chrome
start firefox --new-window "http://127.0.0.1:8080"

http-server %pixiProjectPath:%
