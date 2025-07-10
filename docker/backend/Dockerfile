FROM composer:2 AS build
WORKDIR /app
COPY backend/composer.* ./
RUN composer install --no-dev --optimize-autoloader --no-interaction

FROM php:8.1-fpm-alpine
RUN docker-php-ext-install pdo_mysql intl
COPY --from=build /app/vendor /var/www/html/vendor
COPY backend /var/www/html
WORKDIR /var/www/html/public