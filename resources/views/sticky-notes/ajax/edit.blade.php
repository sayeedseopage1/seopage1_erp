<div class="row">
    <div class="col-sm-12">
        <x-form id="save-notice-data-form" method="PUT">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.note') @lang('app.details')</h4>

                <div class="row p-20">
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <x-forms.select fieldName="colour" fieldId="colour" :fieldLabel="__('modules.sticky.colors')">
                            <option @if ($stickyNote->colour == 'red') selected @endif data-content="<i class='fa fa-circle mr-2 text-red'></i>" value="red">
                            </option>
                            <option @if ($stickyNote->colour == 'green') selected @endif data-content="<i class='fa fa-circle mr-2 text-dark-green'></i>"
                                value="green">
                            </option>
                            <option @if ($stickyNote->colour == 'blue') selected @endif data-content="<i class='fa fa-circle mr-2 text-blue'></i>"
                                value="blue">
                            </option>
                            <option @if ($stickyNote->colour == 'yellow') selected @endif data-content="<i class='fa fa-circle mr-2 text-yellow'></i>"
                                value="yellow">
                            </option>
                            <option @if ($stickyNote->colour == 'purple') selected @endif data-content="<i class='fa fa-circle mr-2 text-dark-grey'></i>"
                                value="purple">
                            </option>
                        </x-forms.select>
                    </div>

                    <div class="col-lg-12">
                        <x-forms.textarea :fieldLabel="__('app.note')" fieldName="notetext" fieldId="notetext"
                            :fieldValue="$stickyNote->note_text" />
                    </div>

                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-notice" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('sticky-notes.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>
            </div>
        </x-form>

    </div>
</div>

<script>
    $(document).ready(function() {

        $('#save-notice').click(function() {
            const url = "{{ route('sticky-notes.update', $stickyNote->id) }}";

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
                        window.location.href = response.redirectUrl;
                    }
                }
            });
        });

        init(RIGHT_MODAL);
    });
</script>
