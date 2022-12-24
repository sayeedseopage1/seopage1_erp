# Xety\Configurator\Configurator
Configurator class.

## Implements:
`Xety\Configurator\Interfaces\ConfiguratorInterface`, `Xety\Configurator\Interfaces\ConfiguratorOptionInterface`



## Methods

| Name | Description |
|------|-------------|
|[set](#configuratorset)|Set the values to the options array.|
|[get](#configuratorget)|Get all the options with their values.|
|[flush](#configuratorflush)|Flush a list of options from the config array.|
|[merge](#configuratormerge)|Merge the values to the options array.|
|[clear](#configuratorclear)|Clear all options stored.|
|[setOption](#configuratorsetoption)|Set a value to the given option.|
|[getOption](#configuratorgetoption)|Get an option value.|
|[hasOption](#configuratorhasoption)|Check if the option exist.|
|[flushOption](#configuratorflushoption)|Flush an option.|
|[pushOption](#configuratorpushoption)|Push the listed args to the named option.|
|[consumeOption](#configuratorconsumeoption)|Read then flush an option.|
|[transientOption](#configuratortransientoption)|Adds a transient configuration key/value.|




### Configurator::clear
```php
public clear (void)
```

**Description**

Clear all options stored.


**Parameters**

`This function has no parameters.`


**Return Values**

`\Xety\Configurator\Configurator`





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

* `(string) $name`
: The name of the option to read then flush.

**Return Values**

`mixed`





### Configurator::flush
```php
public flush (string $filter)
```

**Description**

Flush a list of options from the config array.
Usage:
```php
$this->flush('key1', 'key2');
```

**Parameters**

* `(string) $filter`
: All the options to remove from the config.

**Return Values**

`\Xety\Configurator\Configurator`





### Configurator::flushOption
```php
public flushOption (string $name)
```

**Description**

Flush an option.


**Parameters**

* `(string) $name`
: The name of the option to flush.

**Return Values**

`\Xety\Configurator\Configurator`





### Configurator::get
```php
public get (void)
```

**Description**

Get all the options with their values.


**Parameters**

`This function has no parameters.`


**Return Values**

`array`





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

* `(string) $name`
: The option name to to get.

**Return Values**

`mixed`





### Configurator::hasOption
```php
public hasOption (string $name)
```

**Description**

Check if the option exist.


**Parameters**

* `(string) $name`
: The option name to check.

**Return Values**

`bool`





### Configurator::merge
```php
public merge (array $values, bool $invert)
```

**Description**

Merge the values to the options array.


**Parameters**

* `(array) $values`
: The values to merge in the config.* `(bool) $invert`
: Invert the merge by merging the actual config into the values.

**Return Values**

`\Xety\Configurator\Configurator`





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
        value2 => value3
    ]
]
```

**Parameters**

* `(string) $name`
: The name of the option.* `(array) $args`
: A list of values to push into the option key.

**Return Values**

`\Xety\Configurator\Configurator`





### Configurator::set
```php
public set (array $values)
```

**Description**

Set the values to the options array.
This function will replace all the configuration options.

**Parameters**

* `(array) $values`
: The values to push into the config.

**Return Values**

`\Xety\Configurator\Configurator`





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

* `(string) $name`
: The option name.* `(mixed) $value`
: The option value.

**Return Values**

`\Xety\Configurator\Configurator`





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

* `(string) $name`
: The name of the option.* `(mixed) $value`
: The value to set.

**Return Values**

`\Xety\Configurator\Configurator`




