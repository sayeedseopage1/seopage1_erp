<?php

namespace App\View\Components\Forms;

use Illuminate\View\Component;

class LinkPrimary extends Component
{
    public $icon;
    public $link;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($link, $icon = '')
    {
        $this->icon = $icon;
        $this->link = $link;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.forms.link-primary');
    }

}
