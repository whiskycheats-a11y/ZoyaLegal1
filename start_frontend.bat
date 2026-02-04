@echo off
set NODE_PATH="C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Microsoft\VisualStudio\NodeJs\node.exe"
echo Starting ZoyaLegal Frontend (Vite)...
%NODE_PATH% node_modules/vite/bin/vite.js
pause
