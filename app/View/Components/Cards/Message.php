<?php

namespace App\View\Components\Cards;

use Illuminate\View\Component;

class Message extends Component
{

    public $message;
    public $user;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($message, $user)
    {
        $this->message = $message;
        $this->user = $user;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.cards.message');
    }

}
