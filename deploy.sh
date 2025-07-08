#!/bin/bash

set -euo pipefail

PROJECT_DIR="/root/portfolio"
FRONTEND_DIR="$PROJECT_DIR/frontend"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_BUILD_DIR="$FRONTEND_DIR/dist"
FRONTEND_DEPLOY_DIR="/var/www/portfolio"
BACKEND_DEPLOY_DIR="/var/www/portfolio-api"

# Non-interactive APT
export DEBIAN_FRONTEND=noninteractive

echo "🔄 Git Pull..."
cd "$PROJECT_DIR"
git pull origin master

### FRONTEND ###
echo "📦 Installing frontend NPM packages..."
cd "$FRONTEND_DIR"
npm ci --silent

echo "🔨 Building Vite project..."
npm run build

echo "🚚 Deploying frontend to $FRONTEND_DEPLOY_DIR..."
sudo rm -rf "$FRONTEND_DEPLOY_DIR"
sudo mkdir -p "$FRONTEND_DEPLOY_DIR"
sudo cp -r "$FRONTEND_BUILD_DIR"/* "$FRONTEND_DEPLOY_DIR/"

### BACKEND ###
echo "📦 Updating system and installing PHP + Composer..."
sudo apt-get update -qq
sudo apt-get upgrade -y -qq
sudo apt-get install -y -qq composer php8.1-intl

echo "📦 Installing backend PHP dependencies..."
cd "$BACKEND_DIR"
composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

echo "🚚 Deploying backend to $BACKEND_DEPLOY_DIR..."
sudo rm -rf "$BACKEND_DEPLOY_DIR"
sudo mkdir -p "$BACKEND_DEPLOY_DIR"
sudo cp -r "$BACKEND_DIR"/* "$BACKEND_DEPLOY_DIR/"

echo "✅ Reloading PHP-FPM and NGINX..."
PHP_VERSION=$(php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")
systemctl reload php$PHP_VERSION-fpm || systemctl reload php-fpm
sudo nginx -t && sudo systemctl reload nginx

echo "🎉 Deployment complete."
