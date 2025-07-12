<?php

require __DIR__ . '/../vendor/autoload.php';

use Leaf\Router;

Router::get('/test', fn () => print('Hello from Leaf!'));

Router::get('/test2', function () {
    $image = __DIR__ . '/assets/kamiql.png';
    if (!file_exists($image)) {
        http_response_code(404);
        exit('Image not found');
    }
    header('Content-Type: image/png');
    readfile($image);
});

Router::set404(fn () => exit('Route not found'));

Router::run();