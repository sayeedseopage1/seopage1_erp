<?php

namespace App\View\Components;

use App\Models\Setting;
use Illuminate\View\Component;

class Auth extends Component
{

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        $global = global_setting();
        return view('components.auth', ['global' => $global]);
    }

}
