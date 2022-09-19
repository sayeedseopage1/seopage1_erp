<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ExpensesCategoryRole
 *
 * @property int $id
 * @property int|null $expenses_category_id
 * @property int $role_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ExpensesCategory $category
 * @property-read \App\Models\Role $role
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategoryRole newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategoryRole newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategoryRole query()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategoryRole whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategoryRole whereExpensesCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategoryRole whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategoryRole whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategoryRole whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ExpensesCategoryRole extends BaseModel
{
    protected $table = 'expenses_category_roles';

    public function category(): BelongsTo
    {
        return $this->belongsTo(ExpensesCategory::class);
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

}
