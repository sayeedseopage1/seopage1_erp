<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">
        @lang('modules.authorize.details')
    </h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
    <div class="modal-body">
        <div class="portlet-body">
            <x-form id="authorizeDetails" method="POST" class="ajax-form" action="{{ route('authorize_public', [$id]) }}">
                <input type="hidden" name="type" value="{{ $type }}">
                <div class="form-body">
                    <div class="row" >
                        <div class="col-lg-12 col-md-12">
                            <x-forms.text :fieldLabel="__('modules.authorize.cardNumber')" fieldName="card_number"
                                fieldId="card_number" :fieldPlaceholder="__('modules.authorize.cardNumber')" fieldValue="" :fieldRequired="true" />
                        </div>
                        @php
                            $months = array(1 => 'Jan', 2 => 'Feb', 3 => 'Mar', 4 => 'Apr', 5 => 'May', 6 => 'Jun', 7 => 'Jul', 8 => 'Aug', 9 => 'Sep', 10 => 'Oct', 11 => 'Nov', 12 => 'Dec');
                        @endphp
                        <div class="col-lg-4 col-md-4">
                            <x-forms.select fieldId="expiration_month" :fieldLabel="__('modules.authorize.expMonth')" fieldName="expiration_month" fieldRequired="true">
                                @foreach($months as $key => $month)
                                    <option value="{{ $key }}">{{ $month }}</option>
                                @endforeach
                            </x-forms.select>
                        </div>
                        <div class="col-lg-4 col-md-4">
                                <x-forms.select fieldId="expiration_year" :fieldLabel="__('modules.authorize.expYear')" fieldName="expiration_year" fieldRequired="true">
                                    @for ($i = 0; $i < 15; $i++)
                                        <option value="{{ date('Y') + $i }}">{{ date('Y') + $i }}</option>
                                    @endfor
                                </x-forms.select>
                        </div>
                        <div class="col-lg-4 col-md-4">
                            <x-forms.number :fieldLabel="__('modules.authorize.cvv')" fieldName="cvv"
                                fieldId="cvv" :fieldPlaceholder="__('modules.authorize.cvv')" fieldValue="" :fieldRequired="true" />
                        </div>
                    </div>
                </div>
            </x-form>
        </div>
    </div>
    <div class="modal-footer">
        <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
        <x-forms.button-primary id="save-authorize-detail" icon="check">@lang('app.save')</x-forms.button-primary>
    </div>


<script>

    $(".select-picker").selectpicker();

    $('#save-authorize-detail').click( function () {

        var url = "{{ route('authorize_public', $id)}}";
        $.easyAjax({
            container: '#authorizeDetails',
            buttonSelector: "#save-authorize-detail",
            disableButton: true,
            blockUI: true,
            type:'POST',
            url:url,
            data: $('#authorizeDetails').serialize(),
            success: function (response) {
                if(response.status == 'success'){
                    window.location.reload();
                }
            }
        });
    });
</script>
