
# VPS Deployment Guide for Haryana Tele Services

This guide outlines the steps to deploy your React application on a Linux VPS (e.g., Ubuntu) using Nginx and ensuring all assets are correctly generated.

## Prerequisites
1. A VPS with Ubuntu installed.
2. A registered domain: `htswifi.com`.
3. SSH access to your VPS.

## Step 1: Project Structure Check
For a successful build where assets (like `logo.png`) are included:
1. Ensure you have a `public/` folder in your project root.
2. Move `logo.png` and any other static images into the `public/` folder.
3. In your code, refer to them using absolute paths like `/logo.png`.

## Step 2: Prepare the Server
Connect to your VPS:
```bash
ssh root@your_vps_ip
```
Update and install necessary tools:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nginx git -y
```

## Step 3: Install Node.js (via NVM)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install node # Installs latest node
```

## Step 4: Clone and Build
Clone your repository:
```bash
git clone https://github.com/iampeerzada/hts-wifi.git
cd hts-wifi
npm install
npm run build
```
The `npm run build` command will generate a `dist/` folder. Ensure the contents of `public/` are now inside `dist/`.

## Step 5: Configure Nginx
Create a new configuration file:
```bash
sudo nano /etc/nginx/sites-available/htswifi.com
```
Paste the following (adjust the path to your `dist` folder):
```nginx
server {
    listen 80;
    server_name htswifi.com www.htswifi.com;

    root /var/www/hts-wifi/dist; # Adjust to your actual path
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```
Link the config and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/htswifi.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 6: SSL (HTTPS) with Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d htswifi.com -d www.htswifi.com
```

## Troubleshooting Assets
If `logo.png` is still missing:
1. Check that the file name is exactly `logo.png` (case-sensitive).
2. Verify it is located in the `public` folder before running `npm run build`.
3. If using Vite, ensure your `vite.config.ts` doesn't exclude the public directory.
