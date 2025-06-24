import fs from 'fs';
import path from 'path';
const dbpath=path.json(__dirname,"..","db.json")


export async function readDB(){
    try {
        const data=await fs.readFile(dbpath,'utf-8');
        return JSON.parse(data || "[]");
    } catch(error){
        if(error.code==="ENOENT"){
            await fs.writeFile(dbpath,'[]','utf-8');
            return [];
        }
        throw error;
    }
}

export async function writeDB(data){
    await fs.writeFile(dbpath, JSON.stringify(data,null,2))
}

