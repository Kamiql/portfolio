#!/bin/bash
set -euo pipefail

PROJECT_DIR="/root/portfolio"
export DEBIAN_FRONTEND=noninteractive

echo "🔄 System update and install dependencies..."
sudo apt-get update -qq
sudo apt-get install -y -qq docker.io docker-compose nginx certbot python3-certbot-nginx

echo "🌐 Setup firewall..."
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload

cd "$PROJECT_DIR"
echo "🔄 Pull latest changes..."
git fetch origin
git reset --hard origin/master

echo "🐳 Rebuild Docker containers..."
sudo docker-compose down || true
sudo docker-compose build --pull
sudo docker-compose up -d

echo "📡 Configure Nginx..."
sudo rm -f /etc/nginx/sites-enabled/default

sudo cp nginx-host/portfolio.conf /etc/nginx/sites-available/portfolio
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

echo "🔒 Handling SSL certificates..."
if [ -d "/etc/letsencrypt/live/kamiql.de" ]; then
    echo "🔍 Checking if certificate for kamiql.de needs renewal..."
    if sudo certbot certificates | grep -q "kamiql.de"; then
        echo "🔁 Attempting certificate renewal (only if needed)..."
        sudo certbot renew --quiet --no-self-upgrade
    else
        echo "⚠️ Certificate directory exists, but no cert found for kamiql.de – issuing new cert..."
        sudo certbot certonly --nginx -d kamiql.de --non-interactive --agree-tos -m your-email@example.com
    fi
else
    echo "❌ No SSL certificate directory found – creating new certificate..."
    sudo certbot certonly --nginx -d kamiql.de --non-interactive --agree-tos -m your-email@example.com
fi

echo "🌐 Reloading Nginx..."
sudo nginx -t
sudo systemctl reload nginx

echo "✅ Backend status:"
sudo docker-compose ps

echo "🎉 Deployment complete! Services are running."