<?php

namespace App\View\Components;

use Illuminate\View\Component;

class LineChart extends Component
{
    public $chartData;
    public $multiple;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($chartData, $multiple = false)
    {
        $this->chartData = $chartData;
        $this->multiple = $multiple;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.line-chart');
    }

}
