<style>
    .rating-stars ul {
        list-style-type: none;
        padding: 0;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    .rating-stars ul>li.star {
        display: inline-block;
        margin: 1px;
    }

    /* Idle State of the stars */
    .rating-stars ul>li.star>i.fa {
        /* font-size: 1.6em; */
        /* Change the size of the stars */
        color: #ccc;
        /* Color on idle state */
    }

    /* Hover state of the stars */
    .rating-stars ul>li.star.hover>i.fa {
        color: var(--header_color);
    }

    /* Selected state of the stars */
    .rating-stars ul>li.star.selected>i.fa {
        color: var(--header_color);
    }

    .selected {
        color: var(--header_color);
    }

</style>

<!-- ROW START -->
<div class="row py-3 py-lg-5 py-md-5">

    <div class="col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4">

        @if (in_array('client', user_roles()))
            <x-form id="save-project-rating-form">
                <div class="add-client rounded bg-white">
                    <div class="row p-20">

                        {{-- raing id here --}}
                        <input type="hidden" id="ratingID" @if (!is_null($project->rating)) value="{{ $project->rating->id }}" @endif>

                        <div class="col-md-12">
                            <x-forms.label :fieldLabel="__('app.menu.projectRating')" fieldId="project-rating" />
                            <div class="rating-stars">
                                <ul id="stars">
                                    <li class="star @if (!is_null($project->rating) &&
                                        $project->rating->rating >= 1) selected @endif"
                                        title="Poor" data-value="1">
                                        <i class="fa fa-star f-18"></i>
                                    </li>
                                    <li class="star @if (!is_null($project->rating) &&
                                        $project->rating->rating >= 2) selected @endif"
                                        title="Fair" data-value="2">
                                        <i class="fa fa-star f-18"></i>
                                    </li>
                                    <li class="star @if (!is_null($project->rating) &&
                                        $project->rating->rating >= 3) selected @endif"
                                        title="Good" data-value="3">
                                        <i class="fa fa-star f-18"></i>
                                    </li>
                                    <li class="star @if (!is_null($project->rating) &&
                                        $project->rating->rating >= 4) selected @endif"
                                        title="Excellent" data-value="4">
                                        <i class="fa fa-star f-18"></i>
                                    </li>
                                    <li class="star @if (!is_null($project->rating) &&
                                        $project->rating->rating >= 5) selected @endif"
                                        title="WOW!!!" data-value="5">
                                        <i class="fa fa-star f-18"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-md-12 mt-4">
                            <x-forms.textarea fieldId="comment" fieldName="comment" :fieldLabel="__('app.comment')"
                                :fieldValue="(!is_null($project->rating) ? $project->rating->comment : '')" />
                        </div>
                    </div>

                    <!-- CANCEL SAVE SEND START -->
                    <div class="px-lg-4 px-md-4 px-3 py-3 c-inv-btns">
                        <div class="d-flex">
                            <x-forms.button-primary class="save-form" icon="check">@lang('app.save')
                            </x-forms.button-primary>
                        </div>
                    </div>
                    <!-- CANCEL SAVE SEND END -->

                </div>
            </x-form>
        @endif

        <div class="add-client rounded bg-white">
            <div class="row p-20">

                @if (!is_null($project->rating))
                    @if (
                        $viewRatingPermission == 'all'
                        || ($viewRatingPermission == 'added' && $project->rating->added_by == user()->id)
                        || ($viewRatingPermission == 'owned' && $project->client_id == user()->id)
                        || ($viewRatingPermission == 'both' && ($project->client_id == user()->id || $project->rating->added_by == user()->id))
                        )
                
                        <div class="col-md-12 mt-1">
                            <div class="rating-stars">
                                <ul id="stars">
                                    <li class="star @if ($project->rating->rating >= 1) selected @endif" title="Poor" data-value="1">
                                        <i class="fa fa-star f-18"></i>
                                    </li>
                                    <li class="star @if ($project->rating->rating >= 2) selected @endif" title="Fair" data-value="2">
                                        <i class="fa fa-star f-18"></i>
                                    </li>
                                    <li class="star @if ($project->rating->rating >= 3) selected @endif" title="Good" data-value="3">
                                        <i class="fa fa-star f-18"></i>
                                    </li>
                                    <li class="star @if ($project->rating->rating >= 4) selected @endif" title="Excellent" data-value="4">
                                        <i class="fa fa-star f-18"></i>
                                    </li>
                                    <li class="star @if ($project->rating->rating >= 5) selected @endif" title="WOW!!!" data-value="5">
                                        <i class="fa fa-star f-18"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-12 mt-4">
                            <blockquote class="blockquote">
                                <p class="mb-0">{{ nl2br($project->rating->comment) }}</p>
                                <footer class="blockquote-footer">{{ $project->client->name }}</footer>
                            </blockquote>
                        </div>
                    @else
                        <x-cards.no-record icon="star" :message="__('modules.projects.noRatingAvailable')" />
                    @endif
                @else
                    <x-cards.no-record icon="star" :message="__('modules.projects.noRatingAvailable')" />
                @endif

            </div>
        </div>

    </div>
</div>

@if (in_array('client', user_roles()))
    <script>
        $(document).ready(function() {
            var ratingValue = "{{ !is_null($project->rating) ? $project->rating->rating : 0 }}";

            /* 1. Visualizing things on Hover - See next part for action on click */
            $('#stars li').on('mouseover', function() {
                var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

                // Now highlight all the stars that's not after the current hovered star
                $(this).parent().children('li.star').each(function(e) {
                    if (e < onStar) {
                        $(this).addClass('hover');
                    } else {
                        $(this).removeClass('hover');
                    }
                });
            }).on('mouseout', function() {
                $(this).parent().children('li.star').each(function(e) {
                    $(this).removeClass('hover');
                });
            });

            /* 2. Action to perform on click */
            $('#stars li').on('click', function() {
                var onStar = parseInt($(this).data('value'), 10); // The star currently selected
                var stars = $(this).parent().children('li.star');

                for (i = 0; i < stars.length; i++) {
                    $(stars[i]).removeClass('selected');
                }

                for (i = 0; i < onStar; i++) {
                    $(stars[i]).addClass('selected');
                }

                ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
            });

            $('.save-form').click(function() {

                var token = "{{ csrf_token() }}";
                var url = "{{ route('project-ratings.store') }}";
                var method = 'POST';
                var ratingID = $('#ratingID').val();

                if (ratingID) {
                    url = "{{ route('project-ratings.update', ':id') }}";
                    url = url.replace(':id', ratingID);
                    method = 'PUT';
                }

                if (ratingValue !== 0) {
                    $.easyAjax({
                        url: url,
                        container: "#save-project-rating-form",
                        type: "POST",
                        blockUI: true,
                        redirect: true,
                        data: {
                            'rating': ratingValue,
                            'project_id': {{ $project->id }},
                            'comment': $('#comment').val(),
                            '_token': token,
                            '_method': method
                        }
                    })
                }
            });
        });
    </script>
@endif
