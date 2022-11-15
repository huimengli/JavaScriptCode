@echo off
del /s /q %~dp0tsOut\
for	%%i in (%~dp0ts\*.ts) do (
	echo [start] %%i
	call tsc --locale zh-CN --lib es5,dom -t es6 %%i --outDir %~dp0tsOut\
	echo [down] %%i
	echo.
)
@pause