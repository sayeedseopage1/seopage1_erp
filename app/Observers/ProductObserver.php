<?php

namespace App\Observers;

use App\Models\Product;

class ProductObserver
{

    public function saving(Product $product)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $product->last_updated_by = user() ? user()->id : null;
        }
    }

    public function creating(Product $product)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $product->added_by = user() ? user()->id : null;
        }
    }

}
