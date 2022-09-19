<?php

namespace App\View\Components\Cards;

use Illuminate\View\Component;

class Notification extends Component
{

    public $link;
    public $image;
    public $title;
    public $text;
    public $time;
    public $notification;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($link, $image, $title, $time, $notification, $text = null)
    {
        $this->link = $link;
        $this->image = $image;
        $this->title = $title;
        $this->text = $text;
        $this->time = $time;
        $this->notification = $notification;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.cards.notification');
    }

}
