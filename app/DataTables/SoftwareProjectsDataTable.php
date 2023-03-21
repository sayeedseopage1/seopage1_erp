<?php

namespace App\DataTables;

use Carbon\Carbon;
use App\Models\SoftwareProject;
use App\Models\Project;
use App\Models\CustomField;
use App\Models\CustomFieldGroup;
use App\DataTables\BaseDataTable;
use App\Models\ProjectStatusSetting;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Illuminate\Support\Facades\DB;
use App\Models\Currency;
use App\Models\Deal;
use App\Models\User;
use Auth;
use App\Models\Task;
use App\Models\ContractSign;
use App\Models\ProjectMilestone;
use App\Models\ProjectTimeLog;
use Str;

class SoftwareProjectsDataTable extends BaseDataTable
{

  
    public function __construct()
    {
        parent::__construct();
        
    }

    /**
     * Build DataTable class.
     *
     * @param mixed $query Results from query() method.
     * @return \Yajra\DataTables\DataTableAbstract
     */
    public function dataTable($query)
    {
        //dd($query);
        $project = new SoftwareProject();
        //dd($project);
        //dd($row);


      
        $datatables = datatables()->eloquent($query);
        // /dd($datatables);

            $datatables->addColumn('check', function ($row) {
                return '<input type="checkbox" class="select-table-row" id="datatable-row-' . $row->id . '"  name="datatable_ids[]" value="' . $row->id . '" onclick="dataTableRowCheck(' . $row->id . ')">';
            });
            $datatables->addColumn('action', function ($row) {
               
                //dd($memberIds);

                $action = '<div class="task_view">

                <div class="dropdown">
                    <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                        id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="icon-options-vertical icons"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';

                $action .= '<a href="' . route('software_projects.show', [$row->id]) . '" class="dropdown-item"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';
               

                
                    $action .= '<a class="dropdown-item openRightModal" href="' . route('software_projects.edit', [$row->id]) . '">
                            <i class="fa fa-edit mr-2"></i>
                            ' . trans('app.edit') . '
                        </a>';
                


               
                    // $action .= '<a class="dropdown-item archive" href="javascript:;" data-user-id="' . $row->id . '">
                    //         <i class="fa fa-archive mr-2"></i>
                    //         ' . trans('app.archive') . '
                    //     </a>';
                    // $action .= '<a class="dropdown-item delete-table-row" href="javascript:;" data-user-id="' . $row->id . '">
                    //         <i class="fa fa-trash mr-2"></i>
                    //         ' . trans('app.delete') . '
                    //     </a>';
               

                $action .= '</div>
                </div>
            </div>';

                return $action;
            });
           
           
            $datatables->addColumn('project', function ($row) {
                return ucfirst($row->project_name);
            });
            $datatables->addColumn('project_short_code', function ($row) {
                return ucfirst($row->project_short_code);
            });
          
          


            $datatables->editColumn('project_name', function ($row) {
               

               

               
                  return '<div class="media align-items-center">
                          <div class="media-body">
                      <h5 class="mb-0 f-13 text-darkest-grey"><a>' . ucfirst($row->project_name) . '</a></h5>
                      <p class="mb-0">'  . '</p>
                      </div>
                  </div>';
               


            });
            $datatables->editColumn('start_date', function ($row) {
                return $row->start_date;
            });
            $datatables->editColumn('deadline', function ($row) {
               
                if (is_null($row->deadline)) {
                    return '--';
                }else 
                {
                    return '<span style="color:red;"><strong>' . $row->deadline . '</strong></span>';
               

                }
              
                   

               
                // elseif($row->deadline->isToday()+1 ){
                //     return '<span class="text-warning">' . __('Tommorow') . '</span>';
                // }
            //   /  return '<span >' . $row->deadline . '</span>';

               // return '--';
            });

            
            
            
           
           

           
          
           
           
           
          

            $datatables->addIndexColumn();
            $datatables->setRowId(function ($row) {
                return 'row-' . $row->id;
            });

           
            
            $datatables->rawColumns(['project_name','check', 'action','project_short_code','deadline']);
            $datatables->removeColumn('project_summary');
            $datatables->removeColumn('notes');
            $datatables->removeColumn('category_id');
         

            return $datatables;
    }

    /**
     * @param SoftwareProject $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(SoftwareProject $model)
    {
        $request = $this->request();
        //dd($request);
        $model = $model
            
          
            ->selectRaw('software_projects.id, software_projects.project_short_code, software_projects.added_by, software_projects.project_name, software_projects.start_date, software_projects.deadline, 
              
            
           ( select count("id") from pinned where pinned.project_id = software_projects.id and pinned.user_id = ' . user()->id . ') as pinned_project');

        

        

        if ($request->deadLineStartDate != '' && $request->deadLineEndDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->deadLineStartDate)->toDateString();
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->deadLineEndDate)->toDateString();
            $model->whereRaw('Date(projects.deadline) >= ?', [$startDate])->whereRaw('Date(projects.deadline) <= ?', [$endDate]);
        }

      
        if (!is_null($request->team_id) && $request->team_id != 'all') {
            $model->where('team_id', $request->team_id);
        }

        if (!is_null($request->category_id) && $request->category_id != 'all') {
            $model->where('category_id', $request->category_id);
        }

      

       

        if ($request->searchText != '') {
            $model->where(function ($query) {
                $query->where('software_projects.project_name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('users.name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('software_projects.project_short_code', 'like', '%' . request('searchText') . '%'); // project short code
            });
        }

        if ($request->startDate && $request->endDate) {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
            $model->whereBetween(DB::raw('DATE(software_projects.`created_at`)'), [$startDate, $endDate]);
        }

        $model->groupBy('software_projects.id');
        $model->orderBy('id', 'desc');
        return $model;
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
            ->setTableId('software-projects-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            // ->orderBy(1)
            ->destroy(true)
            ->responsive(true)
            ->serverSide(true)
            ->processing(true)
            ->dom($this->domHtml)

            ->language(__('app.datatable'))
            ->parameters([
                'initComplete' => 'function () {
                    window.LaravelDataTables["software-projects-table"].buttons().container()
                     .appendTo( "#table-actions")
                 }',
                'fnDrawCallback' => 'function( oSettings ) {
                    $("body").tooltip({
                        selector: \'[data-toggle="tooltip"]\'
                    })
                }',
                'scrollX' => true
            ])
            ->buttons(Button::make(['extend' => 'excel', 'text' => '<i class="fa fa-file-export"></i> ' . trans('app.exportExcel')]));
    }

    /**
     * Get columns.
     *
     * @return array
     */
    protected function getColumns()
    {
        $project = new SoftwareProject();
        

        $data = [
            'check' => [
                'title' => '<input type="checkbox" name="select_all_table" id="select-all-table" onclick="selectAllTable(this)">',
                'exportable' => false,
                'orderable' => false,
                'searchable' => false,
                'visible' => !in_array('client', user_roles())
            ],
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => true],
            // __('app.id') => ['data' => 'id', 'name' => 'id', 'title' => __('app.id')],
            __('modules.taskCode') => ['data' => 'project_short_code', 'name' => 'project_short_code', 'title' => __('modules.taskCode')],
            __('modules.projects.projectName') => ['data' => 'project_name', 'name' => 'project_name', 'exportable' => false, 'title' => __('modules.projects.projectName')],
            __('app.project') => ['data' => 'project', 'name' => 'project_name', 'visible' => false, 'title' => __('app.project')],
            
           
            __('modules.projects.startDate')  => ['data' => 'start_date', 'name' => 'start_date', 'visible' => true, 'title' => __('modules.projects.startDate')],
            __('app.deadline') => ['data' => 'deadline', 'name' => 'deadline', 'title' => __('app.deadline')],
           
            #delivarable 
           
           
            Column::computed('action', __('app.action'))
            ->exportable(false)
            ->printable(false)
            ->orderable(false)
            ->searchable(false)
            ->addClass('text-right pr-20')
        ];



      


        $datamerge = array_merge($data);
        return $datamerge;

    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'SoftwareProjects_' . date('YmdHis');
    }

    public function pdf()
    {
        set_time_limit(0);

        if ('snappy' == config('datatables-buttons.pdf_generator', 'snappy')) {
            return $this->snappyPdf();
        }

        $pdf = app('dompdf.wrapper');
        $pdf->loadView('datatables::print', ['data' => $this->getDataForPrint()]);

        return $pdf->download($this->getFilename() . '.pdf');
    }

}
