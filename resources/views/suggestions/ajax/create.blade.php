@php
$manageTypePermission = user()->permission('manage_ticket_type');
$manageAgentPermission = user()->permission('manage_ticket_agent');
$manageChannelPermission = user()->permission('manage_ticket_channel');
@endphp

<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">
<link rel="stylesheet" href="{{ asset('vendor/css/tagify.css') }}">

<div class="row">

    <div class="col-sm-12">
      @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
        <form id="save-ticket-form" method="post" action="{{route('suggestions.store')}}">

          @csrf

            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('Add New Suggestion')</h4>
                <div class="row p-20">




                            <div class="col-md-4" id="employee-requester">

                                <x-forms.label class="my-3" fieldId="requestuser_id" :fieldLabel="__('modules.tickets.requesterName')"
                                    fieldRequired="true">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <select class="form-control select-picker" name="user_id" id="user_id"
                                        data-live-search="true" data-size="8" disabled="true">
                                        <option value="">--</option>
                                        <?php
                                        $employee = App\Models\User::where('id',Auth::id())->first();
                                         ?>

                                        <option selected data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $employee->image_url }}' ></div> {{ ucfirst($employee->name) }} {{ (user() && user()->id == $employee->id) ? '<span class="ml-2 badge badge-secondary">' . __('app.itsYou') . '</span>' : '' }}" value="{{ $employee->id }}">{{ mb_ucwords($employee->name) }}
                                        </option>

                                    </select>
                                </x-forms.input-group>

                            </div>


                            <input type="hidden" name="user_id" value="{{Auth::user()->id}}">

                            <div class="col-md-8 col-lg-8">
                                <x-forms.label class="my-3" fieldRequired="true" fieldId="suggestion_type" :fieldLabel="__('Type of Suggestions')">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <select class="form-control select-picker" name="suggestion_type" id="suggestion_type"
                                        data-live-search="true" data-size="8">
                                        <option value="">--</option>

                                        <option value="Design Related Suggestion">Design Related Suggestion</option>
                                        <option value="Functional/Logical Suggestion">Functional/Logical Suggestion</option>

                                        <option value="Others">Other Suggestions</option>

                                    </select>
                                {{--   @if ($manageTypePermission == 'all')
                                        <x-slot name="append">
                                            <button id="add-type" type="button"
                                                class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                        </x-slot>
                                    @endif --}}
                                </x-forms.input-group>
                            </div>




                    <div class="col-md-6 mt-1">
                        <x-forms.text :fieldLabel="__('A Full Page Screenshot Link')" fieldName="screenshot" fieldRequired="true" fieldId="screenshot" />
                    </div>
                    <div class="col-md-6 mt-1">
                        <x-forms.text :fieldLabel="__('Page Link')" fieldName="page_link" fieldRequired="true" fieldId="page_link" />
                    </div>
                    <div class="col-md-12 mt-1">
                        <x-forms.text :fieldLabel="__('Suggestion Subject')" fieldName="subject" fieldRequired="true" fieldId="subject" />
                    </div>


                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="description" :fieldLabel="__('Share Your Suggestion')" fieldRequired="true">
                            </x-forms.label>
                            <div id="description"></div>
                            <textarea name="description" id="description-text" class="d-none"></textarea>
                        </div>

                    </div>
                </div>


                <div class="row px-4">
                    <div class="col-md-12">
                        <x-forms.file-multiple class="mr-0 mr-lg-2 mr-md-2 upload-section d-none" :fieldLabel="__('app.add') . ' ' . __('app.file')"
                            fieldName="file" fieldId="task-file-upload-dropzone" />
                        <input type="hidden" name="image_url" id="image_url">
                    </div>

                </div>





                <div class="w-100 border-top-grey d-block d-lg-flex d-md-flex justify-content-start px-4 py-3 ml-3">
      <button type="submit" class="btn-primary rounded f-14 p-2 mr-3" >
              <svg class="svg-inline--fa fa-check fa-w-16 mr-1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg><!-- <i class="fa fa-check mr-1"></i> Font Awesome fontawesome.com -->
          Save
  </button>




                      <a href="/account/suggestions" class="btn-cancel rounded f-14 p-2 border-0">
                          Cancel
  </a>
  </div>

            </div>
        </form>

    </div>
</div>


<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script src="{{ asset('vendor/jquery/tagify.min.js') }}"></script>
<script>
    $(document).ready(function() {




        var input = document.querySelector('input[name=tags]'),
            // init Tagify script on the above inputs
            tagify = new Tagify(input);

        quillImageLoad('#description');

        $("input[name=requester_type]").click(function() {
            $('#client-requester, #employee-requester').toggleClass('d-none');
        });

        /* open add agent modal */

        /* open add agent modal */

        /* open add agent modal */
        $('body').on('click', '#add-type', function() {
            var url = "{{ route('ticketTypes.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('#save-ticket-form').click(function() {
            var note = document.getElementById('description').children[0].innerHTML;
            document.getElementById('description-text').value = note;




        });














        init(RIGHT_MODAL);
    });
</script>
