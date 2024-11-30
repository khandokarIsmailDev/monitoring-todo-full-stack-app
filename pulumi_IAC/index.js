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

//create Private Subnet
const privateSubnet = new aws.ec2.Subnet("my-private-subnet",{
    vpcId:vpc.id,
    cidrBlock:"10.0.2.0/24",
    availabilityZone:"ap-southeast-1a",
    tags:{
        Name:"my-private-subnet"
    }
})

exports.privateSubnetId = privateSubnet.id;




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