if (require('electron-squirrel-startup')) return;
const { app, BrowserWindow, dialog, Menu } = require('electron')

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
   win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }));
   win.maximize();

   //Function for clearing cache
   const window = BrowserWindow.getAllWindows()[0]
   const ses = window.webContents.session
   const clearAppCache = () => {
      ses.clearCache(() => {
         dialog.showMessageBox({ type: 'info', buttons: ['OK'], message: 'Cache cleared.' })
      })
   }

   // Template for menu
   const menuTemplate = [
      {
         label: 'Edit',
         submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'delete' },
            { role: 'selectall' }
         ]
      },
      {
         label: 'View',
         submenu: [
           { role: 'reload' },
           { role: 'forcereload' },
           { type: 'separator' },
           { role: 'resetzoom' },
           { role: 'zoomin' },
           { role: 'zoomout' },
           { type: 'separator' },
           { role: 'togglefullscreen' }
         ]
       },
       {
         role: 'window',
         submenu: [
           { role: 'minimize' },
           { role: 'close' }
         ]
       },
      {
         label: 'Maintenance',
         submenu: [
            {
               label: 'Clear History',
               click: () => { win.webContents.clearHistory(dialog.showMessageBox({ type: 'info', buttons: ['OK'], message: 'History cleaned.' })) }
            },
            {
               label: 'Clear Cache',
               click: () => { clearAppCache() }
            },
            {
               label: 'Clear Storage Data',
               click: () => { win.webContents.session.clearStorageData(dialog.showMessageBox({ type: 'info', buttons: ['OK'], message: 'Storage data cleaned.' })) }
            },
            {
               label: 'Check Cache Size',
               click: () => { win.webContents.session.getCacheSize((size) => dialog.showMessageBox({ type: 'info', buttons: ['OK'], message: `Cache size is: ${size} bytes.` })) }
            }
         ]
      },
      {
         role: 'Help',
         submenu: [
            {
               label: 'Learn More',
               click: () => { require('electron').shell.openExternal('http://akeo.tech') }
            },
            {
               label: 'Author',
               click: () => { require('electron').shell.openExternal('http://akeo.tech') }
            }
         ]
      }
   ]


   const menu = Menu.buildFromTemplate(menuTemplate)

   Menu.setApplicationMenu(menu)

}

app.on('ready', createWindow);