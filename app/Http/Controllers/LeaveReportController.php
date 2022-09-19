<?php

namespace App\Http\Controllers;

use App\DataTables\LeaveReportDataTable;
use App\Helper\Reply;
use App\Models\LeaveType;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LeaveReportController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.leaveReport';
    }

    public function index(LeaveReportDataTable $dataTable)
    {
        if (!request()->ajax()) {
            $this->employees = User::allEmployees();
            $this->fromDate = now($this->global->timezone)->startOfMonth();
            $this->toDate = now($this->global->timezone)->endOfMonth();
        }

        return $dataTable->render('reports.leave.index', $this->data);
    }

    public function show(Request $request, $id)
    {
        $this->userId = $id;
        $view = $request->view;

        $this->leave_types = LeaveType::with(['leaves' => function ($query) use ($request, $id, $view) {
            if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
                $this->startDate = $request->startDate;
                $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
                $query->where(DB::raw('DATE(leaves.`leave_date`)'), '>=', $startDate);
            }

            if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
                $this->endDate = $request->endDate;
                $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
                $query->where(DB::raw('DATE(leaves.`leave_date`)'), '<=', $endDate);
            }
            
            switch ($view) {
            case 'approved':
                $query->where('status', 'approved')->where('user_id', $id);
                    break;
            case 'pending':
                $query->where('status', 'pending')->where('user_id', $id);
                    break;
            case 'upcoming':
                $query->where('leave_date', '>', now($this->global->timezone)->format('Y-m-d'));
                $query->where('status', '<>', 'rejected')->where('user_id', $id);
                    break;
            default:
                $query->where('status', 'approved')->where('user_id', $id);
                    break;
            }
        }, 'leaves.type'])->get();

        if (request()->ajax() && $view != '') {
            $html = view('reports.leave.ajax.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        return view('reports.leave.show', $this->data);
    }

}
