const { app, BrowserWindow } = require('electron');
// eslint-disable-next-line no-unused-expressions
process.env.NODE_ENV === 'development' ? null : require('../server/server');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL('http://localhost:3001');
}

app.whenReady().then(() => {
  createWindow();

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
