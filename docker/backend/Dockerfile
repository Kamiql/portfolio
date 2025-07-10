# Stage 1: Composer dependencies
FROM composer:2 AS build
WORKDIR /app
COPY backend/composer.* ./
RUN composer install --no-dev --optimize-autoloader --no-interaction

FROM php:8.1-fpm-alpine

RUN apk add --no-cache nginx \
    && apk add --no-cache --virtual .build-deps \
         $PHPIZE_DEPS \
         icu-dev \
         libxml2-dev \
         oniguruma-dev \
    && docker-php-ext-install \
         pdo_mysql \
         intl \
    \
    && apk add --no-cache icu-libs \
    \
    && apk del .build-deps

RUN mkdir -p /run/nginx
COPY docker/backend/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/vendor /var/www/html/vendor
COPY backend /var/www/html

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80

CMD sh -c "php-fpm -D && nginx -g 'daemon off;'"