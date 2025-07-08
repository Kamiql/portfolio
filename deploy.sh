#!/bin/bash

set -e

PROJECT_DIR="/root/portfolio"
FRONTEND_DIR="$PROJECT_DIR/frontend"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_BUILD_DIR="$FRONTEND_DIR/dist"
FRONTEND_DEPLOY_DIR="/var/www/portfolio"
BACKEND_DEPLOY_DIR="/var/www/portfolio-api"

echo "🔄 Git Pull..."
cd "$PROJECT_DIR"
git pull

### FRONTEND ###
echo "📦 Installing frontend NPM packages..."
cd "$FRONTEND_DIR"
npm install

echo "🔨 Building Vite project..."
npm run build

echo "🚚 Deploying frontend to $FRONTEND_DEPLOY_DIR..."
sudo rm -rf "$FRONTEND_DEPLOY_DIR"
sudo mkdir -p "$FRONTEND_DEPLOY_DIR"
sudo cp -r "$FRONTEND_BUILD_DIR"/* "$FRONTEND_DEPLOY_DIR/"

### BACKEND ###
echo "📦 Installing backend PHP dependencies..."

sudo apt update
sudo apt upgrade -y

cd "$BACKEND_DIR"
composer install --no-dev --optimize-autoloader

echo "🚚 Deploying backend to $BACKEND_DEPLOY_DIR..."
sudo rm -rf "$BACKEND_DEPLOY_DIR"
sudo mkdir -p "$BACKEND_DEPLOY_DIR"
sudo cp -r "$BACKEND_DIR"/* "$BACKEND_DEPLOY_DIR/"

echo "✅ Reloading PHP-FPM and NGINX..."
sudo systemctl reload php8.1-fpm
sudo nginx -t && sudo systemctl reload nginx

echo "🎉 Deployment complete."
