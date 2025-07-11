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

echo "🐳 Stop and remove all containers..."
sudo docker-compose down -v --remove-orphans || true

echo "🔄 Pull latest changes..."
cd "$PROJECT_DIR"
git fetch origin
git reset --hard origin/master

echo "🐳 Rebuild Docker containers..."
sudo docker-compose build --no-cache --pull
sudo docker-compose up -d

echo "📡 Configure Nginx..."
sudo rm -f /etc/nginx/sites-enabled/default
sudo cp nginx-host/portfolio.conf /etc/nginx/sites-available/portfolio
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

#echo "🔒 Handling SSL certificates..."
#if [ -d "/etc/letsencrypt/live/kamiql.de" ]; then
#    sudo certbot renew --quiet --no-self-upgrade
#else
#    echo "⚠️ No SSL certificate found. Creating new one..."
#    sudo certbot certonly --nginx -d kamiql.de --non-interactive --agree-tos -m your-email@example.com
#fi

echo "🌐 Test Nginx configuration..."
sudo nginx -t
sudo systemctl reload nginx

echo "🔍 Debugging API endpoint..."
echo "Testing backend directly:"
curl -I http://localhost:8082/api || true
echo "Testing through proxy:"
curl -Ik https://kamiql.de/api || true

echo "📊 Container status:"
sudo docker-compose ps

echo "🔍 Backend logs:"
sudo docker-compose logs portfolio_backend_1

echo "🎉 Deployment complete! Services are running."