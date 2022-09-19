<?php

namespace App\View\Components\Cards;

use Illuminate\View\Component;

class User extends Component
{
    public $image;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($image)
    {
        $this->image = $image;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.cards.user');
    }

}
