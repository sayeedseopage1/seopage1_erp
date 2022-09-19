<?php

namespace App\View\Components;

use Illuminate\View\Component;

class DateBadge extends Component
{

    public $month;
    public $date;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($month, $date)
    {
        $this->month = $month;
        $this->date = $date;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.date-badge');
    }

}
