const express = require("express");
const router = new express.Router();
const fileUpload = require("express-fileupload");
const { awsFileCntrl } = require("../controller/awsCntrll");


// Middleware for file upload handling with size limit
router.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit: 5 MB
    useTempFiles: false, // Optional: Disables temp file usage
  })
);



router.post("/upload", awsFileCntrl);

module.exports = router;