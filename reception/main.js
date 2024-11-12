const { app, BrowserWindow } = require('electron');
const next = require('next');
const { exec } = require('child_process');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

function logToFile(message) {
  fs.appendFileSync('C:/Users/karinto/Music/reception-system/reception/dist/win-unpacked', `${new Date().toISOString()} - ${message}\n`);
}

async function createWindow() {
  logToFile('Starting prisma generate');
  exec('npx prisma generate', (err, stdout, stderr) => {
    if (err) {
      logToFile(`Error running prisma generate: ${stderr}`);
      console.error(`Error running prisma generate: ${stderr}`);
      return;
    }
    logToFile(`Prisma generate output: ${stdout}`);
    console.log(`Prisma generate output: ${stdout}`);
  });

  logToFile('Starting prisma db push');
  exec('npx prisma db push', (err, stdout, stderr) => {
    if (err) {
      logToFile(`Error running prisma db push: ${stderr}`);
      console.error(`Error running prisma db push: ${stderr}`);
      return;
    }
    logToFile(`Prisma db push output: ${stdout}`);
    console.log(`Prisma db push output: ${stdout}`);
  });

  logToFile('Preparing Next.js');
  await nextApp.prepare(); // Next.jsの準備が完了するのを待つ
  logToFile('Next.js prepared');

  const express = require('express');
  const server = express();

  logToFile('Setting up Next.js request handler');
  // Next.jsのリクエストハンドラーを使用
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  logToFile('Starting server on port 80');
  // サーバーをリッスン
  server.listen(80, (err) => {
    if (err) {
      logToFile(`Error starting server: ${err}`);
      throw err;
    }
    logToFile('Next.js server running on http://localhost:80');
    console.log('Next.js server running on http://localhost:80');

    logToFile('Creating Electron window');
    // Next.jsサーバーが立ち上がった後にElectronウィンドウを作成
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('http://localhost:80');
    logToFile('Electron window created and loaded URL http://localhost:80');
  });
}

app.on('ready-to-show', () => {
  logToFile('App ready-to-show');
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