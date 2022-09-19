<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\DashboardWidget
 *
 * @property int $id
 * @property string $widget_name
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $dashboard_type
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget query()
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget whereDashboardType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget whereWidgetName($value)
 * @mixin \Eloquent
 */
class DashboardWidget extends BaseModel
{
    protected $fillable = ['widget_name', 'status', 'dashboard_type'];
}
