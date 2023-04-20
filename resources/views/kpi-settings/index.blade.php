@extends('layouts.app')

@section('content')
    <!-- SETTINGS START -->
    <style>
        .settings-box {
	
	margin-left: 0px;
}
    </style>
    

        <x-setting-card>
            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <h2 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                        @lang($pageTitle)</h2>
                </div>
            </x-slot>
            
            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
                <h6 class="text-center">Point distribution for won deal</h6>
                <br>
                <form id="save-kpi-settings" >
                    
                    <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">The bidder will get:</label>
                      <div class="col-sm-10">
                        <input class="form-control height-35 f-14" type="number" name="the_bidder" id="the_bidder"  value="0" class="form-control"  placeholder="Percentage of points for bidder">
                      </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Sales executive who qualifies the deal:</label>
                        <div class="col-sm-10">
                          <input class="form-control height-35 f-14" type="number" name="qualify" id="qualify" value="0" class="form-control"  placeholder="Percentage of points for qualified deals">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Sales executive who defined requirements of the deal will get:</label>
                        <div class="col-sm-10">
                          <input class="form-control height-35 f-14" type="number" class="form-control" name="requirements_defined" id="requirements_defined" value="0"  placeholder="Percentage of points for requirements defined deals">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">If anyone helps sales executive for less than:</label>
                        <div class="col-sm-4">
                          <input class="form-control height-35 f-14 mt-2" type="number" class="form-control" name="less_than" id="less_than" value="0"  placeholder="Percentage of points for requirements defined deals">
                        </div>
                        <label for="inputPassword" class="col-sm-2 col-form-label mt-1">then he/she will get:</label>
                        <div class="col-sm-4">
                          <input class="form-control height-35 f-14 mt-2" type="number" name="less_than_get" id="less_than_get" value="0" class="form-control"  placeholder="Percentage of points for requirements defined deals">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">If anyone helps sales executive for more than:</label>
                        <div class="col-sm-4">
                          <input class="form-control height-35 f-14 mt-2" type="number" class="form-control" name="more_than" id="more_than"  value="0"  placeholder="Percentage of points for requirements defined deals">
                        </div>
                        <label for="inputPassword" class="col-sm-2 col-form-label mt-1">then he/she will get:</label>
                        <div class="col-sm-4">
                          <input class="form-control height-35 f-14 mt-2" type="number" class="form-control" name="more_than_get" id="more_than_get" value="0"  placeholder="Percentage of points for requirements defined deals">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Sales executive who made the proposal of the deal will get:</label>
                        <div class="col-sm-10">
                          <input class="form-control height-35 f-14" type="number" name="proposal_made" id="proposal_made" value="0" class="form-control"  placeholder="Percentage of points for requirements defined deals">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Sales executive who started the negotiation of the deal will get:</label>
                        <div class="col-sm-10">
                          <input class="form-control height-35 f-14" type="number" class="form-control" name="negotiation_started" id="negotiation_started" value="0"  placeholder="Percentage of points for requirements defined deals">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Sales executive who shared the milestone breakdown of the deal with the client will get:</label>
                        <div class="col-sm-10">
                          <input class="form-control height-35 f-14" type="number" class="form-control" name="milestone_breakdown" id="milestone_breakdown" value="0"  placeholder="Percentage of points for requirements defined deals">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Sales executive who closed the deal will get:</label>
                        <div class="col-sm-10">
                          <input class="form-control height-35 f-14" type="number" class="form-control" name="closed_deal" id="closed_deal" value="0"  placeholder="Percentage of points for requirements defined deals">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Sales executive who shared the contact form with the client and filled out the form for
                            project manager will get:</label>
                        <div class="col-sm-10">
                          <input class="form-control height-35 f-14" type="number" name="contact_form" id="contact_form" value="0" class="form-control"  placeholder="Percentage of points for requirements defined deals">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Sales executive who made the deal authorized by the team leader will get:</label>
                        <div class="col-sm-10">
                          <input class="form-control height-35 f-14" type="number" name="authorized_by_leader" id="authorized_by_leader" value="0" class="form-control"  placeholder="Percentage of points for requirements defined deals">
                        </div>
                      </div>
                       
                 

            </div>


           

            <x-slot name="action">
                <!-- Buttons Start -->
                <div class="w-100 border-top-grey">
                    <x-setting-form-actions>
                        <x-forms.button-primary id="save-form" class="mr-3" icon="check">@lang('app.save')
                        </x-forms.button-primary>

                        <x-forms.button-cancel :link="url()->previous()" class="border-0">@lang('app.cancel')
                        </x-forms.button-cancel>
                        </x-settingsform-actions>
                </div>
                <!-- Buttons End -->
            </x-slot>
        </form>

        </x-setting-card>
   
    <!-- SETTINGS END -->
@endsection

@push('scripts')
    
    <script>
        $('#save-form').click(function() {
            const url = "{{ route('kpi-settings.update', ['1']) }}";

            $.easyAjax({
                url: url,
                container: '#save-kpi-settings',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-form",
                data: $('#save-kpi-settings').serialize(),
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
    </script>
@endpush
