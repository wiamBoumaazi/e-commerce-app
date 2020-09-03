


Starting the application:<br/>
<br/>

clone the repo: <br/>
Please add the user email address and password for receipt service in consumerTest.js in backend folder.<br/>
<br/>
cd devops <br/>
docker swarm init <br/>
docker stack deploy -c docker-compose.yml demo <br/>
<br/>
cd ../backend <br/>
pm2 start process.config.js <br/>
<br/>
cd ../frontend <br/>
npm start <br/>
<br/>
Caveat: item view count doesn't decrement when you 'close' the tab. But, it works perfectly when you click on the 'back' button. 
