import AWS from "aws-sdk";

export const uploadToS3 = async (file, userId, folderName) => {
    AWS.config.update({
        credentials: {
            accessKeyId: process.env.AWS_KEY,
            secretAccessKey: process.env.AWS_SECRET,
        },
    });
    const { filename, createReadStream } = await file;
    const readStream = createReadStream();
    const objName = `${folderName}/${userId}-${Date.now()}-${filename}`;
    const { Location } = await new AWS.S3()
        .upload({
            Bucket: "instaclone-for-uploads",
            Key: objName,
            ACL: "public-read",
            Body: readStream,
        })
        .promise();
    return Location;
};