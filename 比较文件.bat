@echo off
setlocal
set vspath=C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional\Common7\IDE
start "Compare files" /B /MIN "%vspath%\devenv.exe" /diff %1 %2 First:'%2' Second:'%1'