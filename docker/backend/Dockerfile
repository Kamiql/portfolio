FROM php:8.1-fpm-alpine
WORKDIR /var/www/html/backend

RUN apk add --no-cache \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install zip pdo pdo_mysql

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY backend/ /var/www/html/backend/

RUN composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data /var/www/html
