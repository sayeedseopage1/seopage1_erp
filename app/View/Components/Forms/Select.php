<?php

namespace App\View\Components\Forms;

use Illuminate\View\Component;

class Select extends Component
{

    public $multiple;
    public $search;
    public $alignRight;
    public $fieldLabel;
    public $fieldRequired;
    public $fieldName;
    public $fieldId;
    public $popover;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(
        $fieldName,
        $fieldId,
        $fieldRequired = false,
        $fieldLabel = null,
        bool $multiple = false,
        bool $search = false,
        bool $alignRight = false,
        $popover = null
    )
    {
        $this->fieldName    = $fieldName;
        $this->fieldLabel   = $fieldLabel;
        $this->fieldId = $fieldId;
        $this->fieldRequired = $fieldRequired;
        $this->multiple   = $multiple;
        $this->search   = $search;
        $this->popover = $popover;
        $this->alignRight = $alignRight;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.forms.select');
    }

}
