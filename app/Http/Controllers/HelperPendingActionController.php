<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Deal;
use App\Models\PendingAction;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Auth;
use App\Models\ProjectDeliverable;

class HelperPendingActionController extends AccountBaseController
{
    public function ProjectChallengeAuthorization($project)
    {
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
        $authorizers= User::where('role_id',1)->orWhere('role_id',8)->get();
           foreach ($authorizers as $key => $authorizer) {
            $action = new PendingAction();
            $action->code = 'DOA';
            $action->serial = 'DOA'.'x'.$key;
            $action->item_name= 'Deliverables “Other” authorization';
            $action->heading= 'Deliverables “Other” authorization';
            $action->message = '"Other" type of <a href="'.route('projects.show', $project->id.'?tab=deliverables').'">deliverables</a> for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> require authorization (Project manager: <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>)';
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
        $authorizers= User::where('role_id',1)->orWhere('role_id',8)->get();
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
        $authorizers= User::where('role_id',1)->orWhere('role_id',8)->get();
           foreach ($authorizers as $key => $authorizer) {
            $action = new PendingAction();
            $action->code = 'DGA';
            $action->serial = 'DGA'.'x'.$key;
            $action->item_name= 'Deliverables general authorization';
            $action->heading= 'Deliverables authorization';
            $action->message = '<a href="'.route('projects.show', $project->id.'?tab=deliverables').'">Deliverables</a> for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> require authorization (Project manager: <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>)';
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
        $authorizers= User::where('role_id',1)->orWhere('role_id',8)->get();
           foreach ($authorizers as $key => $authorizer) {
            $action = new PendingAction();
            $action->code = 'QCA';
            $action->serial = 'QCA'.'x'.$key;
            $action->item_name= 'QC form submission authorization';
            $action->heading= 'QC form authorization Needed';
            $action->message = '<a href="'.route('projects.show', $project->id).'">Qc form</a> for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> requires authorization (Project manager: <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>)';
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
        $authorizers= User::where('role_id',1)->orWhere('role_id',8)->get();
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
        $authorizers= User::where('role_id',1)->orWhere('role_id',8)->get();
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
        $authorizers= User::where('role_id',1)->orWhere('role_id',8)->get();
           foreach ($authorizers as $key => $authorizer) {
            $action = new PendingAction();
            $action->code = 'WDADA';
            $action->serial = 'WDADA'.'x'.$key;
            $action->item_name= 'Won deals acceptance delay authorization';
            $action->heading= 'Project acceptance deadline authorization needed';
            $action->message = 'PM <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a> requested more time to accept deal <a href="'.route('contracts.show', $project->deal_id).'">'.$project->project_name.'</a> cancel authorization for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>(Deal awarded on: '.$deal->award_time.')';
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
        $authorizers= User::where('role_id',1)->orWhere('role_id',8)->get();
           foreach ($authorizers as $key => $authorizer) {
            $action = new PendingAction();
            $action->code = 'TGA';
            $action->serial = 'TGAA'.'x'.$key;
            $action->item_name= 'Pm task guideline authorization!';
            $action->heading= 'Task guideline authorization needed!';
            $action->message = 'Task guideline authorization from PM <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a> for Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>';
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
            $authorizers= User::where('role_id',1)->orWhere('role_id',8)->get();
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
            $authorizers= User::where('role_id',1)->orWhere('role_id',8)->get();
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
  
            $project= Project::where('id',$task->id)->first();
            $raised_by= User::where('id',$disputes->raised_by)->first();
            $raised_against= User::where('id',$disputes->raised_against)->first();
            $client= User::where('id',$project->client_id)->first();
            $project_manager= User::where('id',$project->pm_id)->first();
            $lead_developer= User::where('role_id',6)->orderBy('id','desc')->first();
            $authorizers= User::where('role_id',1)->orWhere('role_id',8)->get();
               foreach ($authorizers as $key => $authorizer) {
                $action = new PendingAction();
                $action->code = 'TDA';
                $action->serial = 'TDA'.'x'.$key;
                $action->item_name= 'Dispute Expiry Warning!';
                $action->heading= 'Dispute Expiry Warning!';
                $action->message = 'Dispute for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> between <a href="'.route('employees.show',$raised_by->id).'">'.$raised_by->name.'</a> & <a href="'.route('employees.show,$raised_against->id').'">'.$raised_against->name.'</a> will be expired in the next 48 hours if it is not resolved then!';
                $action->timeframe= 48;
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

       
         $action = new PendingAction();
         $action->code = 'DMA';
         $action->serial = 'DMA'.'x0';
         $action->item_name= 'Deliverables revision request';
         $action->heading= 'Revision requested in deliverables (From management)!';
         $action->message = 'Revision requested by management for the deliverables '.$deliverables->title.' for project <a href="'.route('projects.show', $project->id.'?tab=deliverables').'">'.$project->project_name.'</a> from the Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>';
         
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
    $client= User::where('id',$project->client_id)->first();
        $project_manager= User::where('id',$project->pm_id)->first();
        $authorizer= User::where('id',$project_manager->id)->get();
        
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
            $button = [
                [
                    'button_name' => 'Create',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('projects.show', $project->id.'?tab=tasks'),
                ],
                [
                    'button_name' => 'Request time more',
                    'button_color' => 'success',
                    'button_type' => 'modal',
                    'button_url' => route('projects.show'),
                    'modal_form'=> true,
                    'form'=> [
                        [
                            'type'=> 'select',
                            'label'=>'Select how many hours need you to create tasks',
                            'name'=>'hours',
                            'options'=> [
                                [
                                    'type'=> 'option',
                                    'value'=> '6',
                                    'lable'=> '6',
                                    'selected'=> true,
                                ],
                                [
                                    'type'=> 'option',
                                    'value'=> '12',
                                    'lable'=> '12',
                                    'selected'=> false,
                                ],
                                [
                                    'type'=> 'option',
                                    'value'=> '18',
                                    'lable'=> '18',
                                    'selected'=> false,
                                ],
                                [
                                    'type'=> 'option',
                                    'value'=> '24',
                                    'lable'=> '24',
                                    'selected'=> false,
                                ],
                                [
                                    'type'=> 'option',
                                    'value'=> '30',
                                    'lable'=> '30',
                                    'selected'=> false,
                                ],


                            ],
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
                        [
                            'type'=> 'textarea',
                            'label'=> '',
                           
                            'readonly'=> false,
                            
                            'name'=>'reason',
                           
                            'required'=> true,
                            
                        ], 
                        
                    ], 
                    'form_action'=> [
                        [
                            'type'=> 'button',
                            'method'=>'POST',
                            'label'=> 'Submit',
                            'color'=> 'success',
                            'url'=> '',
      
                        ], 
                       
                        
                    ]
                ],
                [
                    'button_name' => 'All the tasks were already created',
                    'button_color' => 'success',
                    'button_type' => 'modal',
                    'button_url' => route('projects.show'),
                    'modal_form'=> true,
                    'form'=> [
                        
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
                        [
                            'type'=> 'textarea',
                            'label' => 'The number of tasks created are too few when compared to the number of deliverables. Why is that?',
                           
                            'readonly'=> false,
                            
                            'name'=>'comment',
                           
                            'required'=> true,
                            
                        ], 
                        
                    ], 
                    'form_action'=> [
                        [
                            'type'=> 'button',
                            'method'=>'POST',
                            'label'=> 'Submit',
                            'color'=> 'success',
                            'url'=> '',
      
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
