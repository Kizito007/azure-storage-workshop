const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const path = require('path');
require("dotenv").config();

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error('Azure Storage Connection string not found');
}

// Create the BlobServiceClient object with connection string
const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
);


const createContainer = async () => {
    // Create a unique name for the container
    const containerName = 'store-' + uuidv1();
    console.log('\nCreating container...');
    console.log('\t', containerName);

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // Create the container
    const createContainerResponse = await containerClient.create();
    console.log(
        `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
    );
    return containerName;
}

const uploadBlobToContainer = async (containerName, localFilePath, originalname) => {

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Create a unique name for the blob
    const blobName = 'workshop-file-' + uuidv1() + `${originalname}`;

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Display blob name and url
    console.log(
        `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
    );

    const uploadBlobResponse = await blockBlobClient.uploadData(localFilePath);
    console.log(
        `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
    );
}

const listBlobsInContainer = async (containerName) => {
    // List the blob(s) in the container.
    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobs = []
    for await (const blob of containerClient.listBlobsFlat()) {
        // Get Blob Client from name, to get the URL
        const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);

        // Display blob name and URL
        const data = {
            blobName: blob.name,
            url: tempBlockBlobClient.url
        }
        blobs.push(data)
    }
    return blobs;
}

const downloadBlob = async (containerName, blobName) => {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = await containerClient.getBlobClient(blobName);

    const fileNameWithPath = path.join(__dirname, `${blobName}`);

    await blobClient.downloadToFile(fileNameWithPath);
    console.log(`download of ${blobName} success`);
    return fileNameWithPath.toString();
}

const deleteContainer = async (containerName) => {
    // Delete container
    console.log('\nDeleting container...');

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const deleteContainerResponse = await containerClient.delete();
    console.log(
        'Container was deleted successfully. requestId: ',
        deleteContainerResponse.requestId
    );
}

module.exports = {
    createContainer,
    uploadBlobToContainer,
    listBlobsInContainer,
    downloadBlob,
    deleteContainer,
}