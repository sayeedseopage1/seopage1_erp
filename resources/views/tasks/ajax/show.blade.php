<section>
   <div class="f-16 mb-3">
        <span> <strong>Subtask: </strong> </span>
        <span>Lorem Ipsum is simply dummy text of the printing and typesetting elit</span>
    </div> 

    <div class="row">
        <div class="col-8">
            <section class="p-3 bg-white rounded-lg">
                {{-- button section --}}
                <div class="d-flex flex-wrap">
                    
                    {{-- start timer --}}
                    <button type="button" class="d-flex align-items-center btn btn-sm btn-outline-dark mr-2">
                        <i class="bi bi-play" style="font-size: 24px;margin-bottom: -1px;"></i>
                        Start Timer
                    </button>
                    
                    {{-- timer  --}}
                    <button type="button" class="d-flex align-items-center btn btn-sm btn-outline-dark mr-2">
                        <i class="bi bi-clock" style="font-size: 18px;margin-bottom: -1px;"></i>
                        <span class="d-inline ml-1">00:05:44</span>
                    </button>
                    
                    {{-- stop tiemr  --}}
                    <button type="button" class="d-flex align-items-center btn btn-sm btn-outline-dark mr-2">
                        <i class="bi bi-stop-circle" style="font-size: 18px;margin-bottom: -1px;"></i>
                        <span class="d-inline ml-1">Stop Timer</span>
                    </button>
                   
                    {{-- make complete --}}
                    <button type="button" class="d-flex align-items-center btn btn-sm btn-outline-dark mr-2">
                        <i class="bi bi-check2" style="font-size: 20px;margin-bottom: -1px;"></i>
                        <span class="d-inline ml-1">Mark As Complete</span>
                    </button>

                    {{-- request time extension --}}
                    <button type="button" class="d-flex align-items-center btn btn-sm btn-outline-dark mr-2">
                        <i class="bi bi-plus" style="font-size: 20px;margin-bottom: -1px;"></i>
                        <span class="d-inline ml-1">Request Time Extension</span>
                    </button>


                    {{-- approved --}}
                    <button type="button" class="d-flex align-items-center btn btn-sm btn-outline-dark mr-2 text-white border-0" style="background: #069C3C;">
                        <span class="d-inline mr-1">Approved</span> 
                    </button>

                    {{-- awaiting for time extension --}}
                    <button type="button" class="d-flex align-items-center btn btn-sm btn-outline-dark mr-2 text-dark border-0"  style="background: #FAF5D0;">
                        <span class="d-inline mr-1">Awaiting for Time Extension</span> 
                    </button>

                    {{-- 3 dot --}}
                    <button type="button" class="d-flex align-items-center btn btn-sm btn-outline-dark mr-2 border-0 ml-auto">
                        <i class="bi bi-three-dots" style="font-size: 20px;margin-bottom: -1px;"></i>
                    </button>
                </div>
                {{-- button section end --}}
            </section>
        </div>
        <div class="col-4"></div>
    </div>
</section>