# BB-Telegram
pls create .env file in root
```
GROUP_ID="-1000000000"
TOKEN="***********"
URL="http://0.0.0.0:0000"
```

## Docker
sudo docker compose --env-file .env up -d

## Test Flask
sudo kill -9 $(sudo lsof -t -i:9091) && python3 server.py