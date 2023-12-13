// list items
// upload
// download

const uploadFile = async (req, res) => {
    try {

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