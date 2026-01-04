import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export function readCSVData(filePath: string) {
   // resolve relative to project root
    const absolutePath = path.resolve(process.cwd(), filePath);
    
    if (!fs.existsSync(absolutePath)) {
        throw new Error(`CSV file not found at ${absolutePath}`);
    }
    
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    });
}