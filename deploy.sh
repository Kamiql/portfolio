set -euo pipefail

PROJECT_DIR="/root/portfolio"

export DEBIAN_FRONTEND=noninteractive

echo "🔄 Systemaktualisierung und Docker-Installation..."
sudo apt-get update -qq
sudo apt-get install -y -qq docker.io docker-compose

echo "🔄 Git Pull..."
cd "$PROJECT_DIR"
git pull origin master

echo "🐳 Docker-Container neu erstellen..."
sudo docker-compose down || true
sudo docker-compose build --pull
sudo docker-compose up -d

echo "🌐 Nginx neuladen..."
sudo nginx -t && sudo systemctl reload nginx

echo "🎉 Deployment abgeschlossen! Docker-Container laufen."