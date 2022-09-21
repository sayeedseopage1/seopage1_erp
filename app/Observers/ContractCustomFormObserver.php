<?php

namespace App\Observers;
use App\Models\ContractCustomForm;
class ContractCustomFormObserver
{
  public function saving(ContractCustomForm $contractCustomForm)
  {
      if (user()) {
          $contractCustomForm->last_updated_by = user()->id;
      }
  }

  public function creating(ContractCustomForm $leadCustomForm)
  {
      if (user()) {
          $contractCustomForm->added_by = user()->id;
      }
  }
}
