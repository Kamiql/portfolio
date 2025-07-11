FROM composer:2 AS build
WORKDIR /app
COPY backend/composer.* ./
RUN composer install --no-dev --optimize-autoloader --no-interaction

FROM php:8.1-fpm-alpine

RUN apk add --no-cache nginx supervisor \
    && mkdir -p /run/nginx \
    && mkdir -p /var/log/supervisor

RUN apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        icu-dev \
        libzip-dev \
    && docker-php-ext-install \
        pdo_mysql \
        intl \
        zip \
    && apk del .build-deps

COPY docker/backend/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/vendor /var/www/html/vendor
COPY backend /var/www/html

RUN chown -R www-data:www-data /var/www/html

COPY docker/backend/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]