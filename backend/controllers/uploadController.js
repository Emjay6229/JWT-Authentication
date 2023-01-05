exports.uploadFile = (req, res) => {
    console.log("File Uploaded");
    res.json({ file: req.file});
    }