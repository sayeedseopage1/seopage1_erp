<div class="row">
    <div class="col-sm-12">
        <x-form id="save-notice-data-form" method="PUT">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('modules.notices.updateNotice')</h4>
                <div class="row p-20">
                    <div class="col-lg-12">
                        <div class="row">

                            <div class="col-lg-4 col-md-6">
                                <x-forms.text fieldId="heading" :fieldLabel="__('modules.notices.noticeHeading')"
                                    fieldName="heading" fieldRequired="true" :fieldPlaceholder="__('placeholders.name')"
                                    :fieldValue="$notice->heading">
                                </x-forms.text>
                            </div>

                            <div class="col-lg-4 col-md-6">
                                <div class="form-group my-3">
                                    <label class="f-14 text-dark-grey mb-12 w-100" for="usr">Notify</label>
                                    <div class="d-flex">
                                        <x-forms.radio fieldId="toEmployee"
                                            :fieldLabel="__('modules.notices.toEmployee')" fieldName="to"
                                            fieldValue="employee" :checked="$notice->to == 'employee'">
                                        </x-forms.radio>
                                        <x-forms.radio fieldId="toClient" :fieldLabel="__('modules.notices.toClients')"
                                            fieldValue="client" fieldName="to" :checked="$notice->to == 'client'">
                                        </x-forms.radio>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 department @if ($notice->to == 'client') d-none @endif">
                                <x-forms.select fieldId="team_id" :fieldLabel="__('app.department')" fieldName="team_id"
                                    search="true">
                                    <option value=""> -- </option>
                                    @foreach ($teams as $team)
                                        <option
                                            {{ isset($notice->department_id) && $notice->department_id == $team->id ? 'selected' : '' }}
                                            value="{{ $team->id }}">{{ mb_ucwords($team->team_name) }}</option>
                                    @endforeach
                                </x-forms.select>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group my-3">
                                    <x-forms.label class="my-3" fieldId="description-text"
                                        :fieldLabel="__('modules.notices.noticeDetails')">
                                    </x-forms.label>
                                    <div id="description"> {!! $notice->description !!} </div>
                                    <textarea name="description" id="description-text" class="d-none"></textarea>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-notice" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('notices.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>
            </div>
        </x-form>

    </div>
</div>

<script>
    $(document).ready(function() {

        quillImageLoad('#description');

        // show/hide project detail
        $(document).on('change', 'input[type=radio][name=to]', function() {
            $('.department').toggleClass('d-none');
        });

        $('#save-notice').click(function() {
            const url = "{{ route('notices.update', [$notice->id]) }}";

            var note = document.getElementById('description').children[0].innerHTML;
            document.getElementById('description-text').value = note;

            $.easyAjax({
                url: url,
                container: '#save-notice-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-notice",
                file: true,
                data: $('#save-notice-data-form').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        if ($(MODAL_XL).hasClass('show')) {
                            $(MODAL_XL).hide();
                            window.location.reload();
                        } else {
                            window.location.href = response.redirectUrl;
                        }
                    }
                }
            });
        });

        init(RIGHT_MODAL);
    });
</script>
