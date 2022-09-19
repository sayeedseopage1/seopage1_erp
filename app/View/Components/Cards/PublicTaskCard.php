<?php

namespace App\View\Components\Cards;

use Illuminate\View\Component;

class PublicTaskCard extends Component
{
    public $task;
    public $draggable;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($task, $draggable = 'true')
    {
        $this->task = $task;
        $this->draggable = $draggable;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.cards.public-task-card');
    }

}
