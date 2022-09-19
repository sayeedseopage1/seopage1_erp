<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Status extends Component
{

    public $style;
    public $color;
    public $value;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($value, $style = '', $color = 'red')
    {
        $this->style = $style;
        $this->color = $color;
        $this->value = $value;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.status');
    }

}
