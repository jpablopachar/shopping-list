const electron = require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow} = electron;

let mainWindow;

// Escuchar para que la aplicación esté lista
app.on('ready', function(){
    // Crea una nueva pantalla
    mainWindow = new BrowserWindow({});
    // Carga html en la pantalla
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));
})