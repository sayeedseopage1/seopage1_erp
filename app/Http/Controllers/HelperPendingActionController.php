<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Deal;
use App\Models\EmployeeEvaluation;
use App\Models\EmployeeEvaluationTask;
use App\Models\PendingAction;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Auth;
use App\Models\ProjectDeliverable;
use App\Models\Role;
use App\Models\TaskRevision;
use App\Models\TaskRevisionDispute;
use App\Models\Task;
use App\Models\Taskuser;
use App\Models\ProjectMember;
use DB;

class HelperPendingActionController extends AccountBaseController
{
    public function ProjectChallengeAuthorization($project)
    {
        //
        $client= User::where('id',$project->client_id)->first();
        $project_manager= User::where('id',$project->pm_id)->first();
        $authorizers= User::where('role_id',1)->orWhere('role_id',8)->get();
           foreach ($authorizers as $key => $authorizer) {
            $action = new PendingAction();
            $action->code = 'CHA';
            $action->serial = 'CHA'.'x'.$key;
            $action->item_name= 'Challenge authorization';
            $action->heading= 'Project Challenge Authorization';
            $action->message = 'Project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> has challenge (Project manager: <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>)';
            $action->timeframe= 6;
            $action->project_id = $project->id;

            $action->client_id = $client->id;
            $action->authorization_for= $authorizer->id;
            $button= '';

            $action->save();
            $button = [
                [
                    'button_name' => 'Review',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('projects.show', $project->id),
                ],
                [
                    'button_name' => 'Authorize',
                    'button_color' => 'success',
                    'button_type' => 'modal',
                    'button_url' => route('project-challenge', $project->id),
                    'modal_form'=> true,
                    'form'=> [
                        [
                            'type'=> 'textarea',
                            'label'=>'Write a comment',
                            'name'=>'admin_comment',
                            'required'=> true,
                        ],
                        [
                            'type'=> 'hidden',
                             'value'=> $project->id,
                             'readonly'=> true,

                            'name'=>'project_id',
                            'required'=> true,
                        ],
                         [
                            'type'=> 'hidden',
                            'value'=> $action->id,
                            'readonly'=> true,

                            'name'=>'authorization_id',

                            'required'=> true,

                        ],

                    ],
                    'form_action'=> [
                        [
                            'type'=> 'button',
                            'method'=>'POST',
                            'label'=> 'Accept Challenge',
                            'color'=> 'success',
                            'url'=> route('project-accept'),

                        ],
                        [
                            'type'=> 'button',
                            'method'=>'POST',
                            'label'=> 'Deny Challenge',
                            'color'=> 'danger',
                            'url'=> route('project-deny'),

                        ],

                    ]
                ],
            ];
            $action->button = json_encode($button);
            $action->save();


          //  dd($action);
       //    dd(json_decode($action->button));

           }

    }
    public function OthersDeliverableAuthorization($project,$id)
    {
        $client= User::where('id',$project->client_id)->first();
        $project_manager= User::where('id',$project->pm_id)->first();
        $authorizers= User::where('role_id',1)->get();
           foreach ($authorizers as $key => $authorizer) {
            $action = new PendingAction();
            $action->code = 'DOA';
            $action->serial = 'DOA'.'x'.$key;
            $action->item_name= 'Deliverables “Other” authorization';
            $action->heading= 'Deliverables “Other” authorization';
            $action->message = '"Other" type of <a href="'.route('projects.show', $project->id.'?tab=deliverables').'">deliverables</a> for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> requires authorization (Project manager: <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>)';
            $action->timeframe= 12;
            $action->project_id = $project->id;
            $action->client_id = $client->id;
            $action->deliverable_id = $id;
            $action->authorization_for= $authorizer->id;
            $button = [
                [
                    'button_name' => 'Review',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('projects.show', $project->id.'?tab=deliverables'),
                ],

            ];
            $action->button = json_encode($button);
            $action->save();
          //  dd($action);
       //    dd(json_decode($action->button));

           }

    }
    public function DeliverableDeadlineAuthorization($project)
    {
        $client= User::where('id',$project->client_id)->first();
        $project_manager= User::where('id',$project->pm_id)->first();
        $authorizers= User::where('role_id',1)->get();
           foreach ($authorizers as $key => $authorizer) {
            $action = new PendingAction();
            $action->code = 'DDA';
            $action->serial = 'DDA'.'x'.$key;
            $action->item_name= 'Deliverables deadline extend authorization';
            $action->heading= 'Deliverables deadline extention requested';
            $action->message = 'Project manager <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a> requested to extend deadline for <a href="'.route('projects.show', $project->id.'?tab=deliverables').'">deliverables</a> creation for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>';
            $action->timeframe= 12;
            $action->project_id = $project->id;
            $action->client_id = $client->id;
           // $action->deliverable_id = $id;
            $action->authorization_for= $authorizer->id;
            $button = [
                [
                    'button_name' => 'Review',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('projects.show', $project->id.'?tab=deliverables'),
                ],

            ];
            $action->button = json_encode($button);
            $action->save();
          //  dd($action);
       //    dd(json_decode($action->button));

           }

    }
    public function DeliverableGeneralAuthorization($project)
    {
        $client= User::where('id',$project->client_id)->first();
        $project_manager= User::where('id',$project->pm_id)->first();
        $authorizers= User::where('role_id',1)->get();
           foreach ($authorizers as $key => $authorizer) {
            $action = new PendingAction();
            $action->code = 'DGA';
            $action->serial = 'DGA'.'x'.$key;
            $action->item_name= 'Deliverables general authorization';
            $action->heading= 'Deliverables authorization';
            $action->message = '<a href="'.route('projects.show', $project->id.'?tab=deliverables').'">Deliverables</a> for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> requires authorization (Project manager: <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>)';
            $action->timeframe= 48;
            $action->project_id = $project->id;
            $action->client_id = $client->id;
           // $action->deliverable_id = $id;
            $action->authorization_for= $authorizer->id;
            $button = [
                [
                    'button_name' => 'Review',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('projects.show', $project->id.'?tab=deliverables'),
                ],

            ];
            $action->button = json_encode($button);
            $action->save();
          //  dd($action);
       //    dd(json_decode($action->button));

           }

    }
    public function QcSubmissionAuthorization($project)
    {
        $client= User::where('id',$project->client_id)->first();
        $project_manager= User::where('id',$project->pm_id)->first();
        $authorizers= User::where('role_id',1)->get();
           foreach ($authorizers as $key => $authorizer) {
            $action = new PendingAction();
            $action->code = 'QCA';
            $action->serial = 'QCA'.'x'.$key;
            $action->item_name= 'QC form submission authorization';
            $action->heading= 'QC form authorization Needed';
            $action->message = '<a href="'.route('projects.show', $project->id).'">QC form</a> for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> requires authorization (Project manager: <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>)';
            $action->timeframe= 24;
            $action->project_id = $project->id;
            $action->client_id = $client->id;
           // $action->deliverable_id = $id;
            $action->authorization_for= $authorizer->id;
            $button = [
                [
                    'button_name' => 'Review',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('projects.show', $project->id),
                ],

            ];
            $action->button = json_encode($button);
            $action->save();
          //  dd($action);
       //    dd(json_decode($action->button));

           }

    }
    public function ProjectCompletionAuthorization($project)
    {
        $client= User::where('id',$project->client_id)->first();
        $project_manager= User::where('id',$project->pm_id)->first();
        $authorizers= User::where('role_id',1)->get();
           foreach ($authorizers as $key => $authorizer) {
            $action = new PendingAction();
            $action->code = 'PCA';
            $action->serial = 'PCA'.'x'.$key;
            $action->item_name= 'Project completion authorization';
            $action->heading= 'Project completion authorization Needed';
            $action->message = '<a href="'.route('projects.show', $project->id).'">Project completion form</a> for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> requires authorization (Project manager: <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>)';
            $action->timeframe= 24;
            $action->project_id = $project->id;
            $action->client_id = $client->id;
           // $action->deliverable_id = $id;
            $action->authorization_for= $authorizer->id;
            $button = [
                [
                    'button_name' => 'Review',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('projects.show', $project->id),
                ],

            ];
            $action->button = json_encode($button);
            $action->save();
          //  dd($action);
       //    dd(json_decode($action->button));

           }

    }
    public function MilestoneCancelAuthorization($project,$milestone)
    {
        $client= User::where('id',$project->client_id)->first();
        $project_manager= User::where('id',$project->pm_id)->first();
        $authorizers= User::where('role_id',1)->get();
           foreach ($authorizers as $key => $authorizer) {
            $action = new PendingAction();
            $action->code = 'MCA';
            $action->serial = 'MCA'.'x'.$key;
            $action->item_name= 'Milestone cancel authorization!';
            $action->heading= 'Milestone cancel authorization needed!';
            $action->message = '<a href="'.route('projects.show', $project->id.'?tab=milestones').'">Milestone</a> cancel authorization for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> (Project manager: <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>)';
            $action->timeframe= 24;
            $action->project_id = $project->id;
            $action->client_id = $client->id;
            $action->milestone_id = $milestone->id;
            $action->authorization_for= $authorizer->id;
            $button = [
                [
                    'button_name' => 'Review',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('projects.show', $project->id.'?tab=milestones'),
                ],

            ];
            $action->button = json_encode($button);
            $action->save();
          //  dd($action);
       //    dd(json_decode($action->button));

           }

    }
    public function  ProjectAcceptTimeExtensionAuthorization($project)
    {
        $deal= Deal::where('id',$project->id)->first();
        $client= User::where('id',$project->client_id)->first();
        $project_manager= User::where('id',$project->pm_id)->first();
        $authorizers= User::where('role_id',1)->get();
           foreach ($authorizers as $key => $authorizer) {
            $action = new PendingAction();
            $action->code = 'WDADA';
            $action->serial = 'WDADA'.'x'.$key;
            $action->item_name= 'Won deals acceptance delay authorization';
            $action->heading= 'Project acceptance deadline authorization needed';
            $action->message = 'PM <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a> requested more time to accept deal <a href="'.route('contracts.show', $project->deal_id).'">'.$project->project_name.'</a>  from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>(Deal awarded on: '.$deal->award_time.')';
            $action->timeframe= 12;
            $action->project_id = $project->id;
            $action->client_id = $client->id;
          //  $action->milestone_id = $milestone->id;
            $action->authorization_for= $authorizer->id;
            $button = [
                [
                    'button_name' => 'Review',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('award_time_check.index'),
                ],

            ];
            $action->button = json_encode($button);
            $action->save();
          //  dd($action);
       //    dd(json_decode($action->button));

           }

    }
    public function TaskGuidelineAuthorization($project)
    {
        $deal= Deal::where('id',$project->id)->first();
        $client= User::where('id',$project->client_id)->first();
        $project_manager= User::where('id',$project->pm_id)->first();
        $authorizers= User::where('role_id',1)->get();
           foreach ($authorizers as $key => $authorizer) {
            $action = new PendingAction();
            $action->code = 'TGA';
            $action->serial = 'TGAA'.'x'.$key;
            $action->item_name= 'Pm task guideline authorization!';
            $action->heading= 'Task guideline authorization needed!';
            $action->message = 'Task guideline authorization requested from PM <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a> for Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>';
            $action->timeframe= 24;
            $action->project_id = $project->id;
            $action->client_id = $client->id;
          //  $action->milestone_id = $milestone->id;
            $action->authorization_for= $authorizer->id;
            $button = [
                [
                    'button_name' => 'Review',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('projects.show',$project->id),
                ],

            ];
            $action->button = json_encode($button);
            $action->save();
          //  dd($action);
       //    dd(json_decode($action->button));

           }

    }
    public function PrimaryPageAuthorization($task)
    {
        if($task->independent_task_status == 0)
        {
            $project= Project::where('id',$task->project_id)->first();
            $deal= Deal::where('id',$project->id)->first();
            $client= User::where('id',$project->client_id)->first();
            $project_manager= User::where('id',$project->pm_id)->first();
            $lead_developer= User::where('role_id',6)->orderBy('id','desc')->first();
            $authorizers= User::where('role_id',8)->get();
               foreach ($authorizers as $key => $authorizer) {
                $action = new PendingAction();
                $action->code = 'PPA';
                $action->serial = 'PPA'.'x'.$key;
                $action->item_name= 'Primary page task authorization!';
                $action->heading= 'Primary page authorization needed!';
                $action->message = 'Primary page authorization needed from lead developer <a href="'.route('employees.show',$lead_developer->id).'">'.$lead_developer->name.'</a> for Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>';
                $action->timeframe= 24;
                $action->project_id = $project->id;
                $action->client_id = $client->id;
                $action->task_id = $task->id;
                $action->authorization_for= $authorizer->id;
                $button = [
                    [
                        'button_name' => 'Review',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('tasks.index'),
                    ],

                ];
                $action->button = json_encode($button);
                $action->save();
              //  dd($action);
           //    dd(json_decode($action->button));

               }


        }

    }
    public function DisputeFormAuthorization($project)
    {


            $client= User::where('id',$project->client_id)->first();
            $project_manager= User::where('id',$project->pm_id)->first();
            $lead_developer= User::where('role_id',6)->orderBy('id','desc')->first();
            $authorizers= User::where('role_id',1)->get();
               foreach ($authorizers as $key => $authorizer) {
                $action = new PendingAction();
                $action->code = 'DFA';
                $action->serial = 'DFA'.'x'.$key;
                $action->item_name= 'Dispute form authorization';
                $action->heading= 'Dispute form authorization';
                $action->message = 'Dispute form for <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> required authorization(Project manager: <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>)';
                $action->timeframe= 24;
                $action->project_id = $project->id;
                $action->client_id = $client->id;
                //$action->task_id = $task->id;
                $action->authorization_for= $authorizer->id;
                $button = [
                    [
                        'button_name' => 'Review',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('projects.show',$project->id),
                    ],

                ];
                $action->button = json_encode($button);
                $action->save();
              //  dd($action);
           //    dd(json_decode($action->button));

               }




    }
    public function TaskDisputeAuthorization($task,$disputes)
    {
            $project= Project::where('id',$task->project_id)->first();
            $raised_by= User::where('id',$disputes->raised_by)->first();
            $raised_against= User::where('id',$disputes->raised_against)->first();
            $client= User::where('id',$project->client_id)->first();
            $project_manager= User::where('id',$project->pm_id)->first();
            $lead_developer= User::where('role_id',6)->orderBy('id','desc')->first();
            $authorizers= User::where('role_id',8)->get();
               foreach ($authorizers as $key => $authorizer) {
                $action = new PendingAction();
                $action->code = 'TDA';
                $action->serial = 'TDA'.'x'.$key;
                $action->item_name= 'Dispute Expiry Warning!';
                $action->heading= 'Dispute Expiry Warning!';
                $action->message = 'Dispute for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> between <a href="'.route('employees.show',$raised_by->id).'">'.$raised_by->name.'</a> & <a href="'.route('employees.show',$raised_against->id).'">'.$raised_against->name.'</a> will be expired in the next 48 hours if it is not resolved then!';
                $action->timeframe= 120;
                $action->project_id = $project->id;
                $action->client_id = $client->id;
                $action->task_id = $task->id;
                $action->authorization_for= $authorizer->id;
                $button = [
                    [
                        'button_name' => 'Review',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('disputes.index'),
                    ],

                ];
                $action->button = json_encode($button);
                $action->save();
              //  dd($action);
           //    dd(json_decode($action->button));

               }




    }
    public function WonDealAcceptAuthorization($project,$id)
   {

    $client= User::where('id',$project->client_id)->first();
   // dd($client);
    $project_manager= User::where('id',$id)->first();
    $deal= Deal::where('id',$project->deal_id)->first();
    $pending_hours= Carbon::parse($deal->award_time)->addHours(20);
    $current_time = Carbon::now();
    $different_in_minutes = $current_time->diffInMinutes($pending_hours);
    $timeframe = $different_in_minutes/60;
    $sales= User::where('id',Auth::id())->first();
    // /dd($sales);


        $action = new PendingAction();
        $action->code = 'PWDA';
        $action->serial = 'PWDA'.'x0';
        $action->item_name= 'Won deals';
        $action->heading= 'Won deal awaiting your acceptance!';
        $action->message = 'Won deal <a href="'.route('contracts.show', $deal->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> is awaiting for your acceptance! (Sales person: <a href="'.route('employees.show',$sales->id).'">'.$sales->name.'</a>)';

        $action->timeframe= $timeframe;

        $action->project_id = $project->id;

        $action->client_id = $client->id;

        $action->authorization_for= $id;
    //   / dd($id);

        $button = [
            [
                'button_name' => 'Review',
                'button_color' => 'primary',
                'button_type' => 'redirect_url',
                'button_url' => route('contracts.show', $deal->id),
            ],

        ];
        $action->button = json_encode($button);
        $action->save();
      //  dd($action);
   //    dd(json_decode($action->button));



   }
   public function ProjectDeliverableCreation($id)
   {
    $project = Project::where('id',$id)->first();
    $client= User::where('id',$project->client_id)->first();
    // dd($client);
     $project_manager= User::where('id',$project->pm_id)->first();


     // /dd($sales);


         $action = new PendingAction();
         $action->code = 'DCA';
         $action->serial = 'DCA'.'x0';
         $action->item_name= 'Creating deliverables for clients';
         $action->heading= 'Create deliverables!';
         $action->message = 'You need to create deliverable for project <a href="'.route('projects.show', $project->id.'?tab=deliverables').'">'.$project->project_name.'</a> from the Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>';

         $action->timeframe= 48;

         $action->project_id = $project->id;

         $action->client_id = $client->id;

         $action->authorization_for= $project_manager->id;
     //   / dd($id);

         $button = [
             [
                 'button_name' => 'Create',
                 'button_color' => 'primary',
                 'button_type' => 'redirect_url',
                 'button_url' => route('projects.show', $project->id.'?tab=deliverables'),
             ],

         ];
         $action->button = json_encode($button);
         $action->save();
   }
   public function DeliverableModification($project,$id)
   {
    $project = Project::where('id',$project->id)->first();
    $client= User::where('id',$project->client_id)->first();
    // dd($client);
     $project_manager= User::where('id',$project->pm_id)->first();
     $deliverables= ProjectDeliverable::where('id',$id)->first();
     $user= User::where('id',Auth::id())->first();


         $action = new PendingAction();
         $action->code = 'DMA';
         $action->serial = 'DMA'.'x0';
         $action->item_name= 'Deliverables revision request';
         $action->heading= 'Revision requested in deliverables (From management)!';
         $action->message = 'Revision requested by <a href="'.route('employees.show',$user->id).'">'.$user->name.'</a> for the deliverables '.$deliverables->title.' for project <a href="'.route('projects.show', $project->id.'?tab=deliverables').'">'.$project->project_name.'</a> from the Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>';

         $action->timeframe= 24;

         $action->project_id = $project->id;

         $action->client_id = $client->id;
         $action->deliverable_id = $id;

         $action->authorization_for= $project_manager->id;
     //   / dd($id);

         $button = [
             [
                 'button_name' => 'Revise',
                 'button_color' => 'primary',
                 'button_type' => 'redirect_url',
                 'button_url' => route('projects.show', $project->id.'?tab=deliverables'),
             ],

         ];
         $action->button = json_encode($button);
         $action->save();
   }
   public function SendDeliverabletoClient($id)
   {
    $project = Project::where('id',$id)->first();
    $client= User::where('id',$project->client_id)->first();
    // dd($client);
     $project_manager= User::where('id',$project->pm_id)->first();
    // $deliverables= ProjectDeliverable::where('id',$id)->first();


         $action = new PendingAction();
         $action->code = 'SDCA';
         $action->serial = 'SDCA'.'x0';
         $action->item_name= 'Sending deliverables to the client';
         $action->heading= 'Share deliverables with the client!';
         $action->message = 'Share deliverables for project <a href="'.route('projects.show', $project->id.'?tab=deliverables').'">'.$project->project_name.'</a> from the Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>';

         $action->timeframe= 24;

         $action->project_id = $project->id;

         $action->client_id = $client->id;
        // $action->deliverable_id = $id;

         $action->authorization_for= $project_manager->id;
     //   / dd($id);

         $button = [
             [
                 'button_name' => 'Share',
                 'button_color' => 'primary',
                 'button_type' => 'redirect_url',
                 'button_url' => route('projects.show', $project->id.'?tab=deliverables'),
             ],

         ];
         $action->button = json_encode($button);
         $action->save();
   }
   public function ClientDisagreeAgreement($project)
   {
    $project = Project::where('id',$project->id)->first();
    $client= User::where('id',$project->client_id)->first();
    // dd($client);
     $project_manager= User::where('id',$project->pm_id)->first();
    // $deliverables= ProjectDeliverable::where('id',$id)->first();


         $action = new PendingAction();
         $action->code = 'CDDA';
         $action->serial = 'CDDA'.'x0';
         $action->item_name= 'Deliverables revision request';
         $action->heading= 'Revision requested in deliverables (From Client)!';
         $action->message = 'Revision requested by client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> for the deliverables for project <a href="'.route('projects.show', $project->id.'?tab=deliverables').'">'.$project->project_name.'</a>';

         $action->timeframe= 24;

         $action->project_id = $project->id;

         $action->client_id = $client->id;
        // $action->deliverable_id = $id;

         $action->authorization_for= $project_manager->id;
     //   / dd($id);

         $button = [
             [
                 'button_name' => 'Revise',
                 'button_color' => 'primary',
                 'button_type' => 'redirect_url',
                 'button_url' => route('projects.show', $project->id.'?tab=deliverables'),
             ],

         ];
         $action->button = json_encode($button);
         $action->save();

   }
   public function CreateTask($id)
   {
    $project= Project::where('id',$id)->first();
   // dd($project);
    $client= User::where('id',$project->client_id)->first();
        $project_manager= User::where('id',$project->pm_id)->first();
        $authorizer= User::where('id',$project_manager->id)->first();

            $action = new PendingAction();
            $action->code = 'CT';
            $action->serial = 'CT'.'x0';
            $action->item_name= 'Creating tasks';
            $action->heading= 'Create tasks!';
            $action->message = 'Create tasks for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name;
            $action->timeframe= 24;
            $action->project_id = $project->id;

            $action->client_id = $client->id;
            $action->authorization_for= $authorizer->id;
            $button= '';

            $action->save();
         //   dd($action);
            $button = [
                [
                    'button_name' => 'Create',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('projects.show', $project->id.'?tab=tasks'),
                ],
                // [
                //     'button_name' => 'Request more time',
                //     'button_color' => 'success',
                //     'button_type' => 'modal',
                //     'button_url' => '',
                //     'modal_form'=> true,
                //     'form'=> [
                //         [
                //             'type'=> 'select',
                //             'label'=>'Select how many hours need you to create tasks',
                //             'name'=>'hours',
                //             'options'=> [
                //                 [
                //                     'type'=> 'option',
                //                     'value'=> '6',
                //                     'lable'=> '6',
                //                     'selected'=> true,
                //                 ],
                //                 [
                //                     'type'=> 'option',
                //                     'value'=> '12',
                //                     'lable'=> '12',
                //                     'selected'=> false,
                //                 ],
                //                 [
                //                     'type'=> 'option',
                //                     'value'=> '18',
                //                     'lable'=> '18',
                //                     'selected'=> false,
                //                 ],
                //                 [
                //                     'type'=> 'option',
                //                     'value'=> '24',
                //                     'lable'=> '24',
                //                     'selected'=> false,
                //                 ],
                //                 [
                //                     'type'=> 'option',
                //                     'value'=> '30',
                //                     'lable'=> '30',
                //                     'selected'=> false,
                //                 ],


                //             ],
                //             'required'=> true,
                //         ],
                //         [
                //             'type'=> 'hidden',
                //              'value'=> $project->id,
                //              'readonly'=> true,

                //             'name'=>'project_id',
                //             'required'=> true,
                //         ],
                //          [
                //             'type'=> 'hidden',
                //             'value'=> $action->id,
                //             'readonly'=> true,

                //             'name'=>'authorization_id',

                //             'required'=> true,

                //         ],
                //         [
                //             'type'=> 'textarea',
                //             'label'=> 'Write reson',

                //             'readonly'=> false,

                //             'name'=>'reason',

                //             'required'=> true,

                //         ],

                //     ],
                //     'form_action'=> [
                //         [
                //             'type'=> 'button',
                //             'method'=>'POST',
                //             'label'=> 'Submit',
                //             'color'=> 'success',
                //             'url'=> '',

                //         ],


                //     ]
                // ],
                // [
                //     'button_name' => 'All the tasks were already created',
                //     'button_color' => 'success',
                //     'button_type' => 'modal',
                //     'button_url' => '',
                //     'modal_form'=> true,
                //     'form'=> [

                //         [
                //             'type'=> 'hidden',
                //              'value'=> $project->id,
                //              'readonly'=> true,

                //             'name'=>'project_id',
                //             'required'=> true,
                //         ],
                //          [
                //             'type'=> 'hidden',
                //             'value'=> $action->id,
                //             'readonly'=> true,

                //             'name'=>'authorization_id',

                //             'required'=> true,

                //         ],
                //         [
                //             'type'=> 'textarea',
                //             'label' => 'The number of tasks created are too few when compared to the number of deliverables. Why is that?',

                //             'readonly'=> false,

                //             'name'=>'comment',

                //             'required'=> true,

                //         ],

                //     ],
                //     'form_action'=> [
                //         [
                //             'type'=> 'button',
                //             'method'=>'POST',
                //             'label'=> 'Submit',
                //             'color'=> 'success',
                //             'url'=> '',

                //         ],


                //     ]
                //     ],
            ];
            $action->button = json_encode($button);
            $action->save();


          //  dd($action);
       //    dd(json_decode($action->button));



   }
   public function TaskApproveAction($task,$sender)
   {
    $sender = User::where('id',$sender->id)->first();
    $user_role= Role::where('id',$sender->role_id)->first();
    $project= Project::where('id',$task->project_id)->first();
    $client= User::where('id',$project->client_id)->first();
    $task_revision = TaskRevision::where('task_id',$task->id)->orderBy('id','desc')->first();
    // $project_manager= User::where('id',$project->pm_id)->first();
    $authorizers= User::where('id',$task->added_by)->get();
       foreach ($authorizers as $key => $authorizer) {
        $action = new PendingAction();
        $action->code = 'TSA';
        $action->serial = 'TSA'.'x'.$key;
        if($task_revision != null)
        {
            $action->item_name= 'Revision submitted by '.$user_role->name;
            $action->heading= 'Revision submitted by '.$user_role->name;
            $action->message = 'Review the revision submitted by '.$user_role->name.': <a href="'.route('employees.show',$sender->id).'">'.$sender->name.'</a> for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>';
            

        }else
        {
            $action->item_name= 'Task submitted by '.$user_role->name;
            $action->heading= 'Task submitted by '.$user_role->name;
            $action->message = 'Review the task submitted by '.$user_role->name.': <a href="'.route('employees.show',$sender->id).'">'.$sender->name.'</a> for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>';

        }

        $action->timeframe= 6;
        $action->project_id = $project->id;
        $action->client_id = $client->id;
        $action->task_id = $task->id;
        $action->authorization_for= $authorizer->id;
        $button = [
            [
                'button_name' => 'Review',
                'button_color' => 'primary',
                'button_type' => 'redirect_url',
                'button_url' => route('tasks.show', $task->id),
            ],

        ];
        $action->button = json_encode($button);
        $action->save();
      //  dd($action);
   //    dd(json_decode($action->button));

       }

   }

   public function ProjectQcSubmission($project,$milestone)
   {


    $project= Project::where('id',$project->id)->first();
    $client= User::where('id',$project->client_id)->first();

    $project_manager= User::where('id',$project->pm_id)->first();
    $authorizer= User::where('id',$project_manager->id)->first();

        $action = new PendingAction();
        $action->code = 'QCSA';
        $action->serial = 'QCSA'.'x0';

        $action->item_name= 'QC form';
        $action->heading= 'Submit QC form!';
        $action->message = 'Submit QC form for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>';

        $action->timeframe= 24;
        $action->project_id = $project->id;
        $action->client_id = $client->id;
        $action->milestone_id = $milestone->id;
        $action->authorization_for= $authorizer->id;
        $button = [
            [
                'button_name' => 'Submit',
                'button_color' => 'primary',
                'button_type' => 'redirect_url',
                'button_url' => route('projects.show', $project->id.'?tab=milestones'),
            ],

        ];
        $action->button = json_encode($button);
        $action->save();



   }
   public function ProjectCompletionSubmission($project,$milestone)
   {


    $project= Project::where('id',$project->id)->first();
    $client= User::where('id',$project->client_id)->first();

    $project_manager= User::where('id',$project->pm_id)->first();
    $authorizer= User::where('id',$project_manager->id)->first();

        $action = new PendingAction();
        $action->code = 'PCSA';
        $action->serial = 'PCSA'.'x0';
        $action->item_name= 'Project completion form ';
        $action->heading= 'Project completion form!';
        $action->message = 'Submit project completion form for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>';
        $action->timeframe= 24;
        $action->project_id = $project->id;
        $action->client_id = $client->id;
        $action->milestone_id = $milestone->id;
        $action->authorization_for= $authorizer->id;
        $button = [
            [
                'button_name' => 'Submit',
                'button_color' => 'primary',
                'button_type' => 'redirect_url',
                'button_url' => route('projects.show', $project->id.'?tab=milestones'),
            ],

        ];
        $action->button = json_encode($button);
        $action->save();
      //  dd($action);
   //    dd(json_decode($action->button));



   }
   public function DisputeSubmitAction($project)
   {


    $project= Project::where('id',$project->id)->first();
    $client= User::where('id',$project->client_id)->first();

    $project_manager= User::where('id',$project->pm_id)->first();
    $authorizer= User::where('id',$project_manager->id)->first();

        $action = new PendingAction();
        $action->code = 'DSA';
        $action->serial = 'DSA'.'x0';

        $action->item_name= 'Project dispute form ';
        $action->heading= 'Project dispute form!';
        $action->message = 'Submit project dispute form for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>';

        $action->timeframe= 24;
        $action->project_id = $project->id;
        $action->client_id = $client->id;
       // $action->milestone_id = $milestone->id;
        $action->authorization_for= $authorizer->id;
        $button = [
            [
                'button_name' => 'Submit',
                'button_color' => 'primary',
                'button_type' => 'redirect_url',
                'button_url' => route('projects.show', $project->id),
            ],

        ];
        $action->button = json_encode($button);
        $action->save();
      //  dd($action);
   //    dd(json_decode($action->button));



   }
   public function TaskDisputeQuestion($dispute_id,$user_id)
   {
        $task_dispute= TaskRevisionDispute::where('id',$dispute_id)->first();
        $task_revision= TaskRevision::where('id',$task_dispute->revision_id)->first();
        $task= Task::where('id',$task_revision->task_id)->first();
        $project= Project::where('id',$task->project_id)->first();
        $client= User::where('id',$project->client_id)->first();

        $project_manager= User::where('id',$project->pm_id)->first();
        $authorizer= User::where('id',$project_manager->id)->first();
        $action = new PendingAction();
        $action->code = 'TDQ';
        $action->serial = 'TDQ'.'x0';

        $action->item_name= 'Question asked about your dispute!';
        $action->heading= 'Question asked about your dispute!';
        $action->message = 'You have been asked 1 question about your dispute!';

        $action->timeframe= 48;
        $action->project_id = $project->id;
        $action->client_id = $client->id;
        $action->dispute_id = $dispute_id;
        $action->authorization_for= $user_id;
        $action->task_id= $task->id;
        $action->revision_id= $task_revision->id;
        $button = [
            [
                'button_name' => 'Check and Answer',
                'button_color' => 'primary',
                'button_type' => 'redirect_url',
                'button_url' => route('disputes.index'),
            ],

        ];
        $action->button = json_encode($button);
        $action->save();

   }
   public function NewCommentAdded($taskId,$commentor)
   {
    //dd($taskId,$commentor);
    $task= Task::where('id',$taskId)->first();
    if($task->independent_task_status == 0)
    {
        $project= Project::where('id',$task->project_id)->first();
        $client= User::where('id',$project->client_id)->first();
        $commentor= User::where('id',$commentor)->first();
        $task_user= Taskuser::where('task_id',$task->id)->first();
        $top_managements = User::where('role_id',1)->orWhere('role_id',8)->where('id', '!=', Auth::id())->pluck('id')->toArray();
        $pm = User::where('id',$project->pm_id)->where('id', '!=', Auth::id())->pluck('id')->toArray();
        $assigned_by = User::where('id',$task->added_by)->where('id', '!=', Auth::id())->pluck('id')->toArray();
        $assigned_to = User::where('id',$task_user->user_id)->where('id', '!=', Auth::id())->pluck('id')->toArray();
        $allUsers = '';
        if($task->subtask_id ==null){
            $allUsers = array_unique(array_merge($top_managements, $pm, $assigned_by, $assigned_to));
        }else{
            $allUsers = array_unique(array_merge($top_managements, $assigned_by, $assigned_to));
        }

        $pending_action = PendingAction::where('task_id',$task->id)->where('code','TCOA')->count();
// dd($pending_action);
        if(! $pending_action){
        foreach ($allUsers as $key => $authorizer) {
            $action = new PendingAction();
            $action->code = 'TCOA';
            $action->serial = 'TCOA'.'x'.$key;
            $action->item_name= 'New comment';
            $action->heading= 'A new comment has been added!';      
            $action->message = 'A new comment has been added by <a href="'.route('employees.show',$commentor->id).'">'.$commentor->name.'</a> in task <a href="'.route('tasks.show',$task->id).'">'.$task->heading.'</a> for Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>';
            $action->timeframe= 12;
            $action->project_id = $project->id;
            $action->client_id = $client->id;
            $action->task_id = $task->id;
            $action->authorization_for= $authorizer;
            $button = [
                [
                    'button_name' => 'View and Reply',
                    'button_color' => 'primary',
                    'button_type' => 'modal',
                    'button_url' => '',
                    'modal_form'=> false,
                ],
                [
                    'button_name' => 'Not relevant to me',
                    'button_color' => 'primary',
                    'button_type' => 'modal',
                    'button_url' => '',
                    'modal_form'=> true,
                    'form'=> [
                        [
                            'type'=> 'textarea',
                            'label'=>'Are you sure this comment is not relevant to you?',
                            'name'=>'confirmation',
                            'required'=> true,
                        ],
                        [
                            'type'=> 'hidden',
                            'value'=> $task->id,
                            'readonly'=> true,

                            'name'=>'project_id',
                            'required'=> true,
                        ],
                        [
                            'type'=> 'hidden',
                            'value'=> $action->id,
                            'readonly'=> true,

                            'name'=>'authorization_id',

                            'required'=> true,

                        ],

                    ],
                    'form_action'=> [
                        [
                            'type'=> 'button',
                            'method'=>'POST',
                            'label'=> 'Confirm',
                            'color'=> 'success',
                            'url'=> '',

                        ],


                    ]
                ],

            ];
            $action->button = json_encode($button);
            $action->save();
            }
        }else{
            foreach ($allUsers as $key => $authorizer) {
                $active_action = PendingAction::where('task_id',$task->id)->where('code','TCOA')->where('authorization_for', $authorizer)->where('past_status',0)->first();
                if($active_action){ 
                    $active_action->created_at = Carbon::now();
                    $active_action->updated_at = Carbon::now();
                    $active_action->save();
                }else{
                    $action = new PendingAction();
                    $action->code = 'TCOA';
                    $action->serial = 'TCOA'.'x'.$key;
                    $action->item_name= 'New comment';
                    $action->heading= 'A new comment has been added!';      
                    $action->message = 'A new comment has been added by <a href="'.route('employees.show',$commentor->id).'">'.$commentor->name.'</a> in task <a href="'.route('tasks.show',$task->id).'">'.$task->heading.'</a> for Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>';
                    $action->timeframe= 12;
                    $action->project_id = $project->id;
                    $action->client_id = $client->id;
                    $action->task_id = $task->id;
                    $action->authorization_for= $authorizer;
                    $button = [
                        [
                            'button_name' => 'View and Reply',
                            'button_color' => 'primary',
                            'button_type' => 'modal',
                            'button_url' => '',
                            'modal_form'=> false,
                        ],
                        [
                            'button_name' => 'Not relevant to me',
                            'button_color' => 'primary',
                            'button_type' => 'modal',
                            'button_url' => '',
                            'modal_form'=> true,
                            'form'=> [
                                [
                                    'type'=> 'textarea',
                                    'label'=>'Are you sure this comment is not relevant to you?',
                                    'name'=>'confirmation',
                                    'required'=> true,
                                ],
                                [
                                    'type'=> 'hidden',
                                    'value'=> $task->id,
                                    'readonly'=> true,
        
                                    'name'=>'project_id',
                                    'required'=> true,
                                ],
                                [
                                    'type'=> 'hidden',
                                    'value'=> $action->id,
                                    'readonly'=> true,
        
                                    'name'=>'authorization_id',
        
                                    'required'=> true,
        
                                ],
        
                            ],
                            'form_action'=> [
                                [
                                    'type'=> 'button',
                                    'method'=>'POST',
                                    'label'=> 'Confirm',
                                    'color'=> 'success',
                                    'url'=> '',
        
                                ],
        
        
                            ]
                        ],
        
                    ];
                    $action->button = json_encode($button);
                    $action->save();
                }
            }
        }
    }

   }
   public function NewTaskAssign($task)
   {
    $task= Task::where('id',$task->id)->first();
    if($task->independent_task_status == 0)
   {
    $project= Project::where('id',$task->project_id)->first();
    $client= User::where('id',$project->client_id)->first();
    $project_manager= User::where('id',$project->pm_id)->first();

    $task_user= TaskUser::where('task_id',$task->id)->first();
    $added_by= User::where('id',$task->added_by)->first();
    $authorizer= User::where('id',$task_user->user_id)->first();
    $user_role= Role::where('id',$added_by->role_id)->first();
    $action = new PendingAction();
    $action->code = 'NTA';
    $action->serial = 'NTA'.'x0';

    $action->item_name= 'Taking actions on new task';
    if(Auth::user()->role_id == 4)
    {
        $action->heading= 'New task has been assigned!';

        $action->message = 'New task has been assigned from '.$user_role->name.' <a href="'.route('employees.show',$added_by->id).'">'.$added_by->name.'</a> for client <a href="'.route('employees.show',$client->id).'">'.$client->name.'</a>!';

    }else
    {
        $action->heading= 'A new task has been assigned!!';

        $action->message = 'A new task named <a href="'.route('tasks.show',$task->id).'">'.$task->heading.'</a> has been assigned for client <a href="'.route('employees.show',$client->id).'">'.$client->name.'</a> (PM <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>)!';


    }





    $action->timeframe= 24;
    $action->project_id = $project->id;
    $action->client_id = $client->id;
   // $action->dispute_id = $dispute_id;
    $action->authorization_for= $authorizer->id;
    $action->task_id= $task->id;
   // $action->revision_id= $task_revision->id;
    $button = [
        [
            'button_name' => 'Review',
            'button_color' => 'primary',
            'button_type' => 'redirect_url',
            'button_url' => route('tasks.show',$task->id),
        ],

    ];
    $action->button = json_encode($button);
    $action->save();


   }



   }
   public function TaskRevisionAction($task_revision)
   {
    $task= Task::where('id',$task_revision->task_id)->first();

    $sender = User::where('id',Auth::user()->id)->first();

    $user_role= Role::where('id',$sender->role_id)->first();

    $project= Project::where('id',$task->project_id)->first();

    $client= User::where('id',$project->client_id)->first();
   // dd($client);
    $task_user= TaskUser::where('task_id',$task->id)->first();
//    / dd($);

   // $task_revision = TaskRevision::where('task_id',$task->id)->orderBy('id','desc')->first();
    $project_manager= User::where('id',$project->pm_id)->first();
    $authorizer= User::where('id',$task_user->user_id)->first();
   // dd("kdaslkdn");
        $action = new PendingAction();
        $action->code = 'TRA';
        $action->serial = 'TRA'.'x0';

        $action->item_name= 'Revision request';
        $action->heading= 'New revision request!';
        $action->message = 'New revision request for task <a href="'.route('tasks.show',$task->id).'">'.$task->heading.'</a> from '.$user_role->name.' <a href="'.route('employees.show',$sender->id).'">'.$sender->name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>';

        $action->timeframe= 24;
        $action->project_id = $project->id;
        $action->client_id = $client->id;
        $action->task_id = $task->id;
        $action->authorization_for= $authorizer->id;
        $button = [
            [
                'button_name' => 'Review',
                'button_color' => 'primary',
                'button_type' => 'redirect_url',
                'button_url' => route('tasks.show', $task->id),
            ],

        ];
        $action->button = json_encode($button);
        $action->save();
      // dd($action);
   //    dd(json_decode($action->button));



   }

   public function SubmitFirstTask($project)
   {
    $client= User::where('id',$project->client_id)->first();
    $project_manager= User::where('id',$project->pm_id)->first();
    $authorizer= User::where('id',$project->pm_id)->first();
//      / DB::Begintransaction();
        $action = new PendingAction();
        $action->code = 'SFT';
        $action->serial = 'SFT'.'x0';
        $action->item_name= 'Submit your first task';
        $action->heading= 'Submit your first task!';
        $action->message = 'Submit your first task for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>!';
        $action->timeframe= 24;
        $action->project_id = $project->id;
        $action->client_id = $client->id;
     //   $action->deliverable_id = $id;
        $action->authorization_for= $authorizer->id;
        $button = [
            [
                'button_name' => 'Submit',
                'button_color' => 'primary',
                'button_type' => 'redirect_url',
                'button_url' => route('projects.show', $project->id.'?tab=tasks'),
            ],

        ];
        $action->button = json_encode($button);
        $action->save();
//      / / dd($action);
   //    dd(json_decode($action->button));



   }
   public function CompleteFirstMilestone($project)
   {
    $client= User::where('id',$project->client_id)->first();
    $project_manager= User::where('id',$project->pm_id)->first();
    $authorizer= User::where('id',$project->pm_id)->first();

        $action = new PendingAction();
        $action->code = 'CFM';
        $action->serial = 'CFM'.'x0';
        $action->item_name= ' Complete your first milestone';
        $action->heading= 'Complete your first milestone!';
        $action->message = 'Complete your first milestone for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>!';
        $action->timeframe= 24;
        $action->project_id = $project->id;
        $action->client_id = $client->id;
     //   $action->deliverable_id = $id;
        $action->authorization_for= $authorizer->id;
        $button = [
            [
                'button_name' => 'Complete',
                'button_color' => 'primary',
                'button_type' => 'redirect_url',
                'button_url' => route('projects.show', $project->id.'?tab=milestones'),
            ],

        ];
        $action->button = json_encode($button);
        $action->save();
      //  dd($action);
   //    dd(json_decode($action->button));



   }
   public function RemovalofStagingSite($project,$project_submission)
   {

     $client= User::where('id',$project->client_id)->first();
        $project_manager= User::where('id',$project->pm_id)->first();
        $authorizer= User::where('role_id',6)->orderBy('id','desc')->first();


            $action = new PendingAction();
            $action->code = 'STR';
            $action->serial = 'STR'.'x0';
            $action->item_name= 'Removal of staging site';
            $action->heading= 'Removal of staging site!';
            $action->message = 'Staging site <a target="_blank" href="'.$project_submission->dummy_link.'">'.$project_submission->dummy_link.'</a> for client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> should be Deleted (PM: <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>)';
            $action->timeframe= 24;
            $action->project_id = $project->id;

            $action->client_id = $client->id;
            $action->authorization_for= $authorizer->id;
            $button= '';

            $action->save();
            $button = [

                [
                    'button_name' => 'Delete',
                    'button_color' => 'success',
                    'button_type' => 'modal',
                    'button_url' => '',
                    'modal_form'=> true,
                    'form'=> [
                        [
                            'type'=> 'textarea',
                            'label'=>'Write down the hosting company it\'s hosted in',
                            'name'=>'hosting_company_name',
                            'required'=> true,
                        ],
                        [
                            'type'=> 'file',
                            'label'=>'Share a screenshot of the "Delete confirmation" page within the hosting',
                            'name'=>'screenshot',
                            'required'=> true,
                        ],
                        [
                            'type'=> 'hidden',
                             'value'=> $project->id,
                             'readonly'=> true,

                            'name'=>'project_id',
                            'required'=> true,
                        ],
                         [
                            'type'=> 'hidden',
                            'value'=> $action->id,
                            'readonly'=> true,

                            'name'=>'authorization_id',

                            'required'=> true,

                        ],

                    ],
                    'form_action'=> [
                        [
                            'type'=> 'button',
                            'method'=>'POST',
                            'label'=> 'Confirm Deletion',
                            'color'=> 'danger',
                            'url'=> route('delete-staging'),

                        ],


                    ]
                ],
            ];
            $action->button = json_encode($button);
            $action->save();
           // dd($action);



        }
        public function NeedtoTaskAssign($developer)
        {
            $developer= User::where('id',$developer->id)->first();
            $authorizer= User::where('role_id',6)->orderBy('id','desc')->first();

                $action = new PendingAction();
                $action->code = 'NTTA';
                $action->serial = 'NTTA'.'x'.$developer->id;
                $action->item_name= 'New task needs to be assigned!';
                $action->heading= 'New task needs to be assigned!';
                $action->message = 'Developer <a href="'.route('employees.show',$developer->id).'">'.$developer->name.'</a> should finish all his current tasks in the next few hours! Assign a new task now!';
                $action->timeframe= 24;
              //  $action->project_id = $project->id;
              //  $action->client_id = $client->id;
                $action->developer_id = $developer->id;
                $action->authorization_for= $authorizer->id;
                $button= '';
                $button = [
                    [
                        'button_name' => 'Assign',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('tasks.index'),
                    ],
                    [
                        'button_name' => 'Ignore',
                        'button_color' => 'danger',
                        'button_type' => 'redirect_url',
                        'button_url' => route('ignore-assign-task',$developer->id),



                    ],

                ];

                $action->button = json_encode($button);
                $action->save();
              //  dd($action);

        }
        public function ParentTaskAuthorization($task)
        {
            $project= Project::where('id',$task->project_id)->first();
            $client= User::where('id',$project->client_id)->first();
            $project_manager= User::where('id',$project->pm_id)->first();
            $authorizers= User::where('role_id',1)->get();
            foreach ($authorizers as $key => $authorizer) {
                $action = new PendingAction();
                $action->code = 'PTA';
                $action->serial = 'PTA'.'x'.$key;
                $action->item_name= 'PM\'s own work assigning authorization!';
                $action->heading= 'PM\'s own work assigning authorization!';
                $action->message = 'Project manager <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a> wants to assign task '.$task->heading.' to the team (He should have performed this task on his own)!';
                $action->timeframe= 24;
                $action->project_id = $project->id;
                $action->client_id = $client->id;
               $action->task_id = $task->id;
                $action->authorization_for= $authorizer->id;
                $button = [
                    [
                        'button_name' => 'Review',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('tasks.index'),
                    ],

                ];
                $action->button = json_encode($button);
                $action->save();

            }


        }
        public function CreateMilestoneInvoice($milestone)
        {
            $project= Project::where('id',$milestone->project_id)->first();
            $client= User::where('id',$project->client_id)->first();
            $project_manager= User::where('id',$project->pm_id)->first();
            $authorizer= User::where('id',$project_manager->id)->first();

                $action = new PendingAction();
                $action->code = 'CMI';
                $action->serial = 'CMI'.'x0';
                $action->item_name= 'Create your last invoice!';
                $action->heading= 'Create your last invoice!';
                $action->message = 'Create your last invoice for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>!';
                $action->timeframe= 24;
                $action->project_id = $project->id;
                $action->client_id = $client->id;
                $action->milestone_id = $milestone->id;
                $action->authorization_for= $authorizer->id;
                $button = [
                    [
                        'button_name' => 'Create',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('projects.show', $project->id.'?tab=milestones'),
                    ],

                ];
                $action->button = json_encode($button);
                $action->save();



        }
        public function AddLastPayment($milestone)
        {
            $project= Project::where('id',$milestone->project_id)->first();
            $client= User::where('id',$project->client_id)->first();
            $project_manager= User::where('id',$project->pm_id)->first();
            $authorizer= User::where('id',$project_manager->id)->first();

                $action = new PendingAction();
                $action->code = 'ALP';
                $action->serial = 'ALP'.'x0';
                $action->item_name= 'Complete your project';
                $action->heading= 'Add your last payment and complete your project!';
                $action->message = 'Add your final payment to complete project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>!';
                $action->timeframe= 24;
                $action->project_id = $project->id;
                $action->client_id = $client->id;
                $action->milestone_id = $milestone->id;
                $action->authorization_for= $authorizer->id;
                $button = [
                    [
                        'button_name' => 'Add Payment',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('projects.show', $project->id.'?tab=milestones'),
                    ],

                ];
                $action->button = json_encode($button);
                $action->save();

        }
        public function ProjectDeadline($project, $difference_in_hours)
        {
            $project= Project::where('id',$project->id)->first();
            $client= User::where('id',$project->client_id)->first();
            $project_manager= User::where('id',$project->pm_id)->first();
            $authorizer= User::where('id',$project_manager->id)->first();

                $action = new PendingAction();
                $action->code = 'PDA';
                $action->serial = 'PDA'.'x0';
                $action->item_name= 'Deadline in the next 2 days!';
                $action->heading= 'Project deadline will be over soon!';
                $action->message = 'Deadline for your project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> will be over in the next ';
               if($difference_in_hours > 0)
               {
                $action->timeframe= $difference_in_hours;

               }else
               {
                $action->timeframe= 0;

               }

                $action->project_id = $project->id;
                $action->client_id = $client->id;
             //  $action->task_id = $task->id;
                $action->authorization_for= $authorizer->id;
                $button = [
                    [
                        'button_name' => 'Submit',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('projects.show', $project->id.'?tab=tasks'),
                    ],

                ];
                $action->button = json_encode($button);
                $action->save();



        }
        public function TaskDeadline($task, $difference_in_hours)
        {
           // dd($task);
           if($task->independent_task_status != 1)
           {
            $project= Project::where('id',$task->project_id)->first();
            $client= User::where('id',$project->client_id)->first();
            $project_manager= User::where('id',$project->pm_id)->first();
            $task_user= TaskUser::where('task_id',$task->id)->first();
            $authorizer= User::where('id',$task_user->user_id)->first();

                $action = new PendingAction();
                $action->code = 'DTDA';
                $action->serial = 'DTDA'.'x0';
                $action->item_name= 'Deadline in the next 18 hours';
                $action->heading= 'Task deadline will be over soon!';
                $action->message = 'Deadline for your task <a href="'.route('tasks.show',$task->id).'">'.$task->heading.'</a> from PM <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a> for client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> will be over in the next';
                if($difference_in_hours > 0)
                {
                 $action->timeframe= $difference_in_hours;

                }else
                {
                 $action->timeframe= 0;

                }
                $action->project_id = $project->id;
                $action->client_id = $client->id;
                $action->task_id = $task->id;
                $action->authorization_for= $authorizer->id;
                $button = [
                    [
                        'button_name' => 'Submit',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('tasks.show', $task->id),
                    ],

                ];
                $action->button = json_encode($button);
                $action->save();
             //   dd($action);

           }


        }
        public function NeedtoSubmitParentTask($task)
        {
            if($task->independent_task_status != 1)
            {
             $project= Project::where('id',$task->project_id)->first();
             $client= User::where('id',$project->client_id)->first();
             $project_manager= User::where('id',$project->pm_id)->first();
             $task_user= TaskUser::where('task_id',$task->id)->first();
             $authorizer= User::where('id',$task_user->user_id)->first();

                 $action = new PendingAction();
                 $action->code = 'NSPT';
                 $action->serial = 'NSPT'.'x0';
                 $action->item_name= 'Submit work';
                 $action->heading= 'Submit task!';
                 $action->message = 'Submit task <a href="'.route('tasks.show',$task->id).'">'.$task->heading.'</a> to project manager <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a> for client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>!';
                 $action->timeframe= 24;
                 $action->project_id = $project->id;
                 $action->client_id = $client->id;
                 $action->task_id = $task->id;
                 $action->authorization_for= $authorizer->id;
                 $button = [
                     [
                         'button_name' => 'Submit',
                         'button_color' => 'primary',
                         'button_type' => 'redirect_url',
                         'button_url' => route('tasks.show', $task->id),
                     ],

                 ];
                 $action->button = json_encode($button);
                 $action->save();
              //   dd($action);

            }

        }

        public function NewDeveloperEvaluation($user)
        {
            $new_dev = User::where('id',$user)->first(); 
            $evaluation_task = EmployeeEvaluationTask::where('user_id',$new_dev->id)->first(); 
            $task = Task::where('id',$evaluation_task->task_id)->first();
            $authorizers= User::where('role_id',6)->get();
            foreach ($authorizers as $key => $authorizer) {
                $action = new PendingAction();
                $action->code = 'NDPE';
                $action->serial = 'NDPE'.'x'.$key;
                $action->item_name= 'New developer\'s performance evaluation!';
                $action->heading= 'New developer\'s performance evaluation!';
                $action->message = 'Fill out initial performance evaluation from for the dedeloper <a href="'.route('employees.show',$new_dev->id).'">'.$new_dev->name.'</a>!';
                $action->timeframe= 24;
                $action->client_id = $task->id;
               $action->task_id = $task->id;
               $action->developer_id = $new_dev->id;
                $action->authorization_for= $authorizer->id;
                $button = [
                    [
                        'button_name' => 'Evaluate',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('employee-evaluation.index'),
                        'button_url' => route('employee-evaluation.index', ['user_id' => $new_dev->id, 'show' => 'all']),
                    ],

                ];
                $action->button = json_encode($button);
                $action->save();
            }
        }

        public function leadDevSubmittedNewDevEvaluation($evaluation_task)
        {
            $evaluation_task = EmployeeEvaluationTask::where('id',$evaluation_task)->first(); 
            $new_dev = User::where('id',$evaluation_task->user_id)->first(); 
            $lead_dev = User::where('id',$evaluation_task->lead_dev_id)->first(); 
            $task = Task::where('id',$evaluation_task->task_id)->first();
            $authorizers= User::where('role_id',8)->get();
            $updated_at = Carbon::parse($evaluation_task->updated_at);
            $formatted_date_time = $updated_at->format('d F Y \a\t g:i A');
            foreach ($authorizers as $key => $authorizer) {
                $action = new PendingAction();
                $action->code = 'LDSEND';
                $action->serial = 'LDSEND'.'x'.$key;
                $action->item_name= 'New developer\'s evaluation!';
                $action->heading= 'Lead Dedeloper '.$lead_dev->name.' has submitted evaluations for New Developer '.$new_dev->name.'!';
                $action->message = 'Lead Dedeloper <a href="'.route('employees.show',$lead_dev->id).'">'.$lead_dev->name.'</a> has evaluated New Developer <a href="'.route('employees.show',$new_dev->id).'">'.$new_dev->name.'</a> on '.$formatted_date_time.'';
                $action->timeframe= 24;
                $action->client_id = $task->client_id;
               $action->task_id = $task->id;
               $action->developer_id = $new_dev->id;
                $action->authorization_for= $authorizer->id;
                $button = [
                    [
                        'button_name' => 'Review',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('employee-evaluation.index'),
                        'button_url' => route('employee-evaluation.index', ['user_id' => $new_dev->id, 'show' => 'all']),
                    ],

                ];
                $action->button = json_encode($button);
                $action->save();
            }
        }
        public function teamLeadSubmittedNewDevEvaluation($evaluation_task)
        {
            $evaluation_task = EmployeeEvaluationTask::where('id',$evaluation_task)->first(); 
            $new_dev = User::where('id',$evaluation_task->user_id)->first(); 
            $lead_dev = User::where('id',$evaluation_task->lead_dev_id)->first(); 
            $evaluation = EmployeeEvaluation::where('user_id',$evaluation_task->user_id)->first(); 
            $team_lead = User::where('id',$evaluation->team_lead_id)->first();
            $task = Task::where('id',$evaluation_task->task_id)->first();
            $authorizers= User::where('role_id',1)->get();
            $updated_at = Carbon::parse($evaluation_task->updated_at);
            $formatted_date_time = $updated_at->format('d F Y \a\t g:i A');
            foreach ($authorizers as $key => $authorizer) {
                $action = new PendingAction();
                $action->code = 'TLSDE';
                $action->serial = 'TLSDE'.'x'.$key;
                $action->item_name= 'Team leader submission!';
                $action->heading= 'Team Leader '.$team_lead->name.'\'s Lead Developer '.$lead_dev->name.'\'s evaluation on Employee '.$new_dev->name.'!';
                $action->message = 'Team Leader <a href="'.route('employees.show',$team_lead->id).'">'.$team_lead->name.'</a> has reviewed Lead Developer <a href="'.route('employees.show',$lead_dev->id).'">'.$lead_dev->name.'\'s</a> evaluations  on New Developer on '.$formatted_date_time.'';
                $action->timeframe= 24;
                $action->client_id = $task->client_id;
               $action->task_id = $task->id;
               $action->developer_id = $new_dev->id;
                $action->authorization_for= $authorizer->id;
                $button = [
                    [
                        'button_name' => 'Authorize',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('employee-evaluation.index'),
                        'button_url' => route('employee-evaluation.index', ['user_id' => $new_dev->id, 'show' => 'all']),
                    ],
                    [
                        'button_name' => 'Continue this trial for 1 more week!',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('employee-evaluation.index'),
                        'button_url' => route('employee-evaluation.index', ['user_id' => $new_dev->id, 'show' => 'all']),
                    ],

                ];
                $action->button = json_encode($button);
                $action->save();
            }
        }

        public function evaluationAuthForAdmin($evaluation_task)
        {
            $evaluation_task = EmployeeEvaluationTask::where('id',$evaluation_task)->first(); 
            $new_dev = User::where('id',$evaluation_task->user_id)->first();
            $lead_dev = User::where('id',$evaluation_task->lead_dev_id)->first(); 
            $evaluation = EmployeeEvaluation::where('user_id',$evaluation_task->user_id)->first(); 
            $top_management = User::where('id',Auth::user()->id)->first(); 
            $team_lead = User::where('id',$evaluation->team_lead_id)->first();
            $task = Task::where('id',$evaluation_task->task_id)->first();
            $authorizers = User::whereIn('role_id', [8, 6])->get();
            $updated_at = Carbon::parse($evaluation_task->updated_at);
            $formatted_date_time = $updated_at->format('d F Y \a\t g:i A');
            foreach ($authorizers as $key => $authorizer) {
                $action = new PendingAction();
                $action->code = 'EAFA';
                $action->serial = 'EAFA'.'x'.$key;
                $action->item_name= 'Evaluation auth for admin!';
                $action->heading= 'New Developer '.$new_dev->name.' was authorize for real work by Top Management '.$top_management->name.'!';
                $action->message = 'Top Management <a href="'.route('employees.show',$top_management->id).'">'.$top_management->name.'</a> has authorized New Developer <a href="'.route('employees.show',$new_dev->id).'">'.$new_dev->name.'</a> for real work from '.$formatted_date_time.'';
                $action->timeframe= 24;
                $action->client_id = $task->client_id;
               $action->task_id = $task->id;
               $action->developer_id = $new_dev->id;
                $action->authorization_for= $authorizer->id;
                $button = [
                    [
                        'button_name' => 'Acknowledge It',
                        'button_color' => 'primary',
                        'button_type' => 'modal',
                        'button_url' => '',
                        'modal_form'=> false,
                    ],

                ];
                $action->button = json_encode($button);
                $action->save();
            }
        }
        public function evaluationRejectForAdmin($evaluation_task)
        {
            $evaluation_task = EmployeeEvaluationTask::where('id',$evaluation_task)->first(); 
            $new_dev = User::where('id',$evaluation_task->user_id)->first(); 
            $lead_dev = User::where('id',$evaluation_task->lead_dev_id)->first(); 
            $evaluation = EmployeeEvaluation::where('user_id',$evaluation_task->user_id)->first(); 
            $top_management = User::where('id',Auth::user()->id)->first(); 
            $team_lead = User::where('id',$evaluation->team_lead_id)->first();
            $task = Task::where('id',$evaluation_task->task_id)->first();
            $authorizers = User::whereIn('role_id', [8, 6])->get();
            $updated_at = Carbon::parse($evaluation_task->updated_at);
            $formatted_date_time = $updated_at->format('d F Y \a\t g:i A');
            foreach ($authorizers as $key => $authorizer) {
                $action = new PendingAction();
                $action->code = 'ERFA';
                $action->serial = 'ERFA'.'x'.$key;
                $action->item_name= 'Evaluation reject for admin!';
                $action->heading= 'New Developer '.$new_dev->name.' was rejected for real work by Top Management '.$top_management->name.'!';
                $action->message = 'Top Management <a href="'.route('employees.show',$top_management->id).'">'.$top_management->name.'</a> has rejected New Developer <a href="'.route('employees.show',$new_dev->id).'">'.$new_dev->name.'</a> for real work from '.$formatted_date_time.'';
                $action->timeframe= 24;
                $action->client_id = $task->client_id;
               $action->task_id = $task->id;
               $action->developer_id = $new_dev->id;
                $action->authorization_for= $authorizer->id;
                $button = [
                    [
                        'button_name' => 'Acknowledge It',
                        'button_color' => 'primary',
                        'button_type' => 'modal',
                        'button_url' => '',
                        'modal_form'=> false,
                    ],

                ];
                $action->button = json_encode($button);
                $action->save();
            }
        }
        public function evaluationExtendForAdmin($evaluation_task)
        {
            $evaluation_task = EmployeeEvaluationTask::where('id',$evaluation_task)->first(); 
            $new_dev = User::where('id',$evaluation_task->user_id)->first(); 
            $lead_dev = User::where('id',$evaluation_task->lead_dev_id)->first(); 
            $evaluation = EmployeeEvaluation::where('user_id',$evaluation_task->user_id)->first(); 
            $top_management = User::where('id',Auth::user()->id)->first(); 
            $team_lead = User::where('id',$evaluation->team_lead_id)->first();
            $task = Task::where('id',$evaluation_task->task_id)->first();
            $authorizers = User::whereIn('role_id', [8, 6])->get();
            $updated_at = Carbon::parse($evaluation_task->updated_at);
            $formatted_date_time = $updated_at->format('d F Y \a\t g:i A');
            foreach ($authorizers as $key => $authorizer) {
                $action = new PendingAction();
                $action->code = 'EEFA';
                $action->serial = 'EEFA'.'x'.$key;
                $action->item_name= 'Evaluation extend for admin!';
                $action->heading= 'Top Management '.$top_management->name.' has extended the trial period for New Developer '.$new_dev->name.'!';
                $action->message = 'Top Management <a href="'.route('employees.show',$top_management->id).'">'.$top_management->name.'</a> has extended the trial period for one more week for New Developer <a href="'.route('employees.show',$new_dev->id).'">'.$new_dev->name.'</a> from '.$formatted_date_time.'';
                $action->timeframe= 24;
                $action->client_id = $task->client_id;
               $action->task_id = $task->id;
               $action->developer_id = $new_dev->id;
                $action->authorization_for= $authorizer->id;
                $button = [
                    [
                        'button_name' => 'Acknowledge It',
                        'button_color' => 'primary',
                        'button_type' => 'modal',
                        'button_url' => '',
                        'modal_form'=> false,
                    ],

                ];
                $action->button = json_encode($button);
                $action->save();
            }
        }

}
