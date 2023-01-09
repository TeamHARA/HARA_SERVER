#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

sudo /usr/bin/yarn
sudo npx prisma generate
sudo /usr/bin/pm2 start dist
