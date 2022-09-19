<?php

namespace App\View\Components\Forms;

use Illuminate\View\Component;

class Checkbox extends Component
{
    public $fieldLabel;
    public $fieldName;
    public $fieldId;
    public $checked;
    public $fieldValue;
    public $popover;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($fieldLabel, $fieldName, $fieldId, $checked = false, $fieldValue = null, $popover = null)
    {
        $this->fieldLabel = $fieldLabel;
        $this->checked = $checked;
        $this->fieldValue = $fieldValue;
        $this->fieldName = $fieldName;
        $this->fieldId = $fieldId;
        $this->popover = $popover;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.forms.checkbox');
    }

}
