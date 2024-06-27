import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const saveBase64Image = (base64, destPath) => {
    const buffer = Buffer.from(base64, 'base64');
    fs.writeFileSync(destPath, buffer);
};

// Multer storage configuration
const uploadMiddleware = async (req, res, next) => {
    const { serial_number, image } = req.body;
    if (image && serial_number) {
        const destPath = path.join('/home/karthik/Image Gallery Website/IGW-FE/src/assets/images', `${serial_number}.jpg`);
        saveBase64Image(image, destPath);
        req.file = { path: destPath }; 
    }
    next();
};

export default uploadMiddleware;