<?php

namespace App\View\Components\Forms;

use Illuminate\View\Component;

class Radio extends Component
{

    public $fieldLabel;
    public $fieldRequired;
    public $fieldValue;
    public $fieldName;
    public $fieldId;
    public $checked;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($fieldLabel, $fieldName, $fieldId, $fieldRequired = false, $fieldValue = null, $checked = false)
    {
        $this->fieldLabel = $fieldLabel;
        $this->fieldRequired = $fieldRequired;
        $this->checked = $checked;
        $this->fieldValue = $fieldValue;
        $this->fieldName = $fieldName;
        $this->fieldId = $fieldId;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.forms.radio');
    }

}
