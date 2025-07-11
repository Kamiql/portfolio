<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();
$app->addRoutingMiddleware();

$app->get('/assets/{file:.+}', function (Request $req, Response $res, array $args) {
    $filePath = __DIR__ . '/assets/' . $args['file'];

    if (!file_exists($filePath) || !is_file($filePath)) {
        return $res->withStatus(404)->write('File not found');
    }

    $mimeType = mime_content_type($filePath);
    $res = $res->withHeader('Content-Type', $mimeType);

    $res->getBody()->write(file_get_contents($filePath));
    return $res;
});

$app->run();
