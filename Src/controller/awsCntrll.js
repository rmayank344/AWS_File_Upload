const {AWSFileUpload} = require("../service/awsFileUpload");

const awsFileCntrl = async (req, res) => {
  try{
    // console.log("Request files:", req.files); // Log the incoming files
    if(req.files && req.files.media){
      const file = req.files.media;
      const result = await AWSFileUpload(file);
      return res.status(200).json(result);
    }

    return res.status(404).send({
      message: "FILE_NOT_FOUND",
      messageCode: "FILE_NOT_FOUND",
      statusCode: 404,
    });
  }
  catch(err){
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};


module.exports = { awsFileCntrl };