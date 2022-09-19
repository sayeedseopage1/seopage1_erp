<?php

namespace App\View\Components;

use Illuminate\View\Component;

class PieChart extends Component
{

    public $labels;
    public $values;
    public $colors;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($labels, $values, $colors)
    {
        $this->labels = $labels;
        $this->values = $values;
        $this->colors = $colors;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.pie-chart');
    }

}
