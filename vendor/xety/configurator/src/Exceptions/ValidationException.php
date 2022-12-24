<?php
namespace Xety\Configurator\Exceptions;

use \InvalidArgumentException;

class ValidationException extends InvalidArgumentException implements ConfiguratorExceptionInterface
{
    protected $message = "Option name must be a valid string.";
}
