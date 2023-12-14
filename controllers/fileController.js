const { createContainer, uploadBlobToContainer, listBlobsInContainer, deleteContainer, downloadBlob } = require("../helpers/storageHelper");

const createContain = async (req, res) => {
    try {
        const container = await createContainer()
        res.status(200).send({
            data: container,
            message: "Container Created successfully",
            status: 0,
        })
    } catch (err) {
        res.status(500).send({ data: {}, message: err.message });
    }
};

const uploadFile = async (req, res) => {
    try {
        const { buffer, originalname } = req.file
        const { containerName } = req.body
        // remove whitespaces
        const newName = originalname.replaceAll(" ", "")
        await uploadBlobToContainer(containerName, buffer, newName)

        res.status(200).send({
            message: "File uploaded successfully",
            status: 0,
        })
    } catch (err) {
        res.status(500).send({ data: {}, message: err.message });
    }
};

const listItems = async (req, res) => {
    try {
        const { containerName } = req.query
        const blobs = await listBlobsInContainer(containerName)

        res.status(200).send({
            data: blobs,
            message: `Blob List in Container: ${containerName}`,
            status: 0,
        })
    } catch (err) {
        res.status(500).send({ data: {}, message: err.message });
    }
};

const downloadFile = async (req, res) => {
    try {
        const { containerName, blobName } = req.query
        const file = await downloadBlob(containerName, blobName)

        res.download(file); // Set disposition and send it.
    } catch (err) {
        res.status(500).send({ data: {}, message: err.message });
    }
};

const deleteContain = async (req, res) => {
    try {
        const { containerName } = req.query
        await deleteContainer(containerName)

        res.status(204).send({
            message: `Container Deleted`,
            status: 0,
        })
    } catch (err) {
        res.status(500).send({ data: {}, message: err.message });
    }
};

module.exports = {
    createContain,
    uploadFile,
    downloadFile,
    listItems,
    deleteContain
}