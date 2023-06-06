<?php

namespace App\View\Components\Cards;

use Illuminate\View\Component;

class Widget extends Component
{
    public $title;
    public $value;
    public $icon;
    public $info;
    public $widgetId;
    public $badge;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($title, $value, $icon, $info = null, $widgetId = null, $badge = false)
    {
        $this->title = $title;
        $this->value = $value;
        $this->icon = $icon;
        $this->info = $info;
        $this->widgetId = $widgetId;
        $this->badge = $badge;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.cards.widget');
    }

}
