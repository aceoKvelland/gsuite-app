if(require('electron-squirrel-startup')) return;
const { app, BrowserWindow } = require('electron')

const url = require('url')
const path = require('path')

let win;
let trayIcon = null;
trayIcon = path.join(__dirname, 'assets/gmail.png')

function createWindow() {
   win = new BrowserWindow(
      {
         width: 800, 
         height: 600, 
         title: 'Akeo-GSuit',
         icon: trayIcon,
         toolbar: true,
         webPreferences: {
            nativeWindowOpen: true
         },
         icon: path.join(__dirname, 'assets/icons/png/64x64.png')
      }
   )
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }));
   win.maximize();

}

app.on('ready', createWindow);