
# VPS Deployment Guide for Haryana Tele Services

This guide outlines the steps to deploy your React application on a Linux VPS (e.g., Ubuntu).

## Prerequisites
1. A VPS with Ubuntu installed.
2. A registered domain: `htswifi.com`.
3. SSH access to your VPS.

## Step 1: Prepare the Server
Connect to your VPS:
```bash
ssh root@your_vps_ip
```
Update and install necessary tools:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nginx git -y
```

## Step 2: Install Node.js (via NVM)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install node # Installs latest node
```

## Step 3: Clone and Build
Clone your repository (assuming you pushed the code to GitHub/GitLab):
```bash
git clone https://github.com/your-username/hts-wifi.git
cd hts-wifi
npm install
npm run build
```

## Step 4: Configure Nginx
Create a new configuration file:
```bash
sudo nano /etc/nginx/sites-available/htswifi.com
```
Paste the following:
```nginx
server {
    listen 80;
    server_name htswifi.com www.htswifi.com;

    root /path/to/hts-wifi/dist; # Path to your build output
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```
Link the config and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/htswifi.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 5: SSL (HTTPS) with Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d htswifi.com -d www.htswifi.com
```

## Note on Database
This frontend uses `localStorage` for plan management. To sync data across different devices/browsers for multiple users, you would eventually need a backend (Node/Express + MongoDB/PostgreSQL). For a single admin on one device, `localStorage` works as a simple persistent store.
