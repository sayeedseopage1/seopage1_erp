<h1 align="center">Configurator</h1>

|Travis|Coverage|Stable Version|Downloads|PHP|License|
|:-------:|:------:|:-------:|:------:|:-------:|:-------:|
|[![Build Status](https://img.shields.io/travis/Xety/Configurator.svg?style=flat-square)](https://travis-ci.org/Xety/Configurator)|[![Coverage Status](https://img.shields.io/coveralls/Xety/Configurator/master.svg?style=flat-square)](https://coveralls.io/r/Xety/Configurator)|[![Latest Stable Version](https://img.shields.io/packagist/v/Xety/Configurator.svg?style=flat-square)](https://packagist.org/packages/xety/configurator)|[![Total Downloads](https://img.shields.io/packagist/dt/xety/configurator.svg?style=flat-square)](https://packagist.org/packages/xety/configurator)|[![Laravel 5.4](https://img.shields.io/badge/PHP->=7.0-brightgreen.svg?style=flat-square)](https://travis-ci.org/Xety/Configurator)|[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/Xety/Configurator/blob/master/LICENSE)|

A simple configuration class without dependencies that use the Fluent pattern.

# Requirement
![PHP](https://img.shields.io/badge/PHP->=7.0-brightgreen.svg?style=flat-square)

# Installation
```sh
composer require xety/configurator
```

# Usage
The `Configurator` class is an abstract class, so you just need to `extends` it:
```php
<?php
namespace App;

use Xety\Configurator\Configurator;

class MyClass extends Configurator
{
}
```

If you want to setup a default configuration for your class, just do the following :
```php
<?php
class MyClass extends Configurator
{
    protected $defaultConfig = [
        'key' => 'value',
        //etc
    ];

    public function __construct()
    {
        $this->set($defaultConfig);
    }
}
```

# Docs

## Methods

| Name | Description |
|------|-------------|
|[setConfig](#configuratorsetconfig)|Set the values to the options array.|
|[getConfig](#configuratorgetconfig)|Get all the options with their values.|
|[flushConfig](#configuratorflushconfig)|Flush a list of options from the config array.|
|[mergeConfig](#configuratormergeconfig)|Merge the values to the options array.|
|[clearConfig](#configuratorclearconfig)|Clear all options stored.|
|[setOption](#configuratorsetoption)|Set a value to the given option.|
|[getOption](#configuratorgetoption)|Get an option value.|
|[hasOption](#configuratorhasoption)|Check if the option exist.|
|[flushOption](#configuratorflushoption)|Flush an option.|
|[pushOption](#configuratorpushoption)|Push the listed args to the named option.|
|[consumeOption](#configuratorconsumeoption)|Read then flush an option.|
|[transientOption](#configuratortransientoption)|Adds a transient configuration key/value.|





### Configurator::setConfig
```php
public setConfig (array $values)
```

**Description**

Set the values to the options array.
This function will replace all the configuration options.

**Parameters**

* `(array) $values` : The values to push into the config.

**Return Values**

`\Xety\Configurator\Configurator::class`





### Configurator::getConfig
```php
public getConfig (void)
```

**Description**

Get all the options with their values.


**Parameters**

`This function has no parameters.`


**Return Values**

`array`





### Configurator::flushConfig
```php
public flushConfig (string ...$filter)
```

**Description**

Flush a list of options from the options array.

Usage:
```php
$this->flushConfig('key1', 'key2', 'key3');
```

**Parameters**

* `(string) ...$filter` : All the options to remove from the config.

**Return Values**

`\Xety\Configurator\Configurator::class`





### Configurator::mergeConfig
```php
public mergeConfig (array $values, bool $invert = false)
```

**Description**

Merge the values to the options array.


**Parameters**

* `(array) $values` : The values to merge in the config.
* `(bool) $invert` : Invert the merge by merging the actual config into the values.

**Return Values**

`\Xety\Configurator\Configurator::class`





### Configurator::clearConfig
```php
public clearConfig (void)
```

**Description**

Clear all options stored.


**Parameters**

`This function has no parameters.`


**Return Values**

`\Xety\Configurator\Configurator::class`





### Configurator::setOption
```php
public setOption (string $name, mixed $value)
```

**Description**

Set a value to the given option.

Usage:
```php
$this->setOption('key', 'value');
$this->setOption('key', ['key2' => ['value2']]);
```

**Parameters**

* `(string) $name` : The option name.
* `(mixed) $value` : The option value.

**Return Values**

`\Xety\Configurator\Configurator::class`





### Configurator::getOption
```php
public getOption (string $name)
```

**Description**

Get an option value.

Usage:
```php
$this->getOption('key');
```

**Parameters**

* `(string) $name` : The option name to to get.

**Return Values**

`mixed`





### Configurator::hasOption
```php
public hasOption (string $name)
```

**Description**

Check if the option exist.


**Parameters**

* `(string) $name` : The option name to check.

**Return Values**

`bool`





### Configurator::flushOption
```php
public flushOption (string $name)
```

**Description**

Flush an option.


**Parameters**

* `(string) $name` : The name of the option to flush.

**Return Values**

`\Xety\Configurator\Configurator::class`





### Configurator::pushOption
```php
public pushOption (string $name, array $args)
```

**Description**

Push the listed args to the named option.

Usage:
```php
$this->pushOption('key', ['key1' => 'value1'], ['key2' => ['value2' => 'value3']]);
```
Result:
```php
'key' => [
    'key1' => 'value1',
    'key2' => [
        'value2' => 'value3'
    ]
]
```

**Parameters**

* `(string) $name` : The name of the option.
* `(array) $args` : A list of values to push into the option key.

**Return Values**

`\Xety\Configurator\Configurator::class`





### Configurator::consumeOption
```php
public consumeOption (string $name)
```

**Description**

Read then flush an option.
Exemple:

Config:
```php
$config = [
    'key1' => 'value1'
];
```
Usage:
```php
$result = $this->consumeOption('key1');
```
Result:
```php
echo $result; // value1
var_dump($config); // []
```

**Parameters**

* `(string) $name` : The name of the option to read then flush.

**Return Values**

`mixed`





### Configurator::transientOption
```php
public transientOption (string $name, mixed $value)
```

**Description**

Adds a transient configuration key/value.

Usage:
```php
// Will update the value of the key `key` if it exist,
// or it will create it with the value `value`.
 $this->transientOption('key', 'value');
```

**Parameters**

* `(string) $name` : The name of the option.
* `(mixed) $value` : The value to set.

**Return Values**

`\Xety\Configurator\Configurator::class`

# Contribute
If you want to contribute, please [follow this guide](https://github.com/Xety/Configurator/blob/master/.github/CONTRIBUTING.md).