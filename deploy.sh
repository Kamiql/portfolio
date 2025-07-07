#!/bin/bash

set -e

PROJECT_DIR="/root/portfolio"
FRONTEND_DIR="$PROJECT_DIR/frontend"
BUILD_DIR="$FRONTEND_DIR/dist"
DEPLOY_DIR="/var/www/portfolio"

echo "🔄 Git Pull..."
cd $PROJECT_DIR
git pull

echo "📦 Installing NPM packages..."
cd $FRONTEND_DIR
npm install

echo "🔨 Building Vite project..."
npm run build

echo "🚚 Deploying to $DEPLOY_DIR..."
sudo rm -rf $DEPLOY_DIR
sudo mkdir -p $DEPLOY_DIR
sudo cp -r $BUILD_DIR/* $DEPLOY_DIR/

echo "✅ Reloading NGINX..."
sudo nginx -t && sudo systemctl reload nginx

echo "🎉 Deployment complete."
