<!-- ROW START -->
<div class="row">

    <div class="col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4">
        <!-- Add Task Export Buttons Start -->
        <div class="d-flex" id="table-actions">
            @if (isset($gdpr) && $gdpr->consent_customer == 1)
                <x-forms.link-primary :link="route('front.gdpr.consent', $lead->hash)"
                    class="mr-3" icon="eye" target="_blank">
                    @lang('modules.gdpr.viewConsent')
                </x-forms.link-primary>
            @endif
        </div>
        <!-- Add Task Export Buttons End -->
    </div>

    <div class="col-lg-9 col-md-12 mb-4 mb-xl-0 mb-lg-4">
        <!-- Task Box Start -->
        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">
            {!! $dataTable->table(['class' => 'table table-hover border-0']) !!}
        </div>
        <!-- Task Box End -->
    </div>

    <div class="col-lg-3 col-md-12 mb-4 mb-xl-0 mb-lg-4">
        <div class="right-sidebar">
            <div class="d-flex flex-column rounded mt-3 bg-white">
                <ul>
                    @forelse($consents as $consent)
                    <li>
                        <a class="d-block f-15 text-dark-grey text-capitalize border-bottom-grey consent-details" href="javascript:;" data-consent-id="{{ $consent->id }}">{{ $consent->name }}</a>
                    </li>
                    @empty
                    <p class="text-center">No Consent available.</p>
                    @endforelse
                </ul>
            </div>
        </div>
    </div>

</div>
<!-- ROW END -->

@include('sections.datatable_js')

<script>

    $('#leads-gdpr-table').on('preXhr.dt', function(e, settings, data) {
        var leadID = "{{ $lead->id }}";

        data['leadID'] = leadID;
    });


    const showTable = () => {
        window.LaravelDataTables["leads-gdpr-table"].draw();
    }

    $(document).on('click', '.consent-details', function(){
        let consentId = $(this).data('consent-id');
        let leadId = "{{ $lead->id }}";

        let url = `{{ route('leads.gdpr_consent') }}?consentId=${consentId}&leadId=${leadId}`;

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    })

</script>
