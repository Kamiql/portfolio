#!/bin/bash
set -euo pipefail

PROJECT_DIR="/root/portfolio"
export DEBIAN_FRONTEND=noninteractive

echo "🔄 System update and install Docker + Docker-Compose..."
sudo apt-get update -qq
sudo apt-get install -y -qq docker.io docker-compose libicu-dev \
  || { echo "❌ Failed to install required packages"; exit 1; }

echo "🔄 Pull latest changes from Git..."
cd "$PROJECT_DIR"
git pull origin master

echo "🐳 Rebuild Docker containers..."
# Achtung: libicu-dev MUSS im Dockerfile des backend-Images installiert werden!
sudo docker-compose down || true
sudo docker-compose build --pull
sudo docker-compose up -d

echo "🌐 Reload Nginx if config is valid..."
if sudo nginx -t; then
  sudo systemctl reload nginx
  echo "✅ Nginx reloaded successfully"
else
  echo "❌ Nginx config test failed, aborting."
  exit 1
fi

echo "🎉 Deployment complete. Docker containers are running."
