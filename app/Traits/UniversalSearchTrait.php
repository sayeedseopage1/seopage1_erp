<?php

namespace App\Traits;

use App\Models\UniversalSearch;

trait UniversalSearchTrait
{

    /**
     * @param int $searchableId
     * @param string $title
     * @param string $route
     * @param string $type
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function logSearchEntry($searchableId, $title, $route, $type)
    {
        $search = new UniversalSearch();
        $search->searchable_id = $searchableId;
        $search->title = $title;
        $search->route_name = $route;
        $search->module_type = $type;
        $search->save();
    }

}
