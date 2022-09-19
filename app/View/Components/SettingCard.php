<?php

namespace App\View\Components;

use Illuminate\View\Component;

class SettingCard extends Component
{
    public $method;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($method = 'PUT')
    {
        $this->method = $method;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.setting-card');
    }

}
