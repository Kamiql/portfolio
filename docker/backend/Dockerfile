FROM php:fpm-alpine
WORKDIR /var/www/html

RUN apk add --no-cache \
      git \
      unzip \
      libzip-dev \
  && docker-php-ext-install zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY backend/ .
RUN composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data /var/www/html
