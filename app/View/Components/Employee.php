<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Employee extends Component
{

    public $user;
    public $disabledLink;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($user, $disabledLink=null)
    {
        $this->user = $user;
        $this->disabledLink = $disabledLink;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.employee');
    }

}
