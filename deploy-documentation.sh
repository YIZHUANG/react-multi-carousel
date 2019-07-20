#!/bin/bash

gcpip=$1

ssh -i ./deploy_key TravisCIDeployKey@$gcpip 'cd /var/www/html/react-multi-carousel && sudo rm -rf `ls -Ab` && cd /react-multi-carousel && sudo git pull && cd .out && sudo cp -a . /var/www/html/react-multi-carousel'