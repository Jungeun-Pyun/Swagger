#!/bin/bash


# ssh-add -k /Users/idahan/Desktop/aws_keys/te_ec2_keypair.pem

ssh-add -k /Users/JungeunPyun/Documents/aws/jenna_ec2_keypair.pem

docker-machine create --driver generic --generic-ip-address=54.180.92.8 --generic-ssh-user ubuntu node-3th-machine