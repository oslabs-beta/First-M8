const { app, BrowserWindow } = require("electron");
process.env.NODE_ENV === 'development' ? null : require("../server/server");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL("http://localhost:3001");
}

app.whenReady().then(() => {
  createWindow();

  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
  });

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
