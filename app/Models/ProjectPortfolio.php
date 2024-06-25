<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class ProjectPortfolio extends Model
{
    use HasFactory;
    protected $appends = ['plugins'];

    public function theme()
    {
       return $this->hasOne(ProjectWebsiteTheme::class, 'id', 'theme_id');
    }

    public function getPluginsAttribute()
    {
        if(!$this->plugin_list) return null;
        $pluginIds = json_decode($this->plugin_list, true);
        return ProjectWebsitePlugin::whereIn('id', $pluginIds)->get(['id', 'plugin_name', 'plugin_url']) ?? null;
    }
}
