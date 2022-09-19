<?php

namespace App\View\Components\Cards;

use Illuminate\View\Component;

class LeadCard extends Component
{

    public $lead;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($lead)
    {
        $this->lead = $lead;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.cards.lead-card');
    }

}
