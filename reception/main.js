const { app, BrowserWindow } = require('electron');
const next = require('next');
const { exec } = require('child_process');
const fs = require('fs');
const express = require('express');
const path = require('path');

app.commandLine.appendSwitch('disable-gpu-sandbox');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const logFilePath = path.join(app.getPath('userData'), 'app.log');

function logToFile(message) {
  const logMessage = `${new Date().toISOString()} - ${message}`;
  console.log(logMessage);
  try {
    fs.appendFileSync(logFilePath, `${logMessage}\n`);
  } catch (error) {
    console.error('Failed to write to log file:', error);
  }
}

async function createWindow() {
  try {
    logToFile('Starting prisma generate');
    await execPromise('npx prisma generate');
    logToFile('Prisma generate completed');

    logToFile('Starting prisma db push');
    await execPromise('npx prisma db push');
    logToFile('Prisma db push completed');

    logToFile('Preparing Next.js');
    await nextApp.prepare();
    logToFile('Next.js prepared');

    const server = express();

    logToFile('Setting up Next.js request handler');
    server.all('*', (req, res) => handle(req, res));

    logToFile('Starting server on port 80');
    server.listen(80, (err) => {
      if (err) {
        logToFile(`Error starting server: ${err}`);
        throw err;
      }
      logToFile('Next.js server running on http://localhost:80');
      console.log('Next.js server running on http://localhost:80');

      logToFile('Creating Electron window');
      const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: true,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
      });

      mainWindow.webContents.openDevTools();

      mainWindow.once('ready-to-show', () => {
        mainWindow.show();
      });
      mainWindow.loadURL('http://localhost:80');
      logToFile('Electron window created and loaded URL http://localhost:80');

      // エラーハンドリング
      mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        logToFile(`Failed to load URL: ${errorDescription} (Error code: ${errorCode})`);
      });

      mainWindow.on('closed', () => {
        logToFile('Electron window closed');
      });
      mainWindow.loadURL('http://localhost:80');
      logToFile('Electron window created and loaded URL http://localhost:80');
    });
  } catch (error) {
    logToFile(`Error during createWindow: ${error.message}`);
  }
}

function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        logToFile(`Error executing command: ${command}\n${stderr}`);
        reject(err);
      } else {
        logToFile(`Command output: ${stdout}`);
        resolve(stdout);
      }
    });
  });
}

app.on('ready', () => {
  logToFile('App ready');
  createWindow();
});

app.on('window-all-closed', () => {
  logToFile('All windows closed');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  logToFile('App activated');
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
