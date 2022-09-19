<?php

namespace App\View\Components\Cards;

use Illuminate\View\Component;

class OnboardingItem extends Component
{

    public $title;
    public $summary;
    public $completed;
    public $link;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($title, $summary, $completed = false, $link = '')
    {
        $this->title = $title;
        $this->summary = $summary;
        $this->completed = $completed;
        $this->link = $link;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.cards.onboarding-item');
    }
    
}
