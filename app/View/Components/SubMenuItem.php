<?php

namespace App\View\Components;

use Illuminate\View\Component;

class SubMenuItem extends Component
{

    public $text;
    public $link;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($text, $link)
    {
        $this->text = $text;
        $this->link = $link;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.sub-menu-item');
    }

}
