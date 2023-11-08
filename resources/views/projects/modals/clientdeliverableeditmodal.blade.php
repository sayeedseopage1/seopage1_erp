@php
    $milestones= App\Models\ProjectMilestone::where('project_id',$project->id)->get();
@endphp
<div class="modal fade" id="deliverableseditModal{{$deliverable->id}}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Deliverable</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>

            <form class="" id="update-form" action="{{route('update-project-deliverable')}}" method="post">
                @csrf
                <input type="hidden" name="id" value="{{$deliverable->id}}">
                <input type="hidden" name="authrization_after_edit" value="true">
                <div class="modal-body">
                    @if(\Auth::user()->role_id == 1)
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Deliverable Type<span style="color:red;">*</span></label>
                                <select class="form-control height-35 f-14" name="deliverable_type">
                                    <option selected value="{{$deliverable->deliverable_type}}">{{$deliverable->deliverable_type}}</option>
                                    <option value="Graphics Design">Graphics Design</option>
                                    <option value="Minor revisions and finalizing the website" >Minor revisions and finalizing a website</option>
                                    <option value="Website initial setup (Theme and plugin installation)">Website initial setup (Theme and plugin installation)</option>
                                    <option value="UI/UX Design">UI/UX Design</option>
                                    <option value="Main Page Development">Main Page Development</option>
                                    <option value="Secondary Page Development">Secondary Page Development</option>
                                    <option value="Content Creation">Content Creation</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Domain/Hosting">Domain/Hosting</option>
                                    <option value="Products">Products</option>
                                    <option value="Collection">Collection</option>
                                    <option value="Website design change ">Website design change </option>
                                    <option value="Speed optimization">Speed optimization</option>
                                    <option value="Fixing Issues/Bugs">Fixing Issues/Bugs</option>
                                    <option value="Fixing Responsiveness/Making something responsive">Fixing Responsiveness/Making something responsive</option>


                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">

                                <label for="exampleFormControlTextarea1">Milestone<span style="color:red;">*</span></label>
                                <select class="form-control height-35 f-14" name="milestone_id">
                                    @if($deliverable->milestone_id != null)
                                        <option selected value="{{$deliverable->milestone_id}}">{{$deliverable->milestone->milestone_title}}</option>
                                        @foreach($milestones as $milestone)
                                            <option value="{{$milestone->id}}">{{$milestone->milestone_title}}</option>
                                        @endforeach
                                    @else
                                        @foreach($milestones as $milestone)
                                            <option value="{{$milestone->id}}">{{$milestone->milestone_title}}</option>
                                        @endforeach
                                    @endif
                                </select>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Deliverable Title <span style="color:red;">*</span></label>
                                <input type="text" name="title" value="{{$deliverable->title}}" class="form-control height-35 f-14 @error('title') is-invalid @enderror" id="exampleFormControlInput1">
                            </div>
                            @error('title')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Estimation Time (In Hours) <span style="color:red;">*</span></label>
                                <input type="text" name="estimation_time" value="{{$deliverable->estimation_time}}" class="form-control height-35 f-14 @error('estimation_time') is-invalid @enderror" id="exampleFormControlInput1" >
                            </div>
                            @error('estimation_time')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="col-md-4 mt-3">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Quantity <span style="color:red;">*</span></label>
                                <input type="text" name="quantity" value="{{$deliverable->quantity}}" class="form-control height-35 f-14 mt-1 @error('quantity') is-invalid @enderror" id="exampleFormControlInput1">
                            </div>
                            @error('quantity')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="col-md-4">
                            <div class="form-group my-3">
                                <label class="f-14 text-dark-grey mb-12" data-label="true" for="from146">From
                                    <sup class="f-14 mr-1">*</sup>

                                </label>

                                <input type="text" class="form-control date-picker height-35 f-14 @error('from') is-invalid @enderror" placeholder="" value="{{$deliverable->from}}" id="from{{$deliverable->id}}" name="from"  autocomplete="off">

                            </div>
                            @error('from')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        @if ($deliverable->to)
                        <div class="col-md-4">
                            <div class="form-group my-3">
                                <label class="f-14 text-dark-grey mb-12" data-label="true" for="from146">To
                                    <sup class="f-14 mr-1">*</sup>

                                </label>

                                <input type="text" class="form-control date-picker height-35 f-14 @error('to') is-invalid @enderror" placeholder="" value="{{$deliverable->to}}" name="to" id="to{{$deliverable->id}}"  autocomplete="off">

                            </div>
                            @error('to')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        @endif
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Description</label>
                                <textarea  name="description" value="{{$deliverable->description}}"  class="ckeditor form-control" rows="3" >{{$deliverable->description}}</textarea>
                            </div>
                        </div>
                    </div>
                    @else
                    <div class="row">
                        @php
                            $data = \App\models\DelivarableColumnEdit::where([
                                'delivarable_id' => $deliverable->id,
                                'column_name' => 'type',
                            ])->latest()->first();
                        @endphp
                        @if($data && $data->status == '0' && \Auth::user()->role_id != 1 || $project->authorization_status == 'pending')
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Deliverable Type<span style="color:red;">*</span></label>
                                <select class="form-control height-35 f-14" name="deliverable_type">
                                    <option selected value="{{$deliverable->deliverable_type}}">{{$deliverable->deliverable_type}}</option>
                                    <option value="Graphics Design">Graphics Design</option>
                                    <option value="UI/UX Design">UI/UX Design</option>
                                    <option value="Main Page Development">Main Page Development</option>
                                    <option value="Secondary Page Development">Secondary Page Development</option>
                                    <option value="Content Creation">Content Creation</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Domain/Hosting">Domain/Hosting</option>
                                    <option value="Products">Products</option>
                                    <option value="Collection">Collection</option>
                                    <option value="Website design change ">Website design change </option>
                                    <option value="Speed optimization">Speed optimization</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                        @endif
                        @php
                            $data = \App\models\DelivarableColumnEdit::where([
                                'delivarable_id' => $deliverable->id,
                                'column_name' => 'milestone',
                            ])->latest()->first();
                        @endphp
                        @if($data && $data->status == '0' && \Auth::user()->role_id != 1 || $project->authorization_status == 'pending')
                        <div class="col-md-6">
                            <div class="form-group">

                                <label for="exampleFormControlTextarea1">Milestone<span style="color:red;">*</span></label>
                                <select class="form-control height-35 f-14" name="milestone_id">
                                    @if($deliverable->milestone_id != null)
                                        <option selected value="{{$deliverable->milestone_id}}">{{$deliverable->milestone->milestone_title}}</option>
                                        @foreach($milestones as $milestone)
                                            <option value="{{$milestone->id}}">{{$milestone->milestone_title}}</option>
                                        @endforeach
                                    @else
                                        @foreach($milestones as $milestone)
                                            <option value="{{$milestone->id}}">{{$milestone->milestone_title}}</option>
                                        @endforeach
                                    @endif
                                </select>
                            </div>
                        </div>
                        @endif
                        @php
                            $data = \App\models\DelivarableColumnEdit::where([
                                'delivarable_id' => $deliverable->id,
                                'column_name' => 'title',
                            ])->latest()->first();
                        @endphp
                        @if($data && $data->status == '0' && \Auth::user()->role_id != 1 || $project->authorization_status == 'pending')
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Deliverable Title <span style="color:red;">*</span></label>
                                <input type="text" name="title" value="{{$deliverable->title}}" class="form-control height-35 f-14 @error('title') is-invalid @enderror" id="exampleFormControlInput1">
                            </div>
                            @error('title')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        @endif
                        @php
                            $data = \App\models\DelivarableColumnEdit::where([
                                'delivarable_id' => $deliverable->id,
                                'column_name' => 'estimation_time',
                            ])->latest()->first();
                        @endphp
                        @if($data && $data->status == '0' && \Auth::user()->role_id != 1 || $project->authorization_status == 'pending')
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Estimation Time (In Hours) <span style="color:red;">*</span></label>
                                <input type="text" name="estimation_time" value="{{$deliverable->estimation_time}}" class="form-control height-35 f-14 @error('estimation_time') is-invalid @enderror" id="exampleFormControlInput1" >
                            </div>
                            @error('estimation_time')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        @endif
                        @php
                            $data = \App\models\DelivarableColumnEdit::where([
                                'delivarable_id' => $deliverable->id,
                                'column_name' => 'quantity',
                            ])->latest()->first();
                        @endphp
                        @if($data && $data->status == '0' && \Auth::user()->role_id != 1 || $project->authorization_status == 'pending')
                        <div class="col-md-4 mt-3">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Quantity <span style="color:red;">*</span></label>
                                <input type="text" name="quantity" value="{{$deliverable->quantity}}" class="form-control height-35 f-14 mt-1 @error('quantity') is-invalid @enderror" id="exampleFormControlInput1">
                            </div>
                            @error('quantity')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        @endif
                        @php
                            $data = \App\models\DelivarableColumnEdit::where([
                                'delivarable_id' => $deliverable->id,
                                'column_name' => 'estimation_completed_date',
                            ])->latest()->first();
                        @endphp
                        @if($data && $data->status == '0' && \Auth::user()->role_id != 1 || $project->authorization_status == 'pending')
                        <div class="col-md-4">
                            <div class="form-group my-3">
                                <label class="f-14 text-dark-grey mb-12" data-label="true" for="from146">From
                                    <sup class="f-14 mr-1">*</sup>

                                </label>

                                <input type="text" class="form-control date-picker height-35 f-14 @error('from') is-invalid @enderror" placeholder="" value="{{$deliverable->from}}" id="from{{$deliverable->id}}" name="from"  autocomplete="off">

                            </div>
                            @error('from')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="col-md-4">
                            <div class="form-group my-3">
                                <label class="f-14 text-dark-grey mb-12" data-label="true" for="from146">To
                                    <sup class="f-14 mr-1">*</sup>

                                </label>

                                <input type="text" class="form-control date-picker height-35 f-14 @error('to') is-invalid @enderror" placeholder="" value="{{$deliverable->to}}" name="to" id="to{{$deliverable->id}}"  autocomplete="off">

                            </div>
                            @error('to')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        @endif
                        @php
                            $data = \App\models\DelivarableColumnEdit::where([
                                'delivarable_id' => $deliverable->id,
                                'column_name' => 'description',
                            ])->latest()->first();
                        @endphp
                        @if($data && $data->status == '0' && \Auth::user()->role_id != 1 || $project->authorization_status == 'pending')
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Description</label>
                                <textarea  name="description" value="{{$deliverable->description}}"  class="ckeditor form-control" rows="3" >{{$deliverable->description}}</textarea>
                            </div>
                        </div>
                        @endif
                    </div>
                    @endif
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit"  class="btn btn-primary" >Update Deliverable</button>
                </div>
            </form>

        </div>
    </div>
</div>
<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script>
    $(document).ready(function() {

        if ($('.custom-date-picker').length > 0) {
            datepicker('.custom-date-picker', {
                position: 'bl',
                ...datepickerConfig
            });
        }
        const dp4 = datepicker('#from{{$deliverable->id}}', {
            position: 'bl',

            onSelect: (instance, date) => {
                dp5.setMin(date);
            },
            ...datepickerConfig
        });
        const dp5 = datepicker('#to{{$deliverable->id}}', {
            position: 'bl',

            onSelect: (instance, date) => {
                dp4.setMax(date);
            },
            ...datepickerConfig
        });

    });


</script>




