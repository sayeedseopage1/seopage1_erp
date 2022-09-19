<?php

namespace App\View\Components;

use Illuminate\View\Component;

class ClientSelectionDropdown extends Component
{

    public $clients;
    public $selected;
    public $fieldRequired;
    
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($clients, $selected = null, $fieldRequired = true)
    {
        $this->clients = $clients;
        $this->selected = $selected;
        $this->fieldRequired = $fieldRequired;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.client-selection-dropdown');
    }

}
