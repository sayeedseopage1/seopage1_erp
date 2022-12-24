<?php
namespace Xety\Configurator\Tests;

use Xety\Configurator\Exceptions\InvalidArgumentNumberException;
use Xety\Configurator\Exceptions\ValidationException;
use Xety\Configurator\Tests\Vendor\Xety;

class ConfiguratorTest extends TestCase
{
    /**
     * The Configurator instance.
     *
     * @var \Xety\Configurator\Tests\Vendor\Xety
     */
    protected $configurator;

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();

        $this->configurator = new Xety;
    }

    /**
     * testSet method
     *
     * @return void
     */
    public function testSet()
    {
        $options = [
            'foo' => 'bar',
            'foz' => [
                'baz' => 'foo'
            ]
        ];

        $result = $this->configurator->setConfig($options);

        $this->assertSame($options, $result->getConfig());
    }

    /**
     * testSetOption method
     *
     * @return void
     */
    public function testSetOption()
    {
        $options = [
            'foo' => 'bar'
        ];

        $result = $this->configurator->setOption('foo', 'bar');
        $this->assertSame($options, $result->getConfig());

        $options = [
            'foo' => [
                'bar' => 'bez'
            ]
        ];

        $this->configurator->setOption('foo', ['bar' => 'bez']);
        $this->assertSame($options, $this->configurator->getConfig());

        $this->configurator->setOption('foo', 'bar');
        $this->configurator->setOption('foo', 'bar2');
        $this->assertSame(['foo' => 'bar2'], $this->configurator->getConfig());
    }

    /**
     * testGetOption method
     *
     * @return void
     */
    public function testGetOption()
    {
        $this->configurator->setOption('foo', 'bar');
        $this->assertSame('bar', $this->configurator->getOption('foo'));
        $this->assertNull($this->configurator->getOption('foo2'));
    }

    /**
     * testHasOption method
     *
     * @return void
     */
    public function testHasOption()
    {
        $this->configurator->setOption('foo', 'bar');
        $this->assertTrue($this->configurator->hasOption('foo'));
        $this->assertFalse($this->configurator->hasOption('bar'));
    }

    /**
     * testMerge method
     *
     * @return void
     */
    public function testMerge()
    {
        $options = [
            'foo' => 'bar',
            'baz' => [
                'ter',
                'far'
            ],
            'par' => 'dar'
        ];
        $result = $this->configurator->setConfig($options);

        $merge = [
            'foo' => 'bar2',
            'baz' => [
                'ter'
            ]
        ];
        $this->configurator->mergeConfig($merge);

        $expected = [
            'foo' => 'bar2',
            'baz' => [
                'ter'
            ],
            'par' => 'dar'
        ];
        $this->assertSame($expected, $this->configurator->getConfig());
    }

    /**
     * testMergeWithInvert method
     *
     * @return void
     */
    public function testMergeWithInvert()
    {
        $options = [
            'foo' => 'bar',
            'baz' => [
                'ter' => [
                    'tar'
                ],
                'far'
            ]
        ];
        $result = $this->configurator->setConfig($options);

        $merge = [
            'foo' => 'bar2',
            'baz' => [
                'ter'
            ],
            'par' => 'dar'
        ];
        $this->configurator->mergeConfig($merge, true);

        $expected = [
            'foo' => 'bar',
            'baz' => [
                'ter' => [
                    'tar'
                ],
                'far'
            ],
            'par' => 'dar'
        ];
        $this->assertSame($expected, $this->configurator->getConfig());
    }

    /**
     * testConsumeOption method
     *
     * @return void
     */
    public function testConsumeOption()
    {
        $options = [
            'foo' => 'bar',
            'baz' => [
                'ter' => [
                    'tar' => [
                        'tir'
                    ]
                ],
                'lop' => 'lip'
            ],
            'par' => 'dar'
        ];
        $this->configurator->setConfig($options);

        $result = $this->configurator->consumeOption('foo');
        $this->assertSame('bar', $result);
        $this->assertFalse($this->configurator->hasOption('foo'));

        $expected = [
            'ter' => [
                'tar' => [
                    'tir'
                ]
            ],
            'lop' => 'lip'
        ];
        $result = $this->configurator->consumeOption('baz');
        $this->assertSame($expected, $result);
        $this->assertFalse($this->configurator->hasOption('baz'));

        $expected = [
            'par' => 'dar'
        ];
        $this->assertSame($expected, $this->configurator->getConfig());
    }

    /**
     * testConsumeOptionDoesNotExist method
     *
     * @return void
     */
    public function testConsumeOptionDoesNotExist()
    {
        $this->configurator->setConfig(['foo' => 'bar']);
        $this->assertNull($this->configurator->consumeOption('unknown'));
    }

    /**
     * testFlush method
     *
     * @return void
     */
    public function testFlush()
    {
        $options = [
            'foo' => 'bar',
            'baz' => [
                'ter' => [
                    'tar' => [
                        'tir'
                    ]
                ]
            ],
            'par' => 'dar'
        ];
        $this->configurator->setConfig($options);
        $result = $this->configurator->flushConfig('foo', 'baz');
        $this->assertSame(['par' => 'dar'], $result->getConfig());
    }

    /**
     * testFlush method
     *
     * @return void
     */
    public function testClear()
    {
        $options = [
            'foo' => 'bar',
            'baz' => [
                'ter' => [
                    'tar' => [
                        'tir'
                    ]
                ]
            ],
            'par' => 'dar'
        ];
        $this->configurator->setConfig($options);
        $result = $this->configurator->clearConfig();
        $this->assertSame([], $result->getConfig());
    }

    /**
     * testPushOption method
     *
     * @return void
     */
    public function testPushOption()
    {
        $options = [
            'foo' => [
                'ter' => [
                    'tar' => [
                        'tir'
                    ]
                ]
            ]
        ];
        $this->configurator->setConfig($options);

        $class = new \stdClass();

        $result = $this->configurator->pushOption(
            'foo',
            ['baz' => ['fop']],
            ['class' => $class]
        );

        $expected = [
            'foo' => [
                'ter' => [
                    'tar' => [
                        'tir'
                    ]
                ],
                'baz' => [
                    'fop'
                ],
                'class' => $class
            ]
        ];
        $this->assertSame($expected, $result->getConfig());
    }

    /**
     * testPushOptionNoArgs method
     *
     * @return void
     */
    public function testPushOptionNoArgs()
    {
        $this->expectException(InvalidArgumentNumberException::class);

        $result = $this->configurator->pushOption('tir');
    }

    /**
     * testTransientOption method
     *
     * @return void
     */
    public function testTransientOption()
    {
        $options = [
            'foo' => 'bar',
            'par' => 'tor'
        ];
        $this->configurator->setConfig($options);

        $result = $this->configurator->transientOption('tor', 'bar');

        $expected = [
            'foo' => 'bar',
            'par' => 'tor',
            'tor' => 'bar'
        ];
        $this->assertSame($expected, $result->getConfig());

        $result = $this->configurator->transientOption('foo', 'bar2');

        $expected = [
            'foo' => 'bar2',
            'par' => 'tor',
            'tor' => 'bar'
        ];
        $this->assertSame($expected, $result->getConfig());
    }

    /**
     * testValidateName method
     *
     * @return void
     */
    public function testValidateName()
    {
        $this->expectException(ValidationException::class);

        $this->configurator->getOption('');
    }
}
