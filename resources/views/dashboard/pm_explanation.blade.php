@extends('layouts.app')
@section('content')
    <style>
        .content_table {
            padding: 10px;
            height: calc(100vh - 100px);
            background: white;
            position: -webkit-sticky;
            position: sticky;
            top: 80px;
            left: 0;
            width: 100%;
            scroll-margin-top: 100px;
            overflow-y: auto;
        }
        .content_table ul{
            position: -webkit-sticky;
            position: sticky;
            top: 100px;
            left: 0;
            width: 100%;
            padding-inline: 10px;
            display: flex;
            flex-direction: column;
            -ms-flex-direction: column;
            gap: 10px;

        }
        #content_table li a.active{
            color: red;
        }
        .card{
            scroll-margin-top: 100px;
        }

    </style>

    <div class="container-fluid">
        <div class="row"  >
            <div class="col-10">
                <div class="row" data-spy="scroll" data-target="#content_table">
                    <div class="col-md-12">
                        <div class="card mt-3 p-2" style="border: none" id="concept_of_cycle">
                            <div class="card-title">
                                <h5>The concept of cycle</h5>
                            </div>
                            <div class="text-left">
                                <p>Here, we are terming the first part of the cycle as “Assign cycle” (June 16-July 15) and
                                    the 2nd part of the cycle as “Release cycle” (June 16-July 30). Here are the
                                    considerations here: A. Since the release cycle is 45 days, there is a overlap of 15
                                    days between 2 cycles release cycles. For example, for June-Jule and July August cycle,
                                    the release cycles are June 16-July 30 and July 16-August 30th respectively. So here, we
                                    have an overlap of 15 days July 16-July 30th. Now, there can be a confusion like if a
                                    payment gets released in these 15 days, which cycle should it be counted in?</p>
                                <p>*Any project that started in the assign cycle of June-July or before and money released
                                    between July 16-July 30, should be counted in June-July release cycle.</p>
                                <p>*Any project that started in the July-August cycle i.e. July 16th-15th August and the
                                    money released between July 16-July 30, should be counted in July-August cycle.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-3" style="border: none; height: 100%" id="total-assigned-projects-number">
                            <div class="card-title">
                                <h5>Total assigned projects</h5>
                            </div>
                            <div class="text-left">
                                <p>Total number of projects assigned to a project manager in a assign cycle (June 16-July
                                    15). It should include both the projects he accepted and the ones he declined.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%;" id="accept-projects">
                            <div class="card-title">
                                <h5>Accepted projects</h5>
                            </div>
                            <div class="text-left">
                                <p>Total number of projects accepted by a project manager in an assign cycle (June 16-July
                                    15).</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="rejected-projects">
                            <div class="card-title">
                                <h5>Rejected projects</h5>
                            </div>
                            <div class="text-left">
                                <p>Total number of projects rejected by a project manager in an assign cycle (June 16-July
                                    15).</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="total-assigned-projects-value">
                            <div class="card-title">
                                <h5>Total assigned projects value</h5>
                            </div>
                            <div class="text-left">
                                <p>The total value of projects assigned to a project manager in an assign cycle (June
                                    16-July 15). It will include both the projects he accepted and the ones he declined.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="accept-projects-value">
                            <div class="card-title">
                                <h5>Accepted projects value</h5>
                            </div>
                            <div class="text-left">
                                <p>Total value of projects accepted by a project manager in an assign cycle (June 16-July
                                    15).</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="rejected-projects-value">
                            <div class="card-title">
                                <h5>Rejected projects value</h5>
                            </div>
                            <div class="text-left">
                                <p>Total number of projects rejected by a project manager in an assign cycle (June 16-July
                                    15)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="released-amount-for-cycle">
                            <div class="card-title">
                                <h5>Released amount for Cycle</h5>
                            </div>
                            <div class="text-left">
                                <p>Total amount of money released in the release cycle (June 16-July 31) for the projects
                                    assigned in the assign cycle (June 16-July 15).</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="total-released-amount">
                            <div class="card-title">
                                <h5>Total released amount</h5>
                            </div>
                            <div class="text-left">
                                <p>The total amount of money released in the release cycle (June 16-July 31) for the
                                    projects assigned in the assign cycle or earlier (Anytime before July 15).</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="new-client">
                            <div class="card-title">
                                <h5>New clients</h5>
                            </div>
                            <div class="text-left">
                                <p>All the first time clients that entered the system for the very first time in the current
                                    assign cycle (June 16-July 15)</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="existing-client">
                            <div class="card-title">
                                <h5>Existing clients</h5>
                            </div>
                            <div class="text-left">
                                <p>All the old clients that gave any new project in the current assign cycle (June 16-July
                                    15)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="in-progress-projects-for-this-cycle-number">
                            <div class="card-title">
                                <h5>100% in progress projects for this cycle (Number)</h5>
                            </div>
                            <div class="text-left">
                                <p>The number of 100% in progress projects (in this release cycle i.e. June 16th-July 31st)
                                    which were assigned in the assign cycle (June 16th-July 15th).</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="in-progress-projects-in-this-cycle-number">
                            <div class="card-title">
                                <h5>100% in progress projects in this cycle (Number)</h5>
                            </div>
                            <div class="text-left">
                                <p>The number of 100% projects (in this release cycle i.e. June 16th-July 31st) that were
                                    assigned in the assign cycle (June 16th-July 15th) + the old projects that got 100% in
                                    progress in this release cycle.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="in-progress-projects-for-this-cycle-value">
                            <div class="card-title">
                                <h5>100% in progress projects for this cycle (value)</h5>
                            </div>
                            <div class="text-left">
                                <p>The value of 100% in progress projects (in this release cycle i.e. June 16th-July 31st)
                                    which were assigned in the assign cycle (June 16th-July 15th).</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="in-progress-projects-in-this-cycle-value">
                            <div class="card-title">
                                <h5>100% in progress projects in this cycle (value)</h5>
                            </div>
                            <div class="text-left">
                                <p>The value of 100% projects (in this release cycle i.e. June 16th-July 31st) that were
                                    assigned in the assign cycle (June 16th-July 15th) + the old projects that got 100% in
                                    progress in this release cycle.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id=project-complection-rate-for-this-cycle-count>
                            <div class="card-title">
                                <h5>Project completion rate for this cycle(Count)</h5>
                            </div>
                            <div class="text-left">
                                <p>The number of 100% in progress projects (in this release cycle i.e. June 16th-July 31st)
                                    which were assigned in the assign cycle (June 16th-July 15th)/the number of the projects
                                    accepted by the project manager in the assign cycle (June 16th-July 15th).</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="project-complection-rate-in-this-cycle-count">
                            <div class="card-title">
                                <h5>Project completion rate in this cycle(Count)</h5>
                            </div>
                            <div class="text-left">
                                <p>The number of 100% in-progress projects (in this release cycle i.e. June 16th-July 31st)
                                    which were assigned in the assign cycle (June 16th-July 15th) + the number of old
                                    projects that got 100% in progress in this release cycle (June 16th-July 31st)/ the
                                    number of the projects accepted by the project manager in the assign cycle (June
                                    16th-July 15th)+the number of old projects that got released in the release cycle (June
                                    16th-July 31st).</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="project-complection-rate-for-this-cycle-value">
                            <div class="card-title">
                                <h5>Project completion rate for this cycle(Value)</h5>
                            </div>
                            <div class="text-left">
                                <p>The value of 100% in progress projects (in this release cycle i.e. June 16th-July 31st)
                                    which were assigned in the assign cycle (June 16th-July 15th)/the value of the projects
                                    accepted by the project manager in the assign cycle (June 16th-July 15th).</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="project-complection-rate-in-this-cycle-value">
                            <div class="card-title">
                                <h5>Project completion rate in this cycle(Value)</h5>
                            </div>
                            <div class="text-left">
                                <p>The value of 100% in progress projects (in this release cycle i.e. June 16th-July 31st)
                                    which were assigned in the assign cycle (June 16th-July 15th) + the value of old
                                    projects that got 100% in progress in this release cycle (June 16th-July 31st)/ the
                                    value of the projects accepted by the project manager in the assign cycle (June
                                    16th-July 15th)+the value of old projects that got released in the release cycle (June
                                    16th-July 31st).</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="completed-finished-projects-for-cycle-number">
                            <div class="card-title">
                                <h5>Completed/Finished projects for cycle (Number)</h5>
                            </div>
                            <div class="text-left">
                                <p>The number of finished projects (in this release cycle i.e. June 16th-July 31st) which
                                    were assigned in the assign cycle (June 16th-July 15th).</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="total-completed-finished-projects-in-this-cycle-number">
                            <div class="card-title">
                                <h5>Total completed/Finished projects in this cycle (Number)</h5>
                            </div>
                            <div class="text-left">
                                <p>The number of finished projects (in this release cycle i.e. June 16th-July 31st) that
                                    were assigned in the assign cycle (June 16th-July 15th) + the old projects that got
                                    finished in this release cycle.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="completed-finished-projects-in-this-cycle-value">
                            <div class="card-title">
                                <h5>Completed/Finished projects for cycle (Value)</h5>
                            </div>
                            <div class="text-left">
                                <p>
                                    The value of finished projects (in this release cycle i.e. June 16th-July 31st) which
                                    were assigned in the assign cycle (June 16th-July 15th).
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="total-completed-finished-projects-in-cycle-value">
                            <div class="card-title">
                                <h5>Total completed/Finished projects in this cycle (value)</h5>
                            </div>
                            <div class="text-left">
                                <p>The value of finished projects (in this release cycle i.e. June 16th-July 31st) that were
                                    assigned before the end of the assign cycle i.e. 15th July (If the cycle is 16th
                                    June-15th July) </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="project_completion_rate_for_this_cycle_count">
                            <div class="card-title">
                                <h5>Project Completion rate for this cycle (Count)</h5>
                            </div>
                            <div class="text-left">
                                <p>
                                    The number of finished projects (in this release cycle i.e. June 16th-July 31st) which
                                    were assigned in the assign cycle (June 16th-July 15th)/ the number of the projects
                                    accepted by the project manager in the assign cycle (June 16th-July 15th).
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="project_completion_rate_in_this_cycle_count">
                            <div class="card-title">
                                <h5>Project Completion rate in this cycle (Count)</h5>
                            </div>
                            <div class="text-left">
                                <p>The number of finished projects (in this release cycle i.e. June 16th-July 31st) which
                                    were assigned in the assign cycle (June 16th-July 15th) + the number of old projects
                                    that got finished/ the number of the projects accepted by the project manager in the
                                    assign cycle (June 16th-July 15th) +the number of old projects that got released in the
                                    release cycle (June 16th-July 31st).</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="completed-finished-projects-for-cycle">
                            <div class="card-title">
                                <h5>100% in progress projects for cycle</h5>
                            </div>
                            <div class="text-left">
                                <p>
                                    The value of finished projects (in this release cycle i.e. June 16th-July 31st) which
                                    were assigned in the assign cycle (June 16th-July 15th)/ the value of the projects
                                    accepted by the project manager in the assign cycle (June 16th-July 15th).
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="completed-finished-project-for-cycle">
                            <div class="card-title">
                                <h5>Project Completion rate in this cycle (Count)</h5>
                            </div>
                            <div class="text-left">
                                <p>The value of finished projects (in this release cycle i.e. June 16th-July 31st) which
                                    were assigned in the assign cycle (June 16th-July 15th) + the value of old projects that
                                    got finished/ the value of the projects accepted by the project manager in the assign
                                    cycle (June 16th-July 15th) +the value of old projects that got released in the release
                                    cycle (June 16th-July 31st).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="milestone_assigned_for_this_cycle_count">
                            <div class="card-title">
                                <h5>Milestone assigned for this cycle (Count)</h5>
                            </div>
                            <div class="text-left">
                                <p>The total number of milestones created during this assign cycle (June 16-July 15).</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="milestone_assigned_in_this_cycle_value">
                            <div class="card-title">
                                <h5>Milestone assigned in this cycle (Value)</h5>
                            </div>
                            <div class="text-left">
                                <p>The total value of milestones created during this assign cycle (June 16-July 15).</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="milestone-completed-for-this-cycle-count">
                            <div class="card-title">
                                <h5>Milestone completed for this cycle (Count)</h5>
                            </div>
                            <div class="text-left">
                                <p>Total number of milestones completed during the release cycle (June 16th-July 31st) that
                                    got assigned between June 16th-July 15th i.e. assign cycle.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="milestone-completed-in-this-cycle-count">
                            <div class="card-title">
                                <h5>Milestone completed in this cycle (count)</h5>
                            </div>
                            <div class="text-left">
                                <p>The total number of milestones completed during the release cycle (June 16th-July 31st)
                                    that got assigned before the end of the assign cycle i.e. July 15th. Here all the old
                                    milestones will also count.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="milestone_released_for_this_cycle_value">
                            <div class="card-title">
                                <h5>Milestone Released For This Cycle (Value)</h5>
                            </div>
                            <div class="text-left">
                                <p>The total value of milestones completed during the release cycle (June 16th-July 31st)
                                    that got assigned between June 16th-July 15th i.e. assign cycle.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="milestone_released_in_this_cycle_value">
                            <div class="card-title">
                                <h5>Milestone Released In This Cycle (Value)</h5>
                            </div>
                            <div class="text-left">
                                <p>The total value of milestones completed during the release cycle (June 16th-July 31st)
                                    that got assigned before the end of the assign cycle i.e. July 15th. Here all the old
                                    milestones will also count.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="milestone_completion_percentage_for_this_cycle">
                            <div class="card-title">
                                <h5>Milestone Completion Percentage For This Cycle (Count)</h5>
                            </div>
                            <div class="text-left">
                                <p>The number of complete milestones (in this release cycle i.e. June 16th-July 15th) that
                                    were assigned in the assign cycle (June 16th-July 15th)/the number of milestones
                                    accepted by the project manager in the assign cycle (June 16th-July 15th).</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="milestone_completion_percentage_in_this_cycle">
                            <div class="card-title">
                                <h5>Milestone Completion Percentage In This Cycle (Count)</h5>
                            </div>
                            <div class="text-left">
                                <p>The number of complete milestones (in this release cycle i.e. June 16th-July 15th) before
                                    the end of the assign cycle i.e. July 15th/the number of milestones accepted by the
                                    project manager in the assign cycle (June 16th-July 15th) + the number of old milestones
                                    that got completed during this release cycle.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="milestone_completion_percentage_for_this_cycle_value">
                            <div class="card-title">
                                <h5>Milestone Completion Percentage For This Cycle (Value)</h5>
                            </div>
                            <div class="text-left">
                                <p>The value of complete milestones (in this release cycle i.e. June 16th-July 15th) that
                                    were assigned in the assign cycle (June 16th-July 15th)/the value of milestones accepted
                                    by the project manager in the assign cycle (June 16th-July 15th).</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="milestone_completion_percentage_in_this_cycle_value">
                            <div class="card-title">
                                <h5>Milestone Completion Percentage In This Cycle (Value)</h5>
                            </div>
                            <div class="text-left">
                                <p>The value of complete milestones (in this release cycle i.e. June 16th-July 15th) before
                                    the end of the assign cycle i.e. July 15th/the value of milestones accepted by the
                                    project manager in the assign cycle (June 16th-July 15th) + the value of old milestones
                                    that got completed during this release cycle.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12">
                        <div class="card p-2" style="border: none; height: 100%" id="task_assigned_for_this_cycle">
                            <div class="card-title">
                                <h5>Task Assigned For This Cycle</h5>
                            </div>
                            <div class="text-left">
                                <p>The number of tasks the project manager assigned to the lead developer during the assign
                                    cycle (June 16th-July 15th).</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="tasks_completed_for_this_cycle">
                            <div class="card-title">
                                <h5>Tasks Completed For This Cycle</h5>
                            </div>
                            <div class="text-left">
                                <p>The number of your tasks that got completed during the release cycle (June 16th-July
                                    31st) from the ones you assigned to the lead developer during the assign cycle (June
                                    16th-July 15th).</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="tasks_completed_in_this_cycle">
                            <div class="card-title">
                                <h5>Tasks Completed In This Cycle</h5>
                            </div>
                            <div class="text-left">
                                <p>The value of your tasks that got completed during the release cycle (June 16th-July 31st)
                                    from the ones you assigned to the lead developer during the assign cycle (June 16th-July
                                    15th).</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="task_completion_rate_for_cycle">
                            <div class="card-title">
                                <h5>Task completion rate for this cycle</h5>
                            </div>
                            <div class="text-left">
                                <p>The number of complete tasks in the release cycle i.e. June 16th-July 31st (which got
                                    assigned in the assign cycle i.e. June 16th-July 15th)/Number of assigned tasks in the
                                    assign cycle i.e. June 16th-July 15th.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="task_completion_rate_in_this_cycle">
                            <div class="card-title">
                                <h5>Task completion rate in this cycle </h5>
                            </div>
                            <div class="text-left">
                                <p>Number of complete tasks in the release cycle (which got assigned in the assign cycle
                                    i.e. June 16th-July 15th)+Number of old tasks which got completed in the release cycle
                                    (June 16th-July 31st)/Number of assigned tasks in the assign cycle i.e. June 16th-July
                                    15th +Number of old tasks that got completed in the release cycle (June 16th-July 31st).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="average_project_completion_time_for_this_cycle">
                            <div class="card-title">
                                <h5>Average Project Completion Time For This Cycle</h5>
                            </div>
                            <div class="text-left">
                                <h6>The calculation for this is as below:</h6>
                                <p>Project finish date-Project award date</p>
                                <h6>Also, a project will be included here if the following conditions are met: </h6>
                                <p>A. It was assigned in the assign cycle i.e. June 16-July 15.</p>
                                <p>B. It was finished in the release cycle i.e. June 16-July 31st. </p>
                                <span>If a project was assigned in the assign cycle but wasn't finished during the release
                                    cycle, it won't come to the calculation.</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="average_project_completion_time_in_this_cycle">
                            <div class="card-title">
                                <h5>Average Project Completion Time In This Cycle</h5>
                            </div>
                            <div class="text-left">
                                <h6>The calculation for this is as below:</h6>
                                <p>Project finish date-Project award date</p>
                                <h6>Also, a project will be included here if the following conditions are met: </h6>
                                <p>A. It was assigned anytime before the current assign cycle ended i.e. if June 16-July 15
                                    is the assign cycle, it has to be assigned on or before July 15th.</p>
                                <p>B. It was finished in the current release cycle i.e. June 16-July 31st. </p>
                                <span>If a project was assigned in the assign cycle but wasn't finished during the release
                                    cycle, it won't come to the calculation.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="number_of_new_deals_added">
                            <div class="card-title">
                                <h5>Number Of New Deals Added</h5>
                            </div>
                            <div class="text-left">
                                <p>When any project from an old client was added as a complete new deal into our system,
                                    they will count here. For example, if 5 projects from old client was added in the assign
                                    cycle i.e. 16th June-15th July, the count here will be 5.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="number_Of_new_milestones_added_on_old_projects">
                            <div class="card-title">
                                <h5>Number Of New Milestones Added On Old Projects</h5>
                            </div>
                            <div class="text-left">
                                <p>Sometimes, project managers or sales people just add a milestone in an old project for
                                    upsales/cross sales. This happens especially for smaller amounts like 20-100 usd where
                                    creating a new deal won't make much sense. This field will show how many new milestones
                                    were added on older projects. For example, if 3 milestones were added under 2 old
                                    projects in the assign cycle i.e. 16th June-15th July, the count will be 3 here.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="number_of_old_projects_where_there_is_upsales_cross_sales">
                            <div class="card-title">
                                <h5>Number Of Old Projects Where There Is Upsales/Cross Sales</h5>
                            </div>
                            <div class="text-left">
                                <p>This is the number of old projects where upsale/cross sales milestones were added. For
                                    example, if 3 milestones were added under 2 old projects in the assign cycle i.e. June
                                    16th-July 15th, the count will be 3 here.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="value_of_upsale_crosssale">
                            <div class="card-title">
                                <h5>Value Of Upsale/Crosssale</h5>
                            </div>
                            <div class="text-left">
                                <p>This is the total summed up amount of upsale/cross sale items during the assign cyclei.e.
                                    June 16-July 15. This will include the complete new deals plus milestones on existing
                                    projects.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="total_cancelled_project_for_this_cycle">
                            <div class="card-title">
                                <h5>Total Cancelled Project For This Cycle</h5>
                            </div>
                            <div class="text-left">
                                <p>The number of projects that got fully canceled or partially finished in the release cycle
                                    (June 16th-July 15th) from the projects assigned in the assign cycle (June 16th-July
                                    15th).</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="total_cancelled_project_in_this_cycle">
                            <div class="card-title">
                                <h5>Total Cancelled Project In This Cycle</h5>
                            </div>
                            <div class="text-left">
                                <p>The number of projects that got fully canceled or partially finished in the release cycle
                                    (June 16th-July 15th) from the projects assigned before the end of the current assign
                                    cycle (i.e. before 15th July if the current cycle is June 16th-July 15th).</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="total_delayed_project_for_this_cycle">
                            <div class="card-title">
                                <h5>Total Delayed Project For This Cycle</h5>
                            </div>
                            <div class="text-left">
                                <p>A project will be tagged as delayed if it couldn't be completed within 15 days after it
                                    entered the system. If a project entered the system at 2.20 pm on 20th June, it will be
                                    tagged as delayed on 2.21 pm on 5th July if it's not completed by then.</p>
                                <p>The projects meeting the following conditions will be included in this list: </p>
                                <span>A. It was assigned during the current assign cycle i.e. June 16th-July 15th. </span>
                                <span>B. It got delayed tag anytime in the current release cycle i.e. June 16th-July
                                    31st.</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%"
                            id="total_delayed_project_in_this_cycle">
                            <div class="card-title">
                                <h5>Total Delayed Project In This Cycle</h5>
                            </div>
                            <div class="text-left">
                                <p>A project will be tagged as delayed if it couldn't be completed within 15 days after it
                                    entered the system. If a project entered the system at 2.20 pm on 20th June, it will be
                                    tagged as delayed on 2.21 pm on 5th July if it's not completed by then.
                                </p>
                                <p>The projects meeting the following conditions will be included in this list: </p>
                                <span>A. It was assigned before the end of the current assign cycle i.e. July 15th.</span>
                                <span>B. It got delayed tag anytime in the current release cycle i.e. June 16th-July
                                    31st.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="current">
                            <div class="card-title">
                                <h5>Current</h5>
                            </div>
                            <div class="text-left">
                                <p>The number of projects that got delayed tag in the current release cycle i.e. June
                                    16th-July 30th (They must be assigned during the current assign cycle i.e. June
                                    16th-July 15th)/The number of projects that got assigned in the current assign cycle
                                    (June 16th-July 15th). In general, here the old projects wont count.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="current_plus_old_ones">
                            <div class="card-title">
                                <h5>Current Plus Old Ones</h5>
                            </div>
                            <div class="text-left">
                                <p>The total number of projects that got delayed tag in the current release cycle i.e. June
                                    16th-July 30th/The number of projects that got assigned during the current assign cycle
                                    i.e. June 16th-July 15th+The old projects that got delayed tag during this cycles
                                    release cycle i.e. June 16th_july 15th.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="total_completed_delayed_project">
                            <div class="card-title">
                                <h5>Total Completed Delayed Project</h5>
                            </div>
                            <div class="text-left">
                                <p>Number of completed projects that got delayed tag anytime before the end of the current
                                    release cycle (June 16th-July 31st) and then got completed in the release cycle (June
                                    16th-July 31st) as well.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="caused_by_me">
                            <div class="card-title">
                                <h5>Caused By Me</h5>
                            </div>
                            <div class="text-left">
                                <p>The total number of revisions that a particular PM was held responsible from all the
                                    revisions that came in the release cycle (June 16th-July 15th) for the tasks associated
                                    with projects assigned to that PM in the assign cycle i.e. June 16th-July 15th.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="caused_by_others">
                            <div class="card-title">
                                <h5>Caused By Others</h5>
                            </div>
                            <div class="text-left">
                                <p>The total number of revisions that anyone else other than the PM was held responsible
                                    from all the revisions that came in the release cycle (June 16th-July 31st) for the
                                    tasks associated with projects assigned to that PM in the assign cycle i.e. June
                                    16th-July 15th.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="disputed">
                            <div class="card-title">
                                <h5>Disputed</h5>
                            </div>
                            <div class="text-left">
                                <p>The total number of disputed revisions from all the revisions that came in the release
                                    cycle (June 16th-July 31st) for the tasks associated with projects assigned to that PM
                                    in the assign cycle i.e. June 16th-July 15th.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="caused_by_me_in_cycle">
                            <div class="card-title">
                                <h5>Caused By Me In Cycle</h5>
                            </div>
                            <div class="text-left">
                                <p>The total number of revisions that a particular PM was held responsible from all the
                                    revisions that came in the release cycle (June 16th-July 15th) for the tasks associated
                                    with projects assigned to that PM before the end of the current assign cycle i.e. 15th
                                    July if the current assign cycle is June 16th-July 15th.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="caused_by_others_in_cycle">
                            <div class="card-title">
                                <h5>Caused By Others In Cycle</h5>
                            </div>
                            <div class="text-left">
                                <p>The total number of revisions that anyone else other than the PM was held responsible for
                                    from all the revisions that came in the release cycle (June 16th-July 15th) for the
                                    tasks associated with projects assigned to that PM before the end of the current assign
                                    cycle i.e. 15th July if the current assign cycle is June 16th-July 15th.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12">
                        <div class="card p-2" style="border: none; height: 100%" id="disputed_in_cycle" title ="disputed_in_cycle">
                            <div class="card-title">
                                <h5>Disputed In Cycle</h5>
                            </div>
                            <div class="text-left">
                                <p>The total number of disputed revisions from all the revisions that came in the release
                                    cycle (June 16th-July 31st) for the tasks associated with projects assigned to that PM
                                    before the end of the current assign cycle i.e. 15th July if the current assign cycle is
                                    June 16th-July 15th.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row my-3">
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="cancelation_rate">
                            <div class="card-title">
                                <h5>Cancelation Rate</h5>
                            </div>
                            <div class="text-left">
                                <p>Number of projects canceled in the release cycle (June 16-July 31st)/Number of projects
                                    assigned in the assign cycle (June 16-July 15).</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-2" style="border: none; height: 100%" id="avg_payment_rel_count_per_day">
                            <div class="card-title">
                                <h5>Avg. Payment Rel. Count Per Day</h5>
                            </div>
                            <div class="text-left">
                                <p>If the cycle is from 16th June-15th July and if 10 milestones for complete by 20th of
                                    June, the Avg. Payment Rel. time by 25th of June will be 10/5=2. If 90 milestones got
                                    completed from16th June-15th July, the Avg. Payment Rel. time by 15th of July will be
                                    90/30=3. Only the assign cycle will count here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="col-2" >
                <div class="content_table" >
                    <ul id="content_table">
                        <li>
                            <a class="nav-link" href="#concept_of_cycle">The concept of cycle</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#total-assigned-projects-number">Total assigned projects</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#accept-projects">Accepted projects</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#rejected-projects">Rejected projects</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#total-assigned-projects-value">Total assigned projects value</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#accept-projects-value">Accepted projects value</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#rejected-projects-value">Rejected projects value</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#released-amount-for-cycle">Released amount for Cycle</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#total-released-amount">Total released amount</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#new-client">New clients</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#existing-client">Existing clients</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#in-progress-projects-for-this-cycle-number">100% in progress projects for this cycle (Number)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#in-progress-projects-in-this-cycle-number">100% in progress projects in this cycle (Number)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#in-progress-projects-for-this-cycle-value">100% in progress projects for this cycle (value)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#in-progress-projects-in-this-cycle-value">100% in progress projects in this cycle (value)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#project-complection-rate-for-this-cycle-count">Project completion rate for this cycle(Count)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#project-complection-rate-in-this-cycle-count">Project completion rate in this cycle(Count)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#project-complection-rate-for-this-cycle-value">Project completion rate for this cycle(Value)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#project-complection-rate-in-this-cycle-value">Project completion rate in this cycle(Value)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#completed-finished-projects-for-cycle-number">Completed/Finished projects for cycle (Number)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#total-completed-finished-projects-in-this-cycle-number">Total completed/Finished projects in this cycle (Number)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#completed-finished-projects-in-this-cycle-value">Completed/Finished projects for cycle (Value)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#total-completed-finished-projects-in-cycle-value">Total completed/Finished projects in this cycle (value)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#project_completion_rate_for_this_cycle_count">Project Completion rate for this cycle (Count)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#project_completion_rate_in_this_cycle_count">Project Completion rate in this cycle (Count)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#completed-finished-projects-for-cycle">Completed/Finished projects for cycle</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#completed-finished-project-for-cycle">Project Completion rate in this cycle (Count)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#milestone_assigned_for_this_cycle_count">Milestone assigned for this cycle (Count)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#milestone_assigned_in_this_cycle_value">Milestone assigned in this cycle (Value)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#milestone-completed-for-this-cycle-count">Milestone completed for this cycle (Count)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#milestone-completed-in-this-cycle-count">Milestone completed in this cycle (count)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#milestone_released_for_this_cycle_value">Milestone Released For This Cycle (Value)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#milestone_released_in_this_cycle_value">Milestone Released In This Cycle (Value)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#milestone_completion_percentage_for_this_cycle">Milestone Completion Percentage For This Cycle (Count)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#milestone_completion_percentage_in_this_cycle">Milestone Completion Percentage In This Cycle (Count)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#milestone_completion_percentage_for_this_cycle_value">Milestone Completion Percentage For This Cycle (Value)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#milestone_completion_percentage_in_this_cycle_value">Milestone Completion Percentage In This Cycle (Value)</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#task_assigned_for_this_cycle">Task Assigned For This Cycle</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#tasks_completed_for_this_cycle">Tasks Completed For This Cycle</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#tasks_completed_in_this_cycle">Tasks Completed In This Cycle</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#task_completion_rate_for_cycle">Task completion rate for this cycle</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#task_completion_rate_in_this_cycle">Task completion rate in this cycle </a>
                        </li>
                        <li>
                            <a class="nav-link" href="#average_project_completion_time_for_this_cycle">Average Project Completion Time For This Cycle</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#average_project_completion_time_in_this_cycle">Average Project Completion Time In This Cycle</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#number_of_new_deals_added">Number Of New Deals Added</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#number_Of_new_milestones_added_on_old_projects">Number Of New Milestones Added On Old Projects</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#number_of_old_projects_where_there_is_upsales_cross_sales">Number Of Old Projects Where There Is Upsales/Cross Sales</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#value_of_upsale_crosssale">Value Of Upsale/Crosssale</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#total_cancelled_project_for_this_cycle">Total Cancelled Project For This Cycle</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#total_cancelled_project_in_this_cycle">Total Cancelled Project In This Cycle</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#total_delayed_project_for_this_cycle">Total Delayed Project For This Cycle</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#total_delayed_project_in_this_cycle">Total Delayed Project In This Cycle</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#current">Current</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#current_plus_old_ones">Current Plus Old Ones</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#total_completed_delayed_project">Total Completed Delayed Project</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#caused_by_me">Caused By Me</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#caused_by_others">Caused By Others</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#disputed_in_cycle" title="disputed_in_cycle">Disputed</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#caused_by_me_in_cycle">Caused By Me In Cycle</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#caused_by_others_in_cycle">Caused By Others In Cycle</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#disputed_in_cycle">Disputed In Cycle</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#cancelation_rate">Cancelation Rate</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#avg_payment_rel_count_per_day">Avg. Payment Rel. Count Per Day</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script>
        var body = document.getElementById('body');
        body.setAttribute("data-spy", "scroll");
        body.setAttribute("data-target", "#content_table");

        var url = window.location;
        var hash = url.hash;
        if(hash){
            var target = document.querySelector(hash);
            target.style.border = '1px solid rgb(255 0 0 / 55%)';
            target.style.boxShadow = '0 0 20px rgb(236 71 19 / 25%)';
            target.style.scrollMarginTop = '100px';

            // target link
            const targetLink = document.querySelector(`a[href="${hash}"]`)
            console.log(targetLink)

            targetLink.style.color = '#49D100'
        }
    </script>
@endpush
