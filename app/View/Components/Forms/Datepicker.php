<?php

namespace App\View\Components\Forms;

use Illuminate\View\Component;

class Datepicker extends Component
{
    public $fieldLabel;
    public $fieldRequired;
    public $fieldPlaceholder;
    public $fieldValue;
    public $fieldName;
    public $fieldId;
    public $fieldHelp;
    public $custom;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($fieldLabel, $fieldPlaceholder, $fieldName, $fieldId, $fieldRequired = false, $fieldValue = null, $fieldHelp = null, $custom = false)
    {
        $this->fieldLabel = $fieldLabel;
        $this->fieldRequired = $fieldRequired;
        $this->fieldPlaceholder = $fieldPlaceholder;
        $this->fieldValue = $fieldValue;
        $this->fieldName = $fieldName;
        $this->fieldId = $fieldId;
        $this->fieldHelp = $fieldHelp;
        $this->custom = $custom; // If used in custom fields
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.forms.datepicker');
    }

}
