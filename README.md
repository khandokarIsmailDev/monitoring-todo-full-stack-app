






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
   aws ec2 create-key-pair --key-name MyKeyPair --query 'KeyMaterial' --output text MyKeyPair.pem
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
