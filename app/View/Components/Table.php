<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Table extends Component
{

    public $headType = '';

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($headType = '')
    {
        $this->headType = $headType;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.table');
    }

}
