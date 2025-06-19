import fs from 'fs';
import path from "path";

export function readFile(){
    const filepath=path.join('Data.txt');
    try {
        const data=fs.readFileSync(filepath,'utf-8');
        return data;
    } catch (error) {
        return "Error reading file"+ error.message
    }   
}
