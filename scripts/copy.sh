# 명령어 저장 용도 파일

#파일 올리기전에 node modules 삭제
rm -rf node_modules/

#key 있는 파일로 가서 실행
#파일 복사해서 서버에 올리기
scp -i "jenna_ec2_keypair.pem" -r /Users/JungeunPyun/Documents/Back-End/8th_week/Goods/ ubuntu@ec2-3-34-178-183.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/server

#서버 접속
ssh -i "jenna_ec2_keypair.pem" ubuntu@ec2-3-34-178-183.ap-northeast-2.compute.amazonaws.com

#서버 실행
sudo pm2 start ecosystem.config.js --env production