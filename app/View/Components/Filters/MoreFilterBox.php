<?php

namespace App\View\Components\Filters;

use Illuminate\View\Component;

class MoreFilterBox extends Component
{
    public $extraSlot;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($extraSlot = false)
    {
        $this->extraSlot = $extraSlot;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.filters.more-filter-box');
    }

}
