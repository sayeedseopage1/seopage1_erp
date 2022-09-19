<?php

namespace App\Models;

use App\Models\ExpensesCategoryRole;
use Froiden\RestAPI\ApiModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ExpensesCategory
 *
 * @property int $id
 * @property string $category_name
 * @property bigint $category_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Expense[] $expense
 * @property-read int|null $expense_count
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory whereCategoryName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|ExpensesCategoryRole[] $roles
 * @property-read int|null $roles_count
 */
class ExpensesCategory extends ApiModel
{
    protected $table = 'expenses_category';
    protected $default = ['id','category_name'];

    public function expense()
    {
        return $this->hasMany(Expense::class);
    }

    public function expenses(): BelongsTo
    {
        return $this->belongsTo(Expense::class, 'id');
    }

    public function roles(): HasMany
    {
        return $this->hasMany(ExpensesCategoryRole::class, 'expenses_category_id');
    }

}
