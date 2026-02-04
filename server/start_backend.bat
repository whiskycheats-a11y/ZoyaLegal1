@echo off
set NODE_PATH="C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Microsoft\VisualStudio\NodeJs\node.exe"
echo Starting ZoyaLegal Backend...
%NODE_PATH% --watch index.js
pause
