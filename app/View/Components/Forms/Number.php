<?php

namespace App\View\Components\Forms;

use Illuminate\View\Component;

class Number extends Component
{

    public $fieldLabel;
    public $fieldRequired;
    public $fieldPlaceholder;
    public $fieldValue;
    public $fieldName;
    public $fieldId;
    public $fieldHelp;
    public $minValue;
    public $maxValue;
    public $popover;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($fieldLabel, $fieldName, $fieldId,  $fieldRequired = false, $fieldValue = null,$fieldHelp = null, $minValue = 0, $maxValue = '', $popover = null, $fieldPlaceholder = null)
    {
        $this->fieldLabel = $fieldLabel;
        $this->fieldRequired = $fieldRequired;
        $this->fieldValue = $fieldValue;
        $this->fieldName = $fieldName;
        $this->fieldId = $fieldId;
        $this->fieldHelp = $fieldHelp;
        $this->minValue = $minValue;
        $this->maxValue = $maxValue;
        $this->popover = $popover;
        $this->fieldPlaceholder = $fieldPlaceholder;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.forms.number');
    }

}
