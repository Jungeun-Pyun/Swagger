#!/bin/bash
AWS_PROFILE=aws-docker
# 대표님 컴퓨터에서 배포하실 때 aws-docker로 수정해주셔야 합니다.

DOCKER_MACHINE=node-3th-machine
IMAGE_NAME=node-3th
REGISTRY_URL=506876573492.dkr.ecr.ap-northeast-2.amazonaws.com/node-3th:latest




eval $(docker-machine env --shell bash -u)
docker build -t ${IMAGE_NAME} .
docker tag ${IMAGE_NAME}:latest ${REGISTRY_URL}

aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin ${REGISTRY_URL}
docker push ${REGISTRY_URL}

eval $(docker-machine env --shell bash ${DOCKER_MACHINE})
docker pull ${REGISTRY_URL}

docker-machine scp -d ./nginx/nginx.tmpl ${DOCKER_MACHINE}:/home/ubuntu
docker-machine scp -d ./docker-compose.yml ${DOCKER_MACHINE}:/home/ubuntu
docker-machine ssh ${DOCKER_MACHINE} "docker-compose -f docker-compose.yml -p server up -d --remove-orphans"

docker rmi -f $(docker images -f dangling=true -q)
eval $(docker-machine env --shell bash -u)
docker rmi -f $(docker images -f dangling=true -q)

