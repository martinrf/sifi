# zurbo
Survey Bot

    npm install
    cp .env.example .env
    
Edit .env file adding proper details

To Run
  
    npm run start
    
You have to configure you page and app in facebook to run the bot successfully.

To Deploy

    ssh -i path.pem ubuntu@ec2....
    
    cd zurbo
    git pull
    sudo docker build --no-cache --tag zyphy/zurbot .
    sudo docker ps 
    sudo docker stop CONTAINER_ID
    sudo docker rm CONTAINER_ID
    sudo docker run -d -i -p 5600:5600 zyphy/zurbot
