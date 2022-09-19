<?php

namespace App\View\Components\Forms;

use Illuminate\View\Component;

class Label extends Component
{

    public $fieldId;
    public $fieldLabel;
    public $popover;
    public $fieldRequired;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(
        $fieldId,
        $fieldRequired = false,
        $fieldLabel = null,
        $popover = null
    )
    {
        $this->fieldLabel   = $fieldLabel;
        $this->fieldId = $fieldId;
        $this->popover = $popover;
        $this->fieldRequired = $fieldRequired;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.forms.label');
    }

}
