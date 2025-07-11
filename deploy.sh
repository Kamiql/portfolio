#!/bin/bash
set -euo pipefail

PROJECT_DIR="/root/portfolio"
export DEBIAN_FRONTEND=noninteractive

echo "🔄 System update and install Docker + Docker-Compose..."
sudo apt-get update -qq
sudo apt-get install -y -qq docker.io docker-compose

echo "🌐 Setup firewall"
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload

echo "📁 Ensure Nginx config directory exists..."
sudo mkdir -p /etc/nginx/sites-available

echo "🔄 Pull latest changes from Git..."
cd "$PROJECT_DIR"
git pull origin master

echo "🐳 Rebuild Docker containers..."
sudo docker-compose down || true
sudo docker-compose build --pull
sudo docker-compose up -d

echo "🌐 Reload Nginx..."
sudo cp nginx-host/portfolio.conf /etc/nginx/sites-available/portfolio
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

if sudo nginx -t; then
  sudo systemctl reload nginx
  echo "✅ Nginx reloaded successfully"
else
  echo "❌ Nginx config test failed"
  exit 1
fi

echo "🎉 Deployment complete"