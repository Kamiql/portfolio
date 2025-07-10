#!/bin/bash

set -euo pipefail

PROJECT_DIR="/root/portfolio"
export DEBIAN_FRONTEND=noninteractive

echo "🔄 Updating system and installing Docker..."
sudo apt-get update -qq
sudo apt-get install -y -qq docker.io docker-compose \
  || { echo "❌ Failed to install Docker"; exit 1; }

sudo apt-get install -y -qq libicu-dev \
  || { echo "❌ Failed to install libicu-dev"; exit 1; }

echo "🔄 Pulling latest changes from Git..."
cd "$PROJECT_DIR"
git pull origin master

echo "🐳 Rebuilding Docker containers..."
sudo docker-compose down || true
sudo docker-compose build --pull
sudo docker-compose up -d

echo "🌐 Reloading Nginx..."
if sudo nginx -t; then
  sudo systemctl reload nginx
  echo "✅ Nginx reloaded successfully"
else
  echo "❌ Nginx configuration is invalid"
  exit 1
fi

echo "🎉 Deployment complete! Docker containers are running."
