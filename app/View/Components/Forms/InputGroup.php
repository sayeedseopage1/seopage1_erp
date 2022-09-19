<?php

namespace App\View\Components\Forms;

use Illuminate\View\Component;

class InputGroup extends Component
{

    public $append;
    public $preappend;
    public $prepend;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($prepend = false, $append = false, $preappend = false)
    {
        $this->prepend = $prepend;
        $this->append = $append;
        $this->preappend = $preappend;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.forms.input-group');
    }

}
