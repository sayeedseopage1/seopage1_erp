<div class='media align-items-center mw-250'>
    <div class='position-relative'><img src='{{ $user->image_url }}' class='mr-2 taskEmployeeImg rounded-circle'>
    </div>
    <div class='media-body'>
        <h5 class='mb-0 f-13'>{{ ucfirst($user->name) }}</h5>
        <p class='my-0 f-11 text-dark-grey'>{{ $user->email }}</p>
        <p class='my-0 f-11 text-dark-grey'>
            {{ !is_null($user->clientDetails->company_name) ? mb_ucwords($user->clientDetails->company_name) : ' ' }}</p>
    </div>
</div>
