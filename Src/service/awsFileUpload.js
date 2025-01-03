const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require("dotenv").config();

// Log to verify values
console.log("AWS Region:", process.env.AWS_REGION);
console.log("AWS Access Key ID:", process.env.AWS_ACCESS_KEY_ID);
console.log("AWS Secret Access Key:", process.env.AWS_SECRET_ACCESS_KEY);
console.log("AWS Bucket Name:", process.env.AWS_BUCKET);


//Configure AWS
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


const AWSFileUpload = async (file) => {
  try {
    // Upload a file

    const fileName = `${file.name}`;
    const mimetype = file.mimetype;
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: fileName,
      Body: file.data,
      ContentType: mimetype,
      ACL: "public-read",
    };

    // Upload file to S3
    const command = new PutObjectCommand(params);
    const uploadResult = await s3Client.send(command);
    console.log('File uploaded successfully.', uploadResult);

    // Return the file URL
    const fileUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    return {
      success: true,
      fileUrl: fileUrl,
      message: "File uploaded successfully!",
    };

  }
  catch (err) {
    console.error("Error in AWS upload service:", err.message);
    throw new Error(err.message);
  }
};


module.exports = { AWSFileUpload };