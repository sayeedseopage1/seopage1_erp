
<div id="">
    <div class="row">
        <div class="col-sm-12">
            <div class="card bg-white border-0 b-shadow-4">
                <div class="card-header bg-white  border-bottom-grey text-capitalize justify-content-between p-20">
                    <div class="row">
                        <div class="col-lg-10 col-10">
                            <h3 class="heading-h1 mb-3">Report Issues Details</h3>
                        </div>

                    </div>
                </div>
                <div class="card-body">


                          <x-cards.data-row :label="__('Subject')"
                              :value="$issue->subject" />
                                <x-cards.data-row :label="__('Issue Type')" :value="$issue->issue_type" />


                          <x-cards.data-row :label="__('Description')" :value="$issue->description" html="true" />

                          <x-cards.data-row :label="__('Page Link')" :value="$issue->page_link" />
                              <x-cards.data-row :label="__('Screenshot')" :value="$issue->screenshot" />

                          <x-cards.data-row :label="__('Status')" :value="$issue->status" />


                </div>
            </div>
        </div>
    </div>
</div>
