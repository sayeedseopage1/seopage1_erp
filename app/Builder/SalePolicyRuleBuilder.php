<?php

namespace App\Builder;


use Illuminate\Database\Eloquent\Builder;

class SalePolicyRuleBuilder extends Builder
{
    public function __construct($query)
    {
        parent::__construct($query);
    }
    
    public function enabled()
    {
        return $this->where('status', '1');
    }
}
