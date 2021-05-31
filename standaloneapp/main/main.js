const { app, BrowserWindow } = require('electron')
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadURL('file://' + path.join(__dirname, '../client/index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
  });

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
})