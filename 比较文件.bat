@echo off
setlocal enabledelayedexpansion

if "%1"=="" (set /p file1=请拖入第一个文件: ) else (set file1=%1)
if "%2"=="" (set /p file2=请拖入第二个文件: ) else (set file2=%2)
set vspath=C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional\Common7\IDE
::start "Compare files" /B /MIN "%vspath%\devenv.exe" /diff %1 %2 First:'%2' Second:'%1'
start "Compare files" /B /MIN "%vspath%\devenv.exe" /diff %file1% %file2% First:'%file2%' Second:'%file1%'
::pause
@echo off
REM set /a files=0
REM for %%t in (%*) do (
	REM if "%t%"=="" (echo.) else (set /a files=!files! + 1)
REM )
REM echo %files%
REM if %files% equ 0 (
	REM set /p file1=请拖入第一个文件: 
	REM set /p file2=请拖入第二个文件: 
REM )
REM if %files% equ 1 (
	REM set /p file2=请拖入第二个文件: 
	REM set file1=%1
REM ) else (
	REM set file1=%1
	REM set file2=%2
REM )