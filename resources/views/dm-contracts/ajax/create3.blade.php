@php
$manageContractTypePermission = user()->permission('manage_contract_type');
$addClientPermission = user()->permission('add_clients');
@endphp

<div class="row">
    <div class="col-sm-12">
        <form action="{{route('deal-store')}}" method="post">
          @csrf
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                  Add Deal</h4>
                <input type="hidden" name="template_id" value="{{ $contractTemplate->id ?? '' }}">

                <div class="row p-20">

                    <div class="col-md-12">

                        <x-forms.text fieldId="client_username" :fieldLabel="__('Client Username')" fieldName="client_username"
                            :fieldValue="($contractTemplate ? $contractTemplate->client_username : '')"></x-forms.text>
                    </div>

                    <div class="col-md-12">
                        <x-forms.text fieldId="platform" :fieldLabel="__('Platform')" fieldName="platform"
                            :fieldValue="($contractTemplate ? $contractTemplate->platform : '')" ></x-forms.text>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="thread" :fieldLabel="__('Message thread link of the awarded project')">
                            </x-forms.label>
                            <div id="thread">{!! $contractTemplate ? $contractTemplate->thread : '' !!}</div>
                            <textarea name="thread" id="thread-text" class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="description" :fieldLabel="__('Write the what in 2-8 words here (Examples: Website redesign, Shopify website migration to Wix, Creating a 5 page business website in WordPress, Shopify website creation, etc.)')">
                            </x-forms.label>
                            <div id="description">{!! $contractTemplate ? $contractTemplate->contract_detail : '' !!}</div>
                            <textarea name="contract_detail" id="description-text" class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="elaborate" :fieldLabel="__('Elaborate the What 3-4 lines here (The client needs a 5 page static WordPress website for his new design agency. It should include home, about, his services in one page, blog, and contact. The look and feel should be better than the references.)')">
                            </x-forms.label>
                            <div id="elaborate">{!! $contractTemplate ? $contractTemplate->elaborate : '' !!}</div>
                            <textarea name="elaborate" id="elaborate-text" class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="reference" :fieldLabel="__('Reference websites and what the references are for (Ex: ABC.com is for the color scheme.
XYZ.com is for section layouts
DEF.com is for header & footer styling.
However, none of these can be copied)')">
                            </x-forms.label>
                            <div id="reference">{!! $contractTemplate ? $contractTemplate->reference : '' !!}</div>
                            <textarea name="reference" id="reference-text" class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="particular_focus" :fieldLabel="__('Any particular focus/concern of the client (Ex: 1. The client is very concerned about the final look & feel so needs to be careful with the design 2. The client is very concerned if the booking functionality will work the way he wants.)
')">
                            </x-forms.label>
                            <div id="particular_focus">{!! $contractTemplate ? $contractTemplate->particular_focus : '' !!}</div>
                            <textarea name="particular_focus" id="particular_focus-text" class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="required_login" :fieldLabel="__('Required logins (Whichever of these are applicable: Wordpress, FTP, Cpanel, shopify, Domain register)')">
                            </x-forms.label>
                            <div id="required_login">{!! $contractTemplate ? $contractTemplate->required_login : '' !!}</div>
                            <textarea name="required_login" id="required_login-text" class="d-none"></textarea>
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-3">
                        <x-forms.datepicker fieldId="deadline" fieldRequired="true"
                            :fieldLabel="__('Deadline')" fieldName="deadline"
                            :fieldValue="($contract ? $contract->deadline->timezone(global_setting()->timezone)->format(global_setting()->date_format) : '')"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>
                    <div class="col-md-6 col-lg-3">

                    </div>
                    <div class="col-md-6 col-lg-3">

                    </div>

                    <div class="col-md-12">
                        <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('If there is any cross-departmental work involved in this project (Example: SEO, Content writing, design, google ads, social media marketing, email marketing & anything else that is not explicitly included in web development)')" fieldName="cross"
                            fieldId="cross" :fieldPlaceholder="__('Enter Details')">
                            {{ $contract ? $contract->cross : '' }}
                        </x-forms.textarea>
                    </div>
                    <div class="col-md-12">
                        <x-forms.email fieldId="client_email" :fieldLabel="__('Client Email')"
                            fieldName="client_email" :fieldPlaceholder="__('placeholders.email')">
                        </x-forms.email>
                    </div>









                    <!-- CURRENCY END -->

                </div>


                <div class="row p-20">

                </div>

                <x-form-actions>
                    <button class="btn btn-primary" type="submit">Submit</button>
                    <x-forms.button-cancel :link="route('contracts.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
              </form>
            </div>
        </x-form>

    </div>
</div>


<script>
    $(document).ready(function() {
        const dp1 = datepicker('#deadline', {
            position: 'bl',
            onSelect: (instance, date) => {
                if (typeof dp2.dateSelected !== 'undefined' && dp2.dateSelected.getTime() < date
                    .getTime()) {
                    dp2.setDate(date, true)
                }
                if (typeof dp2.dateSelected === 'undefined') {
                    dp2.setDate(date, true)
                }
                dp2.setMin(date);
            },
            ...datepickerConfig
        });

        // const dp2 = datepicker('#end_date', {
        //     position: 'bl',
        //     onSelect: (instance, date) => {
        //         dp1.setMax(date);
        //     },
        //     ...datepickerConfig
        // });



        $('#save-contract-form').click(function() {
            var note = document.getElementById('description').children[0].innerHTML;
            document.getElementById('description-text').value = note;

            const url = "{{ route('contracts.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-contract-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-contract-form",
                file: true,
                data: $('#save-contract-data-form').serialize(),
                redirect: true
            })
        });
        quillImageLoad('#description');
        $('#save-contract-form').click(function() {
            var note = document.getElementById('thread').children[0].innerHTML;
            document.getElementById('thread-text').value = note;

            const url = "{{ route('contracts.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-contract-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-contract-form",
                file: true,
                data: $('#save-contract-data-form').serialize(),
                redirect: true
            })
        });
        quillImageLoad('#thread');
        $('#save-contract-form').click(function() {
            var note = document.getElementById('elaborate').children[0].innerHTML;
            document.getElementById('elaborate-text').value = note;

            const url = "{{ route('contracts.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-contract-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-contract-form",
                file: true,
                data: $('#save-contract-data-form').serialize(),
                redirect: true
            })
        });
        quillImageLoad('#elaborate');
        $('#save-contract-form').click(function() {
            var note = document.getElementById('reference').children[0].innerHTML;
            document.getElementById('reference-text').value = note;

            const url = "{{ route('contracts.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-contract-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-contract-form",
                file: true,
                data: $('#save-contract-data-form').serialize(),
                redirect: true
            })
        });
        quillImageLoad('#reference');
        $('#save-contract-form').click(function() {
            var note = document.getElementById('particular_focus').children[0].innerHTML;
            document.getElementById('particular_focus-text').value = note;

            const url = "{{ route('contracts.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-contract-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-contract-form",
                file: true,
                data: $('#save-contract-data-form').serialize(),
                redirect: true
            })
        });
        quillImageLoad('#particular_focus');
        $('#save-contract-form').click(function() {
            var note = document.getElementById('required_login').children[0].innerHTML;
            document.getElementById('required_login-text').value = note;

            const url = "{{ route('contracts.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-contract-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-contract-form",
                file: true,
                data: $('#save-contract-data-form').serialize(),
                redirect: true
            })
        });
        quillImageLoad('#required_login');
        $('#save-contract-form').click(function() {
            var note = document.getElementById('logo').children[0].innerHTML;
            document.getElementById('logo-text').value = note;

            const url = "{{ route('contracts.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-contract-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-contract-form",
                file: true,
                data: $('#save-contract-data-form').serialize(),
                redirect: true
            })
        });
        quillImageLoad('#logo');





        $('#createContractType').click(function() {
            const url = "{{ route('contractTypes.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });



        init(RIGHT_MODAL);
    });
</script>
