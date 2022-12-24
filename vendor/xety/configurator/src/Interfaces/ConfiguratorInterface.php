<?php
namespace Xety\Configurator\Interfaces;

interface ConfiguratorInterface
{
    /**
     * Set the values to the options array.
     * Will replace all the configuration options.
     *
     * @param array $values The values to push into the config.
     */
    public function setConfig(array $values);

    /**
     * Get all the options.
     *
     * @return array
     */
    public function getConfig();

    /**
     * Merge the values to the options array, or the current options in
     * the values if the param `invert` is true.
     *
     * @param array $values The values to merge in the config.
     * @param bool $invert Invert the merge by merging the actual config into the values.
     */
    public function mergeConfig(array $values, bool $invert);

    /**
     * Flush a list of options from the config array.
     *
     * @param string ...$filter List of options to remove from the options array.
     */
    public function flushConfig(string ...$filter);
}
