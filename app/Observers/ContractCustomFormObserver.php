<?php

namespace App\Observers;
use App\Models\ContractCustomForm;
class ContractCustomFormObserver
{
  public function saving(ContractCustomForm $leadCustomForm)
  {
      if (user()) {
          $leadCustomForm->last_updated_by = user()->id;
      }
  }

  public function creating(ContractCustomForm $leadCustomForm)
  {
      if (user()) {
          $leadCustomForm->added_by = user()->id;
      }
  }
}
