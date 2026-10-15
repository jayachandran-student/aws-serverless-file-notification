# ☁️ Serverless File Notification System

A serverless AWS solution that automatically sends email notifications whenever a file is uploaded to an S3 bucket. Built using AWS Lambda, S3, SNS, IAM, and CloudFormation.

---

## 🏗️ Architecture

```
User uploads file
      ↓
AWS S3 Bucket
(Object Created Event)
      ↓
AWS Lambda Function
(Processes event, formats message)
      ↓
AWS SNS Topic
(Publishes notification)
      ↓
Email Subscriber
(Receives alert 📧)
```

---

## 🛠️ Tech Stack

| Service | Purpose |
|---------|---------|
| AWS S3 | File storage and event trigger |
| AWS Lambda | Serverless function (Node.js 18.x) |
| AWS SNS | Email notification delivery |
| AWS IAM | Permissions and security roles |
| AWS CloudFormation | Infrastructure as Code (IaC) |

---

## ✨ Features

- ✅ Automatic email alerts on every S3 file upload
- ✅ Displays file name, bucket, size, and upload time
- ✅ Fully serverless — no servers to manage
- ✅ Secure IAM role with least-privilege permissions
- ✅ Infrastructure deployed via CloudFormation (IaC)
- ✅ Environment variables for sensitive configuration
- ✅ CloudWatch logging for monitoring and debugging

---

## 📁 Project Structure

```
aws-serverless-file-notification/
├── lambda/
│   └── index.js          # Lambda function code
├── template.yaml         # CloudFormation IaC template
├── .env.example          # Environment variable reference
└── README.md             # Project documentation
```

---

## 🚀 Deployment Guide

### Prerequisites
- AWS Account
- AWS CLI installed and configured
- Node.js 18.x

### Step 1 — Clone the repository
```bash
git clone https://github.com/jayachandran-student/aws-serverless-file-notification.git
cd aws-serverless-file-notification
```

### Step 2 — Configure environment variables
```bash
cp .env.example .env
# Edit .env with your values
```

### Step 3 — Deploy using CloudFormation
```bash
aws cloudformation deploy \
  --template-file template.yaml \
  --stack-name serverless-file-notification \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    NotificationEmail=your-email@gmail.com \
    BucketName=your-unique-bucket-name
```

### Step 4 — Confirm SNS subscription
- Check your email inbox
- Click the confirmation link from AWS SNS

### Step 5 — Test the system
```bash
# Upload a test file to your S3 bucket
aws s3 cp test-file.txt s3://your-unique-bucket-name/
```
- Check your email for the notification! 📧

---

## 📧 Sample Notification Email

```
Subject: S3 Upload Alert: test-file.txt

📁 New File Uploaded to S3!

Bucket  : serverless-file-notification-bucket
File    : test-file.txt
Size    : 2.45 KB
Time    : 2025-08-15T10:30:00.000Z

This is an automated notification from your
Serverless File Notification System.
```

---

## 🔐 Security

- IAM Role uses **least-privilege principle**
- Lambda only has permission to:
  - Read from S3
  - Publish to SNS
  - Write CloudWatch logs
- Sensitive values stored in **environment variables**
- No hardcoded credentials anywhere in the code

---

## 📊 How It Works

1. **S3 Event** — When a file is uploaded, S3 generates an `ObjectCreated` event
2. **Lambda Trigger** — S3 automatically invokes the Lambda function with event data
3. **Event Processing** — Lambda extracts file name, size, bucket, and timestamp
4. **SNS Publish** — Lambda publishes a formatted message to the SNS topic
5. **Email Delivery** — SNS delivers the notification to all subscribers

---

## 🧑‍💻 Author

**Jayachandran K**
- GitHub: [@jayachandran-student](https://github.com/jayachandran-student)
- LinkedIn: [jayachandran-k-6312ab376](https://www.linkedin.com/in/jayachandran-k-6312ab376)
- Email: jayachandran.k30@gmail.com

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
