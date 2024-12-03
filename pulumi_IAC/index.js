"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");


// Create VPC
const vpc = new aws.ec2.Vpc("my-vpc",{
    cidrBlock:"10.0.0.0/16",
    tags:{
        Name:"my-vpc"
    }
})

exports.vpcId = vpc.id;


// Create Public Subnet
const publicSubnet = new aws.ec2.Subnet("my-public-subnet",{
    vpcId:vpc.id,
    cidrBlock:"10.0.1.0/24",
    availabilityZone:"ap-southeast-1a",
    mapPublicIpOnLaunch:true,
    tags:{
        Name:"my-public-subnet"
    }
})

exports.publicSubnetId = publicSubnet.id

//create Private Subnet for ap-southeast-1a
const privateSubnetA = new aws.ec2.Subnet("my-private-subnet",{
    vpcId:vpc.id,
    cidrBlock:"10.0.2.0/24",
    availabilityZone:"ap-southeast-1a",
    tags:{
        Name:"my-private-subnet"
    }
})

exports.privateSubnetAId = privateSubnetA.id;




//-----------create Private Subnet for ap-southeast-1b-----------
const privateSubnetB = new aws.ec2.Subnet("b-private-subnet",{
    vpcId:vpc.id,
    cidrBlock:"10.0.4.0/24",
    availabilityZone:"ap-southeast-1b",
    tags:{
        Name:"b-private-subnet"
    }
})

exports.privateSubnetBId = privateSubnetB.id;

//-----------create Private Subnet for ap-southeast-1c-----------
const privateSubnetC = new aws.ec2.Subnet("c-private-subnet",{
    vpcId:vpc.id,
    cidrBlock:"10.0.5.0/24",
    availabilityZone:"ap-southeast-1c",
    tags:{
        Name:"c-private-subnet"
    }
})

exports.privateSubnetCId = privateSubnetC.id;
//create Internet Gateway
const igw = new aws.ec2.InternetGateway("my-IGW",{
    vpcId:vpc.id,
    tags:{
        Name:"igw"
    }
})

exports.igwId = igw.id;



//---------create a Public Route Table---------

const publicRouteTable = new aws.ec2.RouteTable("my-public-RT",{
    vpcId:vpc.id,
    tags:{
        Name:"public-RT"
    }
})

//create a route in the public route table 
const route = new aws.ec2.Route("igw-Route",{
    routeTableId:publicRouteTable.id,
    destinationCidrBlock:"0.0.0.0/0",
    gatewayId:igw.id
})

//associate the public route table with the public subnet
const routeTableAssociation = new aws.ec2.RouteTableAssociation("public-RT-association",{
    subnetId:publicSubnet.id,
    routeTableId:publicRouteTable.id
})

exports.publicRouteTableId = publicRouteTable.id;


//---------create a Private Route Table for ap-southeast-1a---------

//create NAT Gateway
const eip = new aws.ec2.Eip("nat-eip",{vpc:true})

const natGateway = new aws.ec2.NatGateway("nat-gateway",{
    subnetId:publicSubnet.id,
    allocationId:eip.id,
    tags:{
        Name:"nat"
    }
})

exports.natGatewayId = natGateway.id;


//create a route table for the private subnet
const privateRouteTable = new aws.ec2.RouteTable("private-route-table",{
    vpcId:vpc.id,
    tags:{
        Name:"private-RT"
    }
})

//create a route in the private route table for the NAT Gateway
const privateRoute = new aws.ec2.Route("nat-route",{
    routeTableId:privateRouteTable.id,
    destinationCidrBlock:"0.0.0.0/0",
    natGatewayId:natGateway.id
})


//associate the private route table with the private subnet
const privateRouteTableAssociationA = new aws.ec2.RouteTableAssociation("private-RT-association-A", {
    subnetId: privateSubnet.id,
    routeTableId: privateRouteTable.id,
});

const privateRouteTableAssociationB = new aws.ec2.RouteTableAssociation("private-RT-association-B", {
    subnetId: privateSubnetB.id,
    routeTableId: privateRouteTable.id,
});


exports.privateRouteTableId = privateRouteTable.id;


// Create Security Group
const publicSecurityGroup = new aws.ec2.SecurityGroup("public-secgrp",{
    vpcId:vpc.id,
    description:"Allow SSH for All Inbound Traffic",
    ingress:[
        {protocol:"tcp", fromPort:80, toPort:80, cidrBlocks:["0.0.0.0/0"]},
        {protocol:"tcp", fromPort:22, toPort:22, cidrBlocks:["0.0.0.0/0"]},
        {protocol:"tcp", fromPort:443, toPort:443, cidrBlocks:["0.0.0.0/0"]},
        {protocol:"tcp", fromPort:4100, toPort:4100, cidrBlocks:["0.0.0.0/0"]},
        {protocol:"tcp", fromPort:5432, toPort:5432, cidrBlocks:["0.0.0.0/0"]},
    ],
    egress:[
        {protocol:"-1", fromPort:0, toPort:0, cidrBlocks:["0.0.0.0/0"]},
    ]
})

//use the specific Ubuntu 20.04 AMI
const amiId = "ami-047126e50991d067b"


//create an ec2 instance in the public subnet
const publicInstance = new aws.ec2.Instance("nginx-instance",{
    instanceType:"t2.micro",
    vpcSecurityGroupIds: [publicSecurityGroup.id],
    ami:amiId,
    subnetId:publicSubnet.id,
    keyName:"MyKeyPair",
    associatePublicIpAddress:true,
    tags:{
        Name:"nginx-instance"
    }
})

exports.publicInstanceId = publicInstance.id;
exports.publicInstancePublicIp = publicInstance.publicIp;


//create an Database instance in the private subnet
const dbInstance = new aws.ec2.Instance("db-instance",{
    instanceType:"t2.micro",
    vpcSecurityGroupIds: [publicSecurityGroup.id],
    ami:amiId,
    subnetId:privateSubnetC.id,
    keyName:"MyKeyPair",
    tags:{
        Name:"db-instance"
    }
})

exports.dbInstanceId = dbInstance.id;

//create an Node-1 instance in the private subnet
const frontendOneInstance = new aws.ec2.Instance("frontend-1-instance",{
    instanceType:"t2.micro",
    vpcSecurityGroupIds:[publicSecurityGroup.id],
    ami:amiId,
    subnetId:privateSubnetA.id,
    keyName:"MyKeyPair",
    tags:{
        Name:"frontend-1-instance"
    }
})

exports.frontendOneInstanceId = frontendOneInstance.id;


//create an Node-2 instance in the private subnet
const frontendTwoInstance = new aws.ec2.Instance("frontend-2-instance",{
    instanceType:"t2.micro",
    vpcSecurityGroupIds:[publicSecurityGroup.id],
    ami:amiId,
    subnetId:privateSubnetB.id,
    keyName:"MyKeyPair",
    tags:{
        Name:"frontend-2-instance"
    }
})

exports.frontendTwoInstanceId = frontendTwoInstance.id;


//create an Node-3 instance in the private subnet
const frontendThreeInstance = new aws.ec2.Instance("frontend-3-instance",{
    instanceType:"t2.micro",
    vpcSecurityGroupIds:[publicSecurityGroup.id],
    ami:amiId,
    subnetId:privateSubnetC.id,
    keyName:"MyKeyPair",
    tags:{
        Name:"frontend-3-instance"
    }
})

exports.frontendThreeInstanceId = frontendThreeInstance.id;

//create an Node-4 instance in the private subnet
const backendOneInstance = new aws.ec2.Instance("backend-1-instance",{
    instanceType:"t2.micro",
    vpcSecurityGroupIds:[publicSecurityGroup.id],
    ami:amiId,
    subnetId:privateSubnetA.id,
    keyName:"MyKeyPair",
    tags:{
        Name:"backend-1-instance"
    }
})

exports.backendOneInstanceId = backendOneInstance.id;

//create an Node-5 instance in the private subnet
const backendTwoInstance = new aws.ec2.Instance("backend-2-instance",{
    instanceType:"t2.micro",
    vpcSecurityGroupIds:[publicSecurityGroup.id],
    ami:amiId,
    subnetId:privateSubnetB.id,
    keyName:"MyKeyPair",
    tags:{
        Name:"backend-2-instance"
    }
})

exports.backendTwoInstanceId = backendTwoInstance.id;

//create an Node-6 instance in the private subnet
const backendThreeInstance = new aws.ec2.Instance("backend-3-instance",{
    instanceType:"t2.micro",
    vpcSecurityGroupIds:[publicSecurityGroup.id],
    ami:amiId,
    subnetId:privateSubnetC.id,
    keyName:"MyKeyPair",
    tags:{
        Name:"backend-3-instance"
    }
})

exports.backendThreeInstanceId = backendThreeInstance.id;