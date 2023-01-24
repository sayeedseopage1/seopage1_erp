@extends('layouts.app')

@section('filter-section')
<div class="modal-header">
  <div class="rows">
    <h5 class="modal-title" id="modelHeading">@lang('modules.projects.milestones') @lang('app.details')</h5>

  </div>

    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body bg-additional-grey">



    <x-cards.data>



        <hr>




        <x-cards.data-row :label="__('Subject')"
            :value="$issue->subject" />
              <x-cards.data-row :label="__('Issue Type')" :value="$issue->issue_type" />


        <x-cards.data-row :label="__('Description')" :value="$issue->description" html="true" />

        <x-cards.data-row :label="__('Page Link')" :value="$issue->page_link" />
            <x-cards.data-row :label="__('Screenshot')" :value="$issue->screenshot" />

        <x-cards.data-row :label="__('Status')" :value="$issue->status" />



    </x-cards.data>


</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0">@lang('app.close')</x-forms.button-cancel>
</div>
<script type="text/javascript">






</script>
@endsection
