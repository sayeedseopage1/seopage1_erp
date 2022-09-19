 <div {{ $attributes->merge(['class' => 'card bg-white border-grey file-card mr-3 mb-3']) }} >
     <div class="card-horizontal">
         <div class="card-img mr-0">
             {{ $slot }}
         </div>
         <div class="card-body pr-2">
             <div class="d-flex flex-grow-1">
                 <h4 class="card-title f-12 text-dark-grey mr-3 text-truncate"  data-toggle="tooltip" data-original-title="{{ $fileName }}">{{ $fileName }}</h4>
                 @isset($action)
                     {!! $action !!}
                 @endisset
             </div>
             <div class="card-date f-11 text-lightest">
                 {{ $dateAdded }}
             </div>
         </div>
     </div>
 </div>
