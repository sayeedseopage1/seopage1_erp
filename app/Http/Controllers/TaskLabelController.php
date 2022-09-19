<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\Admin\TaskLabel\StoreRequest;
use App\Models\Project;
use App\Models\Task;
use App\Models\TaskLabelList;
use Illuminate\Http\Request;

class TaskLabelController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.taskLabel';
    }

    public function create()
    {
        $this->taskLabels = TaskLabelList::all();
        $this->projects = Project::all();
        $this->taskId = request()->task_id;
        return view('tasks.create_label', $this->data);
    }

    public function store(StoreRequest $request)
    {
        abort_403(user()->permission('task_labels') !== 'all');
        $taskLabel = new TaskLabelList();
        $this->storeLabel($request, $taskLabel);

        $allTaskLabels = TaskLabelList::all();

        if($request->task_id){
            $task = Task::with('label')->findOrFail($request->task_id);
            $currentTaskLable = $task->label;
        }
        else {
            $currentTaskLable = collect([]);
        }


        $labels = '';

        foreach ($allTaskLabels as $key => $value) {

            $selected = '';

            foreach ($currentTaskLable as $item){
                if ($item->label_id == $value->id){
                    $selected = 'selected';
                }
            }

            $labels .= '<option value="' . $value->id . '" data-content="<span class=\'badge badge-secondary\' style=\'background-color: ' . $value->label_color . '\'>' . $value->label_name . '</span>" '.$selected.'>' . $value->label_name . '</option>';
        }

        return Reply::successWithData(__('messages.taskLabel.addedSuccess'), ['data' => $labels]);
    }

    public function update(Request $request, $id)
    {
        abort_403(user()->permission('task_labels') !== 'all');

        $taskLabel = TaskLabelList::findOrFail($id);

        $this->storeUpdate($request, $taskLabel);

        $allTaskLabels = TaskLabelList::all();

        $labels = '';

        foreach ($allTaskLabels as $key => $value) {
            $labels .= '<option value="' . $value->id . '" data-content="<span class=\'badge badge-secondary\' style=\'background-color: ' . $value->label_color . '\'>' . $value->label_name . '</span>">' . $value->label_name . '</option>';
        }

        return Reply::successWithData(__('messages.taskLabel.addedSuccess'), ['data' => $labels]);
    }

    private function storeLabel($request, $taskLabel)
    {
        $taskLabel->label_name = trim($request->label_name);
        $taskLabel->description = str_replace('<p><br></p>', '', trim($request->description));

        $taskLabel->project_id = $request->project_id;

        if ($request->has('color')) {
            $taskLabel->color = $request->color;
        }

        $taskLabel->save();

        return $taskLabel;
    }

    private function storeUpdate($request, $taskLabel)
    {

        if($request->label_name != null && $request->description != null)
        {
            $taskLabel->label_name = trim($request->label_name);
            $taskLabel->description = str_replace('<p><br></p>', '', trim($request->description));
        }

        if($request->project_id != null)
        {
            $taskLabel->project_id = $request->project_id;
        }

        if ($request->has('color')) {
            $taskLabel->color = $request->color;
        }

        $taskLabel->save();

        return $taskLabel;
    }

    public function destroy($id)
    {
        abort_403(user()->permission('task_labels') !== 'all');

        TaskLabelList::destroy($id);

        $allTaskLabels = TaskLabelList::all();

        if(request()->taskId){
            $task = Task::with('label')->findOrFail(request()->taskId);
            $currentTaskLable = $task->label;

        } else {

            $currentTaskLable = collect([]);
        }

        $labels = '';

        foreach ($allTaskLabels as $key => $value) {

            $selected = '';

            foreach ($currentTaskLable as $item){
                if ($item->label_id == $value->id){
                    $selected = 'selected';
                }
            }

            $labels .= '<option value="' . $value->id . '" data-content="<span class=\'badge badge-secondary\' style=\'background-color: ' . $value->label_color . '\'>' . $value->label_name . '</span>" '.$selected.'>' . $value->label_name . '</option>';
        }

        return Reply::successWithData(__('messages.taskLabel.addedSuccess'), ['data' => $labels]);
    }

    public function labels($id)
    {
        $options = '';

        if ($id == 0) {
            $labels = TaskLabelList::Where('project_id', null)->get();

            foreach ($labels as $item) {
                $options .= '<option value="' . $item->id . '" data-content="<span class=\'badge badge-secondary\' style=\'background-color: ' . $item->label_color . '\'>' . $item->label_name . '</span>" >' . $item->label_name . '</option>';
            }
        }
        else{
            $labels = TaskLabelList::where('project_id', $id)->orWhere('project_id', null)->get();

            foreach ($labels as $item) {

                $options .= '<option value="' . $item->id . '" data-content="<span class=\'badge badge-secondary\' style=\'background-color: ' . $item->label_color . '\'>' . $item->label_name . '</span>" >' . $item->label_name . '</option>';
            }
        }

        return Reply::dataOnly(['status' => 'success', 'data' => $options]);
    }

}

