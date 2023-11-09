<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PendingAction;
use App\Models\User;
use Illuminate\Http\Request;

class HelperPendingActionController extends AccountBaseController
{
    public function ProjectChallengeAuthorization($project)
    {
        $client= User::where('id',$project->client_id)->first();
        $project_manager= User::where('id',$project->pm_id)->first();
        $authorizers= User::where('role_id',1)->get();
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
}
