<?php
namespace Xety\Configurator;

use Xety\Configurator\Exceptions\InvalidArgumentNumberException;
use Xety\Configurator\Exceptions\ValidationException;
use Xety\Configurator\Interfaces\ConfiguratorInterface;
use Xety\Configurator\Interfaces\ConfiguratorOptionInterface;

/**
 * Configurator class.
 */
abstract class Configurator implements ConfiguratorInterface, ConfiguratorOptionInterface
{
    /**
     * Array of options currently stored.
     *
     * @var array
     */
    protected $config = [];

    /**
     * Set the values to the options array.
     *
     * This function will replace all the configuration options.
     *
     * @param array $values The values to push into the config.
     *
     * @return \Xety\Configurator\Configurator
     */
    public function setConfig(array $values): Configurator
    {
        $this->config = $values;

        return $this;
    }

    /**
     * Get all the options with their values.
     *
     * @return array
     */
    public function getConfig(): array
    {
        return $this->config;
    }

    /**
     * Merge the values to the options array.
     *
     * @param array $values The values to merge in the config.
     * @param bool $invert Invert the merge by merging the actual config into the values.
     *
     * @return \Xety\Configurator\Configurator
     */
    public function mergeConfig(array $values, bool $invert = false): Configurator
    {
        $this->config = ($invert) ? array_merge($values, $this->config) : array_merge($this->config, $values);

        return $this;
    }

    /**
     * Flush a list of options from the config array.
     *
     * Usage:
     * ```php
     * $this->flush('key1', 'key2');
     * ```
     *
     * @param string ...$filter All the options to remove from the config.
     *
     * @return \Xety\Configurator\Configurator
     */
    public function flushConfig(string ...$filter): Configurator
    {
        $filter = array_flip($filter);
        $this->config = array_diff_key($this->config, $filter);

        return $this;
    }

    /**
     * Clear all options stored.
     *
     * @return \Xety\Configurator\Configurator
     */
    public function clearConfig(): Configurator
    {
        $this->config = [];

        return $this;
    }

    /**
     * Set a value to the given option.
     *
     * Usage:
     * ```php
     * $this->setOption('key', 'value');
     * $this->setOption('key', ['key2' => ['value2']]);
     * ```
     *
     * @param string $name The option name.
     * @param mixed $value The option value.
     *
     * @return \Xety\Configurator\Configurator
     */
    public function setOption(string $name, $value): Configurator
    {
        $this->validateName($name);
        $this->config[$name] = $value;

        return $this;
    }

    /**
     * Get an option value.
     *
     * Usage:
     * ```php
     * $this->getOption('key');
     * ```
     *
     * @param string $name The option name to to get.
     *
     * @return mixed
     */
    public function getOption(string $name)
    {
        $this->validateName($name);

        if (array_key_exists($name, $this->config)) {
            return $this->config[$name];
        }

        return null;
    }

    /**
     * Check if the option exist.
     *
     * @param string $name The option name to check.
     *
     * @return bool
     */
    public function hasOption(string $name): bool
    {
        $this->validateName($name);

        return array_key_exists($name, $this->config);
    }

    /**
     * Read then flush an option.
     *
     * Exemple:
     *
     * Config:
     * ```php
     * $config = [
     *     'key1' => 'value1'
     * ];
     * ```
     * Usage:
     * ```php
     * $result = $this->consumeOption('key1');
     * ```
     * Result:
     * ```php
     * echo $result; // value1
     * var_dump($config); // []
     * ```
     *
     * @param string $name The name of the option to read then flush.
     *
     * @return mixed
     */
    public function consumeOption(string $name)
    {
        $this->validateName($name);

        if (!array_key_exists($name, $this->config)) {
            return null;
        }
        $value = $this->config[$name];

        $this->flushOption($name);

        return $value;
    }

    /**
     * Push the listed args to the named option.
     *
     * Usage:
     * ```php
     * $this->pushOption('key', ['key1' => 'value1'], ['key2' => ['value2' => 'value3']]);
     * ```
     * Result:
     * ```php
     * 'key' => [
     *     'key1' => 'value1',
     *     'key2' => [
     *         value2 => value3
     *     ]
     * ]
     * ```
     *
     * @param string $name The name of the option.
     * @param array ...$args A list of values to push into the option key.
     *
     * @throws \Xety\Configurator\Exceptions\InvalidArgumentNumberException
     *          When the args list is empty.
     *
     * @return \Xety\Configurator\Configurator
     */
    public function pushOption(string $name, array ...$args): Configurator
    {
        $this->validateName($name);

        if (empty($args)) {
            throw new InvalidArgumentNumberException();
        }

        foreach ($args as $arg) {
            if (is_array($arg)) {
                foreach ($arg as $key => $value) {
                    $this->config[$name][$key] = $value;
                }
            }
        }

        return $this;
    }

    /**
     * Flush an option.
     *
     * @param string $name The name of the option to flush.
     *
     * @return \Xety\Configurator\Configurator
     */
    public function flushOption(string $name): Configurator
    {
        $this->validateName($name);

        if ($this->hasOption($name)) {
            unset($this->config[$name]);
        }

        return $this;
    }

    /**
     * Adds a transient configuration key/value.
     *
     * Usage:
     * ```php
     * // Will update the value of the key `key` if it exist,
     * // or it will create it with the value `value`.
     *  $this->transientOption('key', 'value');
     * ```
     *
     * @param string $name The name of the option.
     * @param mixed $value The value to set.
     *
     * @return \Xety\Configurator\Configurator
     */
    public function transientOption(string $name, $value): Configurator
    {
        $this->validateName($name);

        return $this->mergeConfig([$name => $value]);
    }

    /**
     * Validate a name.
     *
     * @param string $name The name to validate.
     *
     * @throws \Xety\Configurator\Exceptions\ValidationException When the validation fail.
     *
     * @return void
     */
    protected function validateName(string $name)
    {
        if (!is_string($name) || empty($name)) {
            throw new ValidationException();
        }
    }
}
