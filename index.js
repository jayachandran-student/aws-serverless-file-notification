import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({ region: process.env.AWS_REGION || "ap-south-1" });

export const handler = async (event) => {
  console.log("S3 Event received:", JSON.stringify(event, null, 2));

  try {
    // Extract S3 event details
    const record = event.Records[0];
    const bucketName = record.s3.bucket.name;
    const objectKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));
    const objectSize = record.s3.object.size;
    const eventTime = record.eventTime;

    // Format file size
    const fileSizeKB = (objectSize / 1024).toFixed(2);

    // Build notification message
    const message = `
📁 New File Uploaded to S3!

Bucket  : ${bucketName}
File    : ${objectKey}
Size    : ${fileSizeKB} KB
Time    : ${eventTime}

This is an automated notification from your Serverless File Notification System.
    `.trim();

    const subject = `S3 Upload Alert: ${objectKey}`;

    // Publish to SNS topic
    const command = new PublishCommand({
      TopicArn: process.env.SNS_TOPIC_ARN,
      Message: message,
      Subject: subject,
    });

    const response = await snsClient.send(command);
    console.log("SNS notification sent successfully:", response.MessageId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Notification sent successfully",
        messageId: response.MessageId,
        file: objectKey,
        bucket: bucketName,
      }),
    };
  } catch (error) {
    console.error("Error processing S3 event:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to send notification",
        error: error.message,
      }),
    };
  }
};
