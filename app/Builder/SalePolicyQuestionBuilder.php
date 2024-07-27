<?php

namespace App\Builder;

use Illuminate\Database\Eloquent\Builder;

class SalePolicyQuestionBuilder extends Builder
{
    public function __construct($query)
    {
        parent::__construct($query);
    }

    public function parent()
    {
        return $this->where('parent_id', null);
    }
}
