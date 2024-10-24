@echo off
REM Change to the directory where the .bat file is located
cd /d "%~dp0"

REM Step 1: Install Dependencies
echo.
echo Installing dependencies...
echo ===============================
call npm install --omit=dev
call npm install -g serve
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: npm install failed.
    echo Please check the error messages above.
    echo Exiting script.
    pause
    exit /b %ERRORLEVEL%
)
echo Dependencies installed successfully.
echo ===============================

REM Step 2: Start the Production Server
echo.
echo Starting the production server...
echo ===============================
REM start http://localhost:3000
call serve -s build
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to start the production server.
    echo Please check the error messages above.
    echo Exiting script.
    pause
    exit /b %ERRORLEVEL%
)