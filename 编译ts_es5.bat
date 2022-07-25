@echo off
del /s /q %~dp0tsOut\
for	%%i in (%~dp0ts\*.ts) do (
	echo [start] %%i
	call tsc --lib es5,dom,es6 -t es5 %%i --outDir %~dp0tsOut\ 
	::call tsc --lib es5,dom -t es5 %%i --outDir %~dp0tsOut\ --allowJs true
	echo [down] %%i
	echo.
)
@pause