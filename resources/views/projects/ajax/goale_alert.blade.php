@extends('layouts.app')
@section('content')
<div class="container-fluid bg-white">
    <div class="row">
        <div class="col-md-12" style="display: flex; justify-content:center;">
            <img src="{{asset('img/no_data.jpg')}}" alt=""> 
        </div>
    </div>
</div>
<style>
    @media (min-width: 900px) {
        .col-md-12 {
            height: 580px; 
        }
    }

    /* Media query for screens between 640px and 1360px */
    @media (min-width: 1500px) {
        .col-md-12 {
            height: 900px; 
        }
    }
</style>
@endsection
@push('scripts')
    <script>
        Swal.fire({
            text: "Please submit an explanation for your missed goals before you can resume work on your projects!",
            icon: "warning",
            confirmButtonText: "Check here",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "{{ route('project-status.index') }}?modal_type=individual_goal_details&status=expired";
            }
        });
    </script>
@endpush
