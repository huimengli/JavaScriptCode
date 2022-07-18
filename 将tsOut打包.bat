::set a;
@echo off
echo [info] this part need webpack
set /a index=0
for %%i in (%~dp0tsOut\*.js) do (
	set a=%a% %%i
	set /a index+=1
	echo [addFile] file%index%: %%i
)
::echo %a%
echo.
echo [start]
call webpack --mode=development %a% -o %~dp0script\
echo [end]
::pause>nul
pause