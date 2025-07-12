set -euo pipefail

PROJECT_DIR="$HOME/portfolio"
REPO_SSH="git@github.com:USERNAME/REPO.git"
DOCKER_COMPOSE="docker-compose"
BACKEND_CONTAINER="portfolio_backend_1"
HEALTHCHECK_URL="http://localhost:8080"

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

echo "🔎 Current containers:"
docker ps

echo "📦 Optimizing Composer autoloader"
docker exec "$BACKEND_CONTAINER" composer dump-autoload -o

echo "🧪 Running healthcheck"
if curl -sSf "$HEALTHCHECK_URL" >/dev/null; then
  echo "✅ Healthcheck passed"
else
  echo "❌ Healthcheck failed" >&2
  exit 1
fi

echo "🔁 Testing and reloading Nginx"
sudo nginx -t && sudo systemctl reload nginx

echo "🏁 Deployment complete!"
