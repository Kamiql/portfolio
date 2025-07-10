FROM composer:2 AS build
WORKDIR /app
COPY backend/composer.* ./
RUN composer install --no-dev --optimize-autoloader --no-interaction

FROM php:8.1-fpm-alpine

RUN apk add --no-cache --update \
    icu-dev \
    libxml2-dev \
    oniguruma-dev \
    && apk add --no-cache --virtual .build-deps $PHPIZE_DEPS \
    mysql-client \
    && docker-php-ext-install pdo_mysql intl \
    && apk del .build-deps

RUN mkdir /var/www/html/public

COPY --from=build /app/vendor /var/www/html/vendor
COPY backend /var/www/html

WORKDIR /var/www/html/public