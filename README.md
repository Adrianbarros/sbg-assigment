# SBG Assignment

Hello to the team at SBG Funding! Here is a bit of the overview of my porject and how to run it. The backend and API will be hosted and the only requirement will be the front end. I wish I had more time to make it better looking but I did my best to show some nice code.

I left the link for my backend just in case but feel free to use the lambda to use yours. I also needed some manual chnages for the AWS API gateway so results may vary. Please contact me if there are any questions or discrepancy with my resultts and your local machine.


## Technologies Used

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-FF9900?style=for-the-badge&logo=awslambda&logoColor=white)
![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?style=for-the-badge&logo=amazondynamodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v14 or later)
- Yarn (v1.22 or later)
- AWS CLI (configured with appropriate permissions)

## Backend Setup

1. **Navigate to the backend directory:**

    ```bash
    cd /Users/adrianbarros/projects/sbg-assigment/sbg-backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Deploy the AWS Lambda function:**

    Ensure you have the AWS CLI configured with the necessary permissions to deploy Lambda functions and create DynamoDB tables.

    ```bash
    cdk deploy
    ```

    This command should deploy your Lambda function and set up the necessary DynamoDB table.

## Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd /Users/adrianbarros/projects/sbg-assigment/sbg-frontend
    ```

2. **Install dependencies:**

    ```bash
    yarn install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root of the frontend directory and add the following line:

    ```env
    REACT_APP_API_URL=https://erggojv4mj.execute-api.us-east-2.amazonaws.com/prod/todos
    ```

    Replace the URL with your backend endpoint

4. **Start the development server:**

    ```bash
    yarn start
    ```

    This command should start the development server and open the application in your default web browser.

## Usage

Once both the frontend and backend are set up, you can use the To-Do application as follows:

1. **Add a Task:**
    - Enter a task in the input field and click the "Add Task" button.
    - The task will be added to the list and saved in the DynamoDB table.

2. **Toggle Task Completion:**
    - Click the checkbox next to a task to mark it as completed or incomplete.
    - The task's completion status will be updated in the DynamoDB table.

3. **Delete a Task:**
    - Click the delete button (garbage can icon) next to a task to delete it.
    - The task will be removed from the list and deleted from the DynamoDB table.

## API Endpoints

The backend provides the following API endpoints:

- **GET /todos**
    - Fetch all to-do items.
    - Response: `200 OK` with a JSON array of to-do items.

- **POST /todos**
    - Create a new to-do item.
    - Request body: JSON object with `id`, `task`, and `completed` fields.
    - Response: `201 Created` with the created to-do item.

- **PUT /todos**
    - Update an existing to-do item.
    - Request body: JSON object with `task` and `completed` fields.
    - Response: `200 OK` with the updated to-do item.

- **DELETE /todos**
    - Delete a to-do item.
    - Response: `200 OK` with a message indicating the item was deleted.


