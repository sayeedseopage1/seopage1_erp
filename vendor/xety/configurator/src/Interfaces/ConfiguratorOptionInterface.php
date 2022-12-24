<?php
namespace Xety\Configurator\Interfaces;

interface ConfiguratorOptionInterface
{
    /**
     * Set a value to the given option.
     *
     * @param string $name The option name.
     * @param mixed $value The option value.
     */
    public function setOption(string $name, $value);

    /**
     * Get an option value.
     *
     * @param string $name The option name to to get.
     */
    public function getOption(string $name);

    /**
     * Check if the option exist.
     *
     * @param string $name The option name to check.
     */
    public function hasOption(string $name);

    /**
     * Read then flush an option.
     *
     * @param string $name The name of the option to read then flush.
     */
    public function consumeOption(string $name);

    /**
     * Flush an option.
     *
     * @param string $name The name of the option to flush.
     */
    public function flushOption(string $name);
}
