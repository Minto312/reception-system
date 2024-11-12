const { app, BrowserWindow } = require('electron');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

async function createWindow() {
  await nextApp.prepare(); // Next.jsの準備が完了するのを待つ

  const express = require('express');
  const server = express();

  // Next.jsのリクエストハンドラーを使用
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // サーバーをリッスン
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Next.js server running on http://localhost:3000');

    // Next.jsサーバーが立ち上がった後にElectronウィンドウを作成
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    mainWindow.loadURL('http://localhost:3000');
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
