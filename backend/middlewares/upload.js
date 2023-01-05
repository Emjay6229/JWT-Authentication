const express = require('express');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const connect = require("./backend/config/db");
const crypto = require('crypto');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');

// mount middleware
app.use(express.json);
app.use(methodOverride('_method'));

// Initialize gfs
let gfs;

connect.once('open', () => {
  gfs = Grid(connect.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Initialize storage engine
const storage = new GridFsStorage({
  url: 'mongodb://127.0.0.1:27017/chunkdatabase',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => { if (err) {
          return reject(err);
        }
const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

exports.upload = multer({ storage });