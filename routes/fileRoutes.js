const express = require("express");
const fileRoute = express.Router();

const {
    downloadFile,
    uploadFile,
} = require("../controllers/fileController");

fileRoute.get("/download", downloadFile);
fileRoute.get("/list-blobs", downloadFile);
fileRoute.post("/upload", uploadFile);
fileRoute.delete("/", uploadFile);

module.exports = { fileRoute };