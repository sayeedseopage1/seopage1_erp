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

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($title, $value, $icon, $info = null, $widgetId = null)
    {
        $this->title = $title;
        $this->value = $value;
        $this->icon = $icon;
        $this->info = $info;
        $this->widgetId = $widgetId;
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
