FROM composer:2 AS build
WORKDIR /app
COPY backend/composer.* ./
RUN composer install --no-dev --optimize-autoloader --no-interaction

FROM php:8.1-fpm-alpine

# Install dependencies
RUN apk add --no-cache nginx supervisor \
    && mkdir -p /run/nginx \
    && mkdir -p /var/log/supervisor

# Install PHP extensions
RUN apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        icu-dev \
        libxml2-dev \
    && docker-php-ext-install \
        pdo_mysql \
        intl \
        opcache \
    && apk del .build-deps

# Copy configurations
COPY docker/backend/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/vendor /var/www/html/vendor
COPY backend /var/www/html

# Create storage directory and set permissions
RUN mkdir -p /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage

# Supervisor configuration
COPY docker/backend/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]