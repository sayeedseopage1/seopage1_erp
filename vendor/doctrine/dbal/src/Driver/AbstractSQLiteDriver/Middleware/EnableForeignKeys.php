<?php

namespace Doctrine\DBAL\Driver\AbstractSQLiteDriver\Middleware;

use Doctrine\DBAL\Driver;
use Doctrine\DBAL\Driver\Connection;
use Doctrine\DBAL\Driver\Middleware;
use Doctrine\DBAL\Driver\Middleware\AbstractDriverMiddleware;
<<<<<<< HEAD
use SensitiveParameter;
=======
>>>>>>> 1f8fa8284 (env)

class EnableForeignKeys implements Middleware
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

                $connection->exec('PRAGMA foreign_keys=ON');

                return $connection;
            }
        };
    }
}
