<?php

namespace App\View\Components\Cards;

use Illuminate\View\Component;

class NoRecord extends Component
{

    public $icon;
    public $message;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($icon, $message)
    {
        $this->icon = $icon;
        $this->message = $message;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.cards.no-record');
    }

}
