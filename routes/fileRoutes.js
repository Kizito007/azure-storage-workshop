const express = require("express");
const fileRoute = express.Router();
const multer = require('multer')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '/uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const {
    downloadFile,
    uploadFile,
} = require("../controllers/fileController");

fileRoute.get("/download", downloadFile);
fileRoute.get("/list-blobs", downloadFile);
fileRoute.post("/upload", upload.single('file'), uploadFile);
fileRoute.delete("/", uploadFile);

module.exports = { fileRoute };