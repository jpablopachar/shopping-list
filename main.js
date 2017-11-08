const electron = require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

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

    // Salir de la aplicación cuando se cierre una ventana
    mainWindow.on('closed', function() {
        app.quit();
    });

    // Crear menú desde la plantilla
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insertar Menú
    Menu.setApplicationMenu(mainMenu);
});

// Creación de una nueva ventana
function createAddWindow() {
    // Crea una nueva pantalla
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Agregar elemento a la lista de compras'
    });
    // Carga html en la pantalla
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file',
        slashes: true
    }));
    // Manejador de recolector de basura
    addWindow.on('close', function() {
        addWindow = null;
    });
}

// Creación del menú principal
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Agregar elemento',
                click() {
                    createAddWindow();
                }
            },
            {
                label: 'Limpiar elementos'
            },
            {
                label: 'Cerrar',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// Si es mac, agregamos un objeto vacio al menú
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// Agregamos las herramientas de desarrollador si no está en producción
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Herramientas de desarrollador',
        submenu: [
            {
                label: 'Palanca para herramientas de desarrollador',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}