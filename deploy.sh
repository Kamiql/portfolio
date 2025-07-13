#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="/var/www/html/portfolio"
REPO_SSH="git@github.com:KAMIQL/PORTFOLIO.git"
DOCKER_COMPOSE="docker-compose"

if [[ -d "$PROJECT_DIR" ]]; then
  echo "➡️  Entering $PROJECT_DIR"
  cd "$PROJECT_DIR"
else
  echo "📥 Cloning repository into $PROJECT_DIR"
  git clone "$REPO_SSH" "$PROJECT_DIR"
  cd "$PROJECT_DIR"
fi

echo "🔄 Fetching latest changes"
git fetch origin
git reset --hard origin/master

echo "🐳 Shutting down containers"
$DOCKER_COMPOSE down

echo "🐳 Building and starting containers"
$DOCKER_COMPOSE up -d --build

echo "📦 Optimizing Composer autoloader"
docker exec portfolio_backend_1 composer dump-autoload -o

echo "🏁 Deployment complete!"
