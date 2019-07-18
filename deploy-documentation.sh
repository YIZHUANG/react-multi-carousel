#!/bin/bash

gcpip=$1
encrypted_fc1c34415af5_key=$2
encrypted_fc1c34415af5_iv=$3
openssl aes-256-cbc -K $encrypted_fc1c34415af5_key -iv $encrypted_fc1c34415af5_iv -in deploy_key.enc -out ./deploy_key -d
eval "$(ssh-agent -s)"
chmod 600 ./deploy_key
echo -e "Host $gcpip\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
ssh-add ./deploy_key

ssh -i ./deploy_key TravisCIDeployKey@$gcpip 'cd /var/www/html/react-multi-carousel && sudo rm -rf `ls -Ab` && cd /react-multi-carousel && sudo git pull && cd .out && sudo cp -a . /var/www/html/react-multi-carousel'