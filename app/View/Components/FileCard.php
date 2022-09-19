<?php

namespace App\View\Components;

use Illuminate\View\Component;

class FileCard extends Component
{
    public $fileName;
    public $dateAdded;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($fileName, $dateAdded)
    {
        $this->fileName = $fileName;
        $this->dateAdded = $dateAdded;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.cards.file-card');
    }

}
