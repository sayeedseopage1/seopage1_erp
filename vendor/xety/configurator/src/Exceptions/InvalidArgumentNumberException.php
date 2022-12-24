<?php
namespace Xety\Configurator\Exceptions;

use \InvalidArgumentException;

class InvalidArgumentNumberException extends InvalidArgumentException implements ConfiguratorExceptionInterface
{
    protected $message = "The number of args you provided does not correspond to the required number of args.";
}
