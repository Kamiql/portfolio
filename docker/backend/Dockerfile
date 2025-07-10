FROM composer:2 AS build
WORKDIR /app
COPY backend/composer.* ./
RUN composer install --no-dev --optimize-autoloader --no-interaction

FROM nginx:alpine

RUN apk add --no-cache php81 php81-fpm php81-pdo php81-pdo_mysql php81-opcache

RUN sed -i 's/;clear_env = no/clear_env = no/' /etc/php81/php-fpm.d/www.conf

COPY docker/backend/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/vendor /var/www/html/vendor
COPY backend /var/www/html

RUN chown -R nginx:nginx /var/www/html

EXPOSE 80
CMD ["sh", "-c", "php-fpm81 -D && nginx -g 'daemon off;'"]