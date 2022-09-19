<?php

namespace App\View\Components;

use Illuminate\View\Component;

class SettingMenuItem extends Component
{

    public $href;
    public $text;
    public $active;
    public $menu;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($href, $text, $menu, $active = false)
    {
        $this->text = $text;
        $this->href = $href;
        $this->active = $active;
        $this->menu = $menu;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.setting-menu-item');
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function isActive($option)
    {
        return $option === $this->active;
    }

}
