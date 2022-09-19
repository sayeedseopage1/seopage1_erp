<?php

namespace App\View\Components;

use Illuminate\View\Component;

class TaskSelectionDropdown extends Component
{

    public $tasks;
    public $fieldRequired;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($tasks, $fieldRequired = true)
    {
        $this->tasks = $tasks;
        $this->fieldRequired = $fieldRequired;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.task-selection-dropdown');
    }

}
