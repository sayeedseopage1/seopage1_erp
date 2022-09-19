<?php

namespace App\View\Components\Forms;

use Illuminate\View\Component;

class Tel extends Component
{
    public $fieldLabel;
    public $fieldRequired;
    public $fieldPlaceholder;
    public $fieldValue;
    public $fieldName;
    public $fieldId;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($fieldLabel, $fieldPlaceholder, $fieldName, $fieldId, $fieldRequired = false, $fieldValue = null)
    {
        $this->fieldLabel = $fieldLabel;
        $this->fieldRequired = $fieldRequired;
        $this->fieldPlaceholder = $fieldPlaceholder;
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
        return view('components.forms.tel');
    }

}
