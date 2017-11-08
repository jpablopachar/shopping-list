const electron = require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow, Menu} = electron;

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

    // Crear menú desde la plantilla
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insertar Menú
    Menu.setApplicationMenu(mainMenu);
});

// Creación del menú principal
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item'
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];