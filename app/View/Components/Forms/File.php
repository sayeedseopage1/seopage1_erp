<?php

namespace App\View\Components\Forms;

use Illuminate\View\Component;

class File extends Component
{
    public $fieldLabel;
    public $fieldValue;
    public $fieldName;
    public $fieldId;
    public $fieldHelp;
    public $fieldRequired;
    public $fieldHeight;
    public $popover;
    public $allowedFileExtensions;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($fieldId, $fieldName, $fieldLabel,  $fieldValue = null,$fieldHelp = null, $fieldRequired = false, $fieldHeight = 100, $popover = null, $allowedFileExtensions = null)
    {
        $this->fieldLabel = $fieldLabel;
        $this->fieldValue = $fieldValue;
        $this->fieldName = $fieldName;
        $this->fieldId = $fieldId;
        $this->fieldHelp = $fieldHelp;
        $this->fieldRequired = $fieldRequired;
        $this->fieldHeight = $fieldHeight;
        $this->popover = $popover;
        $this->allowedFileExtensions = $allowedFileExtensions;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.forms.file');
    }

}
