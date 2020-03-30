@echo off
set /p photo=请输入图片的名称,然后回车
set /p zip=请输入压缩包的名称,然后回车
set /p out=请输入输出文件的名称,然后回车
copy /b %photo%+%zip% %out%
pause