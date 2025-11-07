#  AWS Serverless Text-to-Speech Application

This project is a **serverless text-to-speech (TTS) application** powered by AWS.  
Users can enter text via a web frontend, which calls an **API Gateway** endpoint. The request triggers a **Lambda function** that uses **Amazon Polly** to synthesize speech. The generated audio is stored in an **S3 bucket**, where it can be retrieved via API or direct download.

---


[![AWS Lambda](https://img.shields.io/badge/Runtime-Node.js%2018.x-green)](https://aws.amazon.com/lambda/)  
![Status](https://img.shields.io/badge/Status-Active-success)  
![License](https://img.shields.io/badge/License-MIT-lightgrey)  

---

##  Live Demo
👉 [Use the App Here](https://tts-website-diya.s3.us-east-1.amazonaws.com/index.html)

---

##  Project Overview

###  Objectives
- Build a **scalable, cost-effective serverless application**.  
- Integrate **Amazon Polly** for speech synthesis.  
- Expose APIs for **text-to-speech conversion** and **task retrieval**.  
- Deploy infrastructure using **AWS SAM**.  
- Demonstrate **IAM roles, S3 lifecycle policies, and CORS with API Gateway**.  

---

##  Architecture

<img width="610" height="374" alt="image" src="https://github.com/user-attachments/assets/6d41d282-f4df-4643-926a-c9cf7442fe0d" />



### Components
1. **Frontend (Static Website)** → Hosted in S3, allows users to input text.  
2. **API Gateway** → Handles `/synthesize` and `/task/{id}` endpoints.  
3. **Lambda Function** → Invokes Amazon Polly, stores audio in S3.  
4. **S3 Audio Bucket** → Stores generated audio with a 30-day lifecycle policy.  
5. **IAM Role** → Grants Lambda access to Polly, S3, and CloudWatch Logs.  

### Flow
1. User submits text → API Gateway.  
2. API Gateway triggers Lambda.  
3. Lambda calls Polly → generates speech.  
4. Audio file is written to S3.  
5. User retrieves audio via API or S3 URL.  

---

## ⚙️ Implementation Phases

### Phase 1: Infrastructure Foundation
- Researched AWS services (S3, Lambda, API Gateway, IAM).  
- Designed **`template.yaml`** with AWS SAM.  

### Phase 2: Backend Logic
- Integrated Polly with Lambda.  
- Configured S3 bucket for audio storage.  
- Added error handling & CORS headers.  
- Secured IAM role with least-privilege.  

### Phase 3: Deployment & CI/CD
- Deployed with `sam build` + `sam deploy --guided`.  
- Tracked configs in `samconfig.toml`.  
- Cleaned repo with `.gitignore`.  
---
## 1. Security Considerations
 
- **IAM Least-Privilege Access**: Ensure Lambda roles are restricted to only required services (e.g., Polly + S3).  
- **API Gateway Security**: Apply rate limiting, request validation, and CORS restrictions to protect endpoints.  
- **Data Protection**: Keep S3 buckets private and enforce secure access policies.  
- **Temporary Access**: Use pre-signed URLs for controlled and time-limited file retrieval.  
- **Input Validation**: Sanitize and validate user inputs to prevent malicious payloads and injection attacks.  
 
---
 
## 2. Cost Optimization
 
- **Serverless Pay-as-You-Go Model**: Leverage Lambda and API Gateway to avoid upfront infrastructure costs.  
- **S3 Lifecycle Policies**: Automatically delete audio files after a set time to save on storage costs.  
- **CloudWatch Monitoring**: Track execution time and optimize performance to reduce costs.  
- **CloudFront Caching**: Cache static and frequently accessed content to reduce repeated API calls and bandwidth usage.  
 
---
---

##  AWS Services Used
- **AWS Lambda** – serverless compute  
- **Amazon Polly** – text-to-speech  
- **Amazon S3** – website hosting + audio storage  
- **Amazon API Gateway** – RESTful APIs with CORS  
- **IAM Roles/Policies** – secure access  
- **AWS SAM** – IaC (Infrastructure as Code)  

---

##  Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| CORS errors in API Gateway | Defined `AWS::Serverless::Api` with CORS config |
| Invalid CORS under Lambda events | Moved config to API resource definition |
| Secrets accidentally committed | Added `.gitignore`, reset history |
| S3 bucket name conflicts | Used unique bucket names (`tts-website-diya`, `tts-audio-diya`) |

---

##  Future Improvements
- Add **CloudFront + TLS certificate** for HTTPS delivery.  
- Require **API keys / Cognito authentication**.  
- Support **multipart audio for long text**.  
- Automate deploys with **GitHub Actions CI/CD**.  

---

##  For Developers

###  Features
- Convert text → speech using **Amazon Polly**.  
- Audio stored securely in S3 (auto-expires after 30 days).  
- REST APIs:
  - `POST /synthesize` → generate audio  
  - `GET /task/{taskId}` → check synthesis status  
- Static website hosted in S3.  
- Infrastructure managed with SAM.  

---

