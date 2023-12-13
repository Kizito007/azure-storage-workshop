const { uploadBlob } = require("../helpers/storageHelper");
// list items
// download

const uploadFile = async (req, res) => {
    try {
        const { buffer, originalname } = req.file
        // remove whitespaces
        const newName = originalname.replaceAll(" ", "")
        await uploadBlob(buffer, newName)

        res.status(200).send({
            message: "File uploaded successfully",
            status: 0,
        })
    } catch (err) {
        res.status(500).send({ data: {}, message: err.message });
    }
};

const downloadFile = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).send({ data: {}, message: err.message });
    }
};

const listItems = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).send({ data: {}, message: err.message });
    }
};

const deleteContainer = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).send({ data: {}, message: err.message });
    }
};

module.exports = {
    uploadFile,
    downloadFile,
    listItems,
    deleteContainer
}