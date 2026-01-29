
# VPS Deployment Guide for Haryana Tele Services

This guide explains how to fix the "missing assets" issue and deploy correctly.

## 1. Project Folder Structure (CRITICAL)
For the build to generate all files correctly, your local folder MUST look like this:
```text
hts-wifi/
├── public/             <-- CREATE THIS FOLDER
│   └── logo.png        <-- PUT YOUR LOGO HERE
├── index.html
├── index.tsx
├── App.tsx
├── vite.config.ts
└── ... (other files)
```

## 2. Local Build Verification
Before deploying to the VPS, run these commands locally:
```bash
npm install
npm run build
```
Check the `dist` folder. You should see:
- `index.html`
- `logo.png` (copied from public)
- `assets/` (contains bundled .js and .css files)

## 3. VPS Deployment Steps

### Step A: Connect & Update
```bash
ssh root@your_vps_ip
sudo apt update && sudo apt upgrade -y
sudo apt install nginx git -y
```

### Step B: Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### Step C: Clone & Build
```bash
cd /var/www
git clone https://github.com/iampeerzada/hts-wifi.git
cd hts-wifi
npm install
npm run build
```

### Step D: Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/htswifi.com
```
Paste this config:
```nginx
server {
    listen 80;
    server_name htswifi.com www.htswifi.com;
    root /var/www/hts-wifi/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/htswifi.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Troubleshooting Missing Assets
If `dist/assets` is empty, check `index.html`. It MUST have this line at the bottom of the body:
`<script type="module" src="./index.tsx"></script>`
