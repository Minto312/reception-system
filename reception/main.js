const { app, BrowserWindow } = require('electron');
const next = require('next');
const { exec } = require('child_process'); 

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

async function createWindow() {
  exec('npx prisma generate', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error running prisma generate: ${stderr}`);
      return;
    }
    console.log(`Prisma generate output: ${stdout}`);
  });

  exec('npx prisma db push', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error running prisma db push: ${stderr}`);
      return;
    }
    console.log(`Prisma db push output: ${stdout}`);
  });

  await nextApp.prepare(); // Next.jsの準備が完了するのを待つ

  const express = require('express');
  const server = express();

  // Next.jsのリクエストハンドラーを使用
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // サーバーをリッスン
  server.listen(3001, (err) => {
    if (err) throw err;
    console.log('Next.js server running on http://localhost:3001');

    // Next.jsサーバーが立ち上がった後にElectronウィンドウを作成
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    mainWindow.loadURL('http://localhost:3001');
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
