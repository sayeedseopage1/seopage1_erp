<?php

namespace App\View\Components;

use Illuminate\View\Component;

class StackedChart extends Component
{
    public $chartData;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($chartData)
    {
        $this->chartData = $chartData;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.stacked-chart');
    }

}
