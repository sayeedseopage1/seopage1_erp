<?php

namespace Doctrine\DBAL\Driver\OCI8\Middleware;

use Doctrine\DBAL\Driver;
use Doctrine\DBAL\Driver\Connection;
use Doctrine\DBAL\Driver\Middleware;
use Doctrine\DBAL\Driver\Middleware\AbstractDriverMiddleware;
<<<<<<< HEAD
use SensitiveParameter;
=======
>>>>>>> 1f8fa8284 (env)

class InitializeSession implements Middleware
{
    public function wrap(Driver $driver): Driver
    {
        return new class ($driver) extends AbstractDriverMiddleware {
            /**
             * {@inheritDoc}
             */
<<<<<<< HEAD
            public function connect(
                #[SensitiveParameter]
                array $params
            ): Connection {
=======
            public function connect(array $params): Connection
            {
>>>>>>> 1f8fa8284 (env)
                $connection = parent::connect($params);

                $connection->exec(
                    'ALTER SESSION SET'
                        . " NLS_DATE_FORMAT = 'YYYY-MM-DD HH24:MI:SS'"
                        . " NLS_TIME_FORMAT = 'HH24:MI:SS'"
                        . " NLS_DATE_FORMAT = 'YYYY-MM-DD HH24:MI:SS'"
                        . " NLS_TIMESTAMP_FORMAT = 'YYYY-MM-DD HH24:MI:SS'"
                        . " NLS_TIMESTAMP_TZ_FORMAT = 'YYYY-MM-DD HH24:MI:SS TZH:TZM'"
                        . " NLS_NUMERIC_CHARACTERS = '.,'",
                );

                return $connection;
            }
        };
    }
}
