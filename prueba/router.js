import express from 'express'
const app = express()

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/hello", function (req, res) {
    res.sendFile('/public/index.html', {root: __dirname})
  });


export {app};