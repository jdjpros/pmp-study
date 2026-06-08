@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo PMP 학습 뷰어를 시작합니다...
echo.
node serve.js
pause
