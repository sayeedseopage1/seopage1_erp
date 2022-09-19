<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\ProjectRating;
use Illuminate\Http\Request;

class ProjectRatingController extends AccountBaseController
{

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $addProjectRatingPermission = user()->permission('add_project_rating');
        abort_403(!in_array($addProjectRatingPermission, ['all', 'added']));

        $rating = new ProjectRating();
        $rating->rating = $request->rating;
        $rating->comment = $request->comment;
        $rating->user_id = $this->user->id;
        $rating->project_id = $request->project_id;
        $rating->save();

        return Reply::success(__('messages.ratingAddedSuccessfully'));

    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $addProjectRatingPermission = user()->permission('edit_project_rating');
        abort_403(!in_array($addProjectRatingPermission, ['all', 'added']));

        $rating = ProjectRating::find($id);
        $rating->rating = $request->rating;
        $rating->comment = $request->comment;
        $rating->user_id = $this->user->id;
        $rating->project_id = $request->project_id;
        $rating->save();

        return Reply::success(__('messages.ratingUpdatedSuccessfully'));

    }

}
