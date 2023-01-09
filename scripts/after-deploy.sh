#!/bin/bash
REPOSITORY=/home/ubuntu/HARA_SERVER

cd $REPOSITORY

sudo /usr/bin/yarn

sudo /usr/bin/pm2 start dist
