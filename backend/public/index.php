<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();
$app->addRoutingMiddleware();

$serveIndex = function (Request $req, Response $res) {
    $html = file_get_contents(__DIR__ . '/index.html');
    $res->getBody()->write($html);
    return $res->withHeader('Content-Type', 'text/html');
};

$app->get('/', $serveIndex);

$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function (Request $req, Response $res) {
    return $res
        ->withHeader('Location', '/')
        ->withStatus(302);
});

$app->run();
