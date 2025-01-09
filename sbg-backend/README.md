# SBG To-Do App

This project is a simple **To-Do Application** built using **AWS CDK**, **DynamoDB**, **Lambda**, **API Gateway**, and **React**. It demonstrates a serverless backend and frontend for managing to-do items.

## Features
- Add, update, delete, and fetch to-do items.
- Serverless architecture using AWS Lambda and API Gateway.
- DynamoDB for storing to-do items.
- React frontend for user interaction.

## Architecture Overview

1. **Frontend**: A React app built for interacting with the backend.
2. **Backend**: A serverless REST API implemented using AWS Lambda, API Gateway, and DynamoDB.
3. **Infrastructure**: Provisioned using AWS CDK in TypeScript.

### AWS Resources
- **DynamoDB Table**: Stores the to-do items.
- **AWS Lambda**: Handles the CRUD operations for the to-do items.
- **API Gateway**: Exposes RESTful endpoints for the frontend.

---

## Prerequisites

1. **AWS CLI**: [Install Guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
2. **AWS CDK**: [Install Guide](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html)
   ```bash
   npm install -g aws-cdk
   ```
3. **Node.js**: Install the latest LTS version from [Node.js Official Site](https://nodejs.org/).
4. **React**: Use `create-react-app` to scaffold the frontend.

---

## Backend Setup

### Folder Structure
```
sbg-assigment/
|-- sbg-backend/          # Backend project directory
|   |-- lib/              # CDK stack definition
|   |-- lambda/           # Lambda function code
|   |-- cdk.json          # CDK configuration
|-- README.md
```

### Steps to Deploy the Backend

1. **Navigate to the backend directory**:
   ```bash
   cd sbg-assigment/sbg-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Deploy the CDK stack**:
   ```bash
   cdk bootstrap
   cdk deploy
   ```
   
4. **Output**:
   After deployment, you’ll see the API Gateway URL in the terminal. This URL will be used to interact with the backend.
   Example:
   ```
   Outputs:
   SbgBackendStack.APIEndpoint = https://<api-id>.execute-api.<region>.amazonaws.com/prod/
   ```

---

## Lambda Function Overview

The Lambda function implements CRUD operations using **AWS SDK v3**. Key methods include:

- **GET**: Fetch all to-do items from DynamoDB.
- **POST**: Add a new to-do item.
- **PUT**: Update an existing to-do item.
- **DELETE**: Remove a to-do item.

---

## API Endpoints

### Base URL:
`https://<api-id>.execute-api.<region>.amazonaws.com/prod`

### Endpoints:
- **GET** `/todos`: Fetch all to-do items.
- **POST** `/todos`: Add a new to-do item.
- **PUT** `/todos`: Update an existing to-do item.
- **DELETE** `/todos`: Delete a to-do item.

---

## Cleanup

To delete the resources created by the CDK stack:
```bash
cd sbg-assigment/sbg-backend
cdk destroy
```

---

