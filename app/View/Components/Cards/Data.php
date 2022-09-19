<?php

namespace App\View\Components\Cards;

use Illuminate\View\Component;

class Data extends Component
{

    public $title;
    public $padding;
    public $otherClasses;
    public $height;
    public $action;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($title = false, $padding = true, $otherClasses = '', $height = 'auto', $action = '')
    {
        $this->title = $title;
        $this->padding = $padding;
        $this->otherClasses = $otherClasses;
        $this->height = $height;
        $this->action = $action;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.cards.data');
    }

}
