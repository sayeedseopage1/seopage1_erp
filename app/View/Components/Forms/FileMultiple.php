<?php

namespace App\View\Components\Forms;

use Illuminate\View\Component;

class FileMultiple extends Component
{
    public $fieldLabel;
    public $fieldName;
    public $fieldId;
    public $fieldHelp;
    public $fieldRequired;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($fieldId, $fieldName, $fieldLabel, $fieldHelp = null, $fieldRequired = false)
    {
        $this->fieldLabel = $fieldLabel;
        $this->fieldName = $fieldName;
        $this->fieldId = $fieldId;
        $this->fieldHelp = $fieldHelp;
        $this->fieldRequired = $fieldRequired;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.forms.file-multiple');
    }

}
