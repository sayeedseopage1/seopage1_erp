<?php

namespace App\View\Components\Forms;

use Illuminate\View\Component;

class ButtonPrimary extends Component
{

    public $icon;
    public $disabled;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($icon = '', $disabled = false)
    {
        $this->icon = $icon;
        $this->disabled = $disabled;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.forms.button-primary');
    }

}
