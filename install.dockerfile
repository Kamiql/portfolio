FROM composer:2 AS backend-builder
WORKDIR /app
COPY backend .
RUN composer install --no-dev --optimize-autoloader

FROM node:20 AS frontend-builder
WORKDIR /app
COPY frontend .
RUN npm install
RUN npm run build

FROM php:8.2-apache
WORKDIR /var/www/html

RUN a2enmod rewrite
COPY docker/apache.conf /etc/apache2/sites-available/000-default.conf

COPY --from=backend-builder /app ./api
COPY backend/.htaccess ./api/.htaccess

COPY --from=frontend-builder /app/dist ./public

RUN chown -R www-data:www-data .