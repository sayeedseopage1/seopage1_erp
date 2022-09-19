<?php

namespace App\DataTables;

use Yajra\DataTables\Services\DataTable;

class BaseDataTable extends DataTable
{
    protected $global;
    public $user;
    public $domHtml;

    public function __construct()
    {
        $this->global = global_setting();
        $this->user = user();
        $this->domHtml = "<'row'<'col-sm-12'tr>><'d-flex'<'flex-grow-1'l><i><p>>";
    }

}
