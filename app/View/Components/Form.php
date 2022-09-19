<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Form extends Component
{
    public $spoofMethod = false;
    public $method;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($method = 'POST')
    {
        $this->method = mb_strtoupper($method);

        $this->spoofMethod = in_array($this->method, ['PUT', 'PATCH', 'DELETE']);
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.form');
    }

}
