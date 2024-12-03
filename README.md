# Problem Statement

 ## `.env` file is not working in the frontend application. so i have to use `config.json` file to load the backend url. and Create `Nginx` file to serve the frontend application and `config.json` file.
 
  - security group e `4100` allow korsi
  - Ensure that the firewall on the host allows traffic on port 4100
  ```bash
  sudo ufw status
  sudo ufw allow 4100
  ```
  - forntedn and backend host is in same instance; but private instance; so er jonno amader `Nginx` server e backend & forntend 2 takei Load balancer hisabe save korte hobe. orthat frontend docker run korar somoy `docker run -d -e VITE_BACKEND_URL=http://172.17.0.2:4100 -p 80:80 --name frontend-reacts ismailkhandokar/frontend-todo:latest` ai VITE_BACKEND_URL e backend er ip address dile kaj korbe na; tai `Nginx` default configuration e `server 12.0.2.182:4100; # Backend server` sate kore disi; akhon amra frontend docker run korar somoy env hisabe `<nginx-public-ip>/api` dile backend er ip address load hobe. er mane 
  ```bash
  docker run -d -e VITE_BACKEND_URL=http://<nginx-public-ip>/api -p 80:80 --name frontend-reacts ismailkhandokar/frontend-todo:latest
  ```

  ## Backend and Databse separate private instance
   - in Security group e `4100, 5432` port allow korsi
   ### Database: 
   - first run docker compose file
   ```bash
   docker compose up -d
   ```
   - Ensure the client has psql or any PostgreSQL-compatible client installed. For example, to install the psql client
   ```bash
   sudo apt update && sudo apt install postgresql-client -y
   ```
   - Use psql to connect to the default postgres database: (for testing purpose)
   ```bash
   psql postgresql://postgres:postgres@12.0.137.111:5432/postgres
   ```

   ### Backend:
   - run backend docker image
   ```bash
   sudo docker run -d -e DATABASE_URL=postgresql://postgres:postgres@12.0.137.111:5432/my_db -p 4100:4100  --name test-backend ismailkhandokar/backend-todo
   ```
   - but we connect with new database(another private instance); so now we `exec` in interactive mode; 
   - we use alpine version so we use `sh` instead of `bash`
   ```bash
   sudo docker exec -it test-backend /bin/sh
   ```
   - nstall Node.js and npm (if not already installed)
   ```bash
   apk update
   apk add --no-cache nodejs npm
   ```
   - then we run this command to generate database schema
   ```bash
   npx prisma migrate dev --name init
   ```

# Backend Application

## Description
This is a backend application built with Node.js, Express, and TypeScript. It provides a RESTful API for managing a to-do list, including functionalities to create, read, update, and delete to-do items. The application is instrumented with OpenTelemetry for observability.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Docker Setup](#docker-setup)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [License](#license)

## Features
- RESTful API for managing to-do items
- Health check endpoint
- OpenTelemetry integration for monitoring
- CORS support
- Logging with Morgan

## Technologies
- Node.js
- Express
- TypeScript
- PostgreSQL
- OpenTelemetry
- Docker
- Prisma

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/khandokarIsmailDev/todo-porject-frontend_backend
   cd todo-porject-frontend_backend
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your PostgreSQL database and update the `.env` file with your database connection string.

## Usage
To run the application in development mode, use the following command:


The application will be available at `http://localhost:4100`.

### API Endpoints
- `GET /health`: Check if the server is running.
- `POST /todos`: Create a new to-do item.
- `GET /todos`: Retrieve all to-do items.
- `PUT /todos`: Update an existing to-do item.
- `DELETE /todos`: Delete a to-do item.

## Docker Setup
To build and run the application using Docker, follow these steps:

1. Build the Docker image:
   ```bash
   docker build -t your-dockerhub-username/backend:latest .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 --env-file .env your-dockerhub-username/backend:latest
   ```

## Deployment
To deploy the application to Docker Hub and AWS, follow these steps:

1. **Push to Docker Hub**:
   ```bash
   docker push your-dockerhub-username/backend:latest
   ```

2. **Deploy on AWS**:
   - **ECS**: Create a new ECS cluster and define a task definition using your Docker image.
   - **Elastic Beanstalk**: Create a new Elastic Beanstalk application and specify your Docker image from Docker Hub.

## Environment Variables
The application requires the following environment variables, which can be set in a `.env` file:




# Frontend Application

# Projectify

Projectify is a task management application built with React. It allows users to manage their tasks by categorizing them into different states: Todo, In Progress, Done, and Revised. The application utilizes React Context for state management and integrates with a backend API for data persistence.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Reducers](#reducers)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add, edit, and delete tasks
- Categorize tasks into different states
- Search functionality to filter tasks
- Responsive design

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/projectify.git
   cd projectify
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Adding Tasks**: Use the "Add Task" button to open a modal and enter your task details.
- **Editing Tasks**: Click on a task to edit its details.
- **Deleting Tasks**: Click the delete button on a task to remove it from the list.
- **Searching Tasks**: Use the search bar to filter tasks by name.

## Docker Setup/Example
```bash
docker run -d -e VITE_BACKEND_URL=http://localhost:4100 -p 80:80 --name frontend-react ismailkhandokar/frontend-todo:latest
```

```bash
docker run -d -e DATABASE_URL="postgresql://avnadmin:AVNS_CGNOShqKyekuJCPSRH4@pg-191501c4-mssumaya20211-90d3.e.aivencloud.com:27958/defaultdb?sslmode=require" -p 4100:4100 --name backend-todo ismailkhandokar/backend-todo:latest
```


## Components

### TodoBoard

The main component that displays the task lists. It categorizes tasks into four sections: Todo, In Progress, Done, and Revised. It also handles the modal for adding and editing tasks.

- **State Management**: Uses `useContext` to access the global state from `TodoContext` and `SearchContext`.
- **Task Categorization**: Uses `useEffect` to filter and categorize tasks based on the search input.

### TodoAdd

A component for adding new tasks. It opens a modal where users can input task details.

### Todo

Displays the list of tasks in the Todo category. It allows users to delete or edit tasks.

### OnProgress, Done, Revised

These components display tasks in their respective categories, similar to the Todo component.

### Modal

A reusable modal component for adding and editing tasks.

## Reducers

### TodoReducer

The reducer manages the state of tasks. It handles the following actions:

- **SET_TODO_ALL**: Sets the entire list of tasks.
- **EDIT_TASK**: Edits a specific task based on its ID.






# OpenTelemetry Tracing Implementation

install the dependencies:
```bash
npm i @opentelemetry/sdk-node @opentelemetry/exporter-otlp-grpc @opentelemetry/auto-instrumentations-node 
```




# Pulumi Infrastructure as Code (IaC) for AWS

This project uses Pulumi to provision AWS infrastructure resources, including a Virtual Private Cloud (VPC), subnets, route tables, security groups, and EC2 instances. The infrastructure is designed to support a web application with public and private components.

## Table of Contents

- [Project Description](#project-description)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Resources Created](#resources-created)
- [Usage](#usage)
- [License](#license)

## Project Description

This Pulumi project sets up a basic AWS infrastructure that includes:
- A VPC with public and private subnets.
- An Internet Gateway for public access.
- NAT Gateway for private subnet internet access.
- Security Groups to control inbound and outbound traffic.
- EC2 instances for web and database services.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 12.x or later)
- [Pulumi](https://pulumi.com/docs/get-started/install/)
- [AWS CLI](https://aws.amazon.com/cli/) configured with your AWS credentials

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/khandokarIsmailDev/todo-porject-frontend_backend
   cd todo-porject-frontend_backend/pulumi_IAC
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure your AWS credentials:**
   Ensure your AWS credentials are set up in your environment. You can configure them using the AWS CLI:
   ```bash
   aws configure
   ```

4. **Create a key pair:**
   ```bash
   aws ec2 create-key-pair --key-name MyKeyPair --query 'KeyMaterial' --output text > MyKeyPair.pem
   ```

5. **Preview the changes:**
   Run the following command to see what resources will be created:
   ```bash
   pulumi preview
   ```

6. **Deploy the infrastructure:**
   To create the resources defined in the code, run:
   ```bash
   pulumi up
   ```

7. **Destroy the infrastructure:**
   If you want to remove all the resources created, run:
   ```bash
   pulumi destroy
   ```

## Resources Created

The following AWS resources are created by this Pulumi script:

- **VPC**: A Virtual Private Cloud with CIDR block `10.0.0.0/16`.
- **Subnets**:
  - Public Subnet: `10.0.1.0/24`
  - Private Subnet A: `10.0.2.0/24`
  - Private Subnet B: `10.0.4.0/24`
- **Internet Gateway**: Allows public access to the VPC.
- **NAT Gateway**: Provides internet access to instances in the private subnet.
- **Route Tables**: Configured for public and private subnets.
- **Security Group**: Allows inbound traffic for HTTP, HTTPS, and SSH.
- **EC2 Instances**:
  - Public Instance (Nginx)
  - Database Instance
  - Node Instances (Node-1 to Node-4)

## Usage

After deploying the infrastructure, you can access the public EC2 instance using its public IP address. The database instance and node instances are located in the private subnet and can be accessed from the public instance.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
