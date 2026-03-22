import { ipcMain } from "electron";

export default function setUpHandlers(db){
    ipcMain.handle('tasks:add',(_,title) => {
        return db.addTask(title);
    })
}