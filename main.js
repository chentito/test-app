const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

if (process.env.env !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    });

    win.loadFile('./src/views/index.html');
    win.on('close', () => {
        app.quit();
    });
};

const templateMenu = [
    {
        label: 'Sistema',
        submenu: [
            {
                label: 'Cerrar',
                acelerator: 'Ctrl+B',
                click(app) {
                    newWindow();
                }
            }
        ]
    }
];

const newWindow = () => {
    const newW = new BrowserWindow({
        width: 400,
        height: 300,
        title: 'New Window'
    });

    newW.loadFile('./src/views/new.html');
    newW.setMenu(null);
}

app.whenReady().then(() => {
    createWindow();

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'win32') app.quit();
});
