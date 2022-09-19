@php
$addProjectCategoryPermission = user()->permission('manage_project_category');
@endphp

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-project-data-form" method="PUT">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('modules.projects.projectInfo')</h4>
                <div class="row p-20">
                    <div class="col-md-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.projects.projectName')"
                            fieldName="project_name" fieldRequired="true" fieldId="project_name"
                            :fieldValue="$template->project_name" :fieldPlaceholder="__('placeholders.project')" />
                    </div>

                    <div class="col-md-6">
                        <div class="form-group my-3 mr-0 mr-lg-2 mr-md-2">
                            <x-forms.label fieldId="category_id"
                                :fieldLabel="__('modules.projects.projectCategory')">
                            </x-forms.label>
                            <x-forms.input-group>
                                <select class="form-control select-picker" name="category_id" id="project_category_id"
                                    data-live-search="true">
                                    <option value="">--</option>
                                    @foreach ($categories as $category)
                                        <option @if ($template->category_id == $category->id) selected @endif value="{{ $category->id }}">
                                            {{ mb_ucwords($category->category_name) }}</option>
                                    @endforeach
                                </select>

                                @if ($addProjectCategoryPermission == 'all' || $addProjectCategoryPermission == 'added')
                                    <x-slot name="append">
                                        <button id="addProjectCategory" type="button"
                                            class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                    </x-slot>
                                @endif
                            </x-forms.input-group>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="form-group">
                            <div class="d-flex mt-3">
                                <x-forms.checkbox fieldId="manual_timelog"
                                                  :fieldLabel="__('modules.projects.manualTimelog')" :checked="($template->manual_timelog
                                    == 'enable') ? 'true' : 'false'" fieldName="manual_timelog" />
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 col-lg-4 d-none" id="clientNotification">
                        <div class="form-group">
                            <div class="d-flex mt-3">
                                <x-forms.checkbox fieldId="client_task_notification" :checked="($template->allow_client_notification
                                == 'enable') ? 'true' : 'false'"
                                                  :fieldLabel="__('modules.projects.clientTaskNotification')"
                                                  fieldName="client_task_notification" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="project_summary"
                                :fieldLabel="__('modules.projects.projectSummary')">
                            </x-forms.label>
                            <div id="project_summary">{!! $template->project_summary !!}</div>
                            <textarea name="project_summary" id="project_summary-text"
                                class="d-none">{!! $template->project_summary !!}</textarea>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="notes" :fieldLabel="__('modules.projects.note')">
                            </x-forms.label>
                            <div id="notes">{!! $template->notes !!}</div>
                            <textarea name="notes" id="notes-text" class="d-none">{!! $template->notes !!}</textarea>
                        </div>
                    </div>
                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-project-form" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('project-template.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>

            </div>
        </x-form>

    </div>
</div>

<script>
    $(document).ready(function() {
        quillImageLoad('#project_summary');
        quillImageLoad('#notes');

        $('#save-project-form').click(function() {
            var note = document.getElementById('project_summary').children[0].innerHTML;
            document.getElementById('project_summary-text').value = note;

            var note = document.getElementById('notes').children[0].innerHTML;
            document.getElementById('notes-text').value = note;

            const url = "{{ route('project-template.update', $template->id) }}";

            $.easyAjax({
                url: url,
                container: '#save-project-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-project-form",
                data: $('#save-project-data-form').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        window.location.href = response.redirectUrl;
                    }
                }
            });
        });

        $('#addProjectCategory').click(function() {
            const url = "{{ route('projectCategory.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        init(RIGHT_MODAL);
    });
</script>
