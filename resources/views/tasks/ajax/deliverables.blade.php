


<!-- TAB CONTENT START -->
<div class="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-email-tab">
<?php
$tasks= App\Models\TaskSubmission::where('task_id',$task->id)->get();
$user_id= App\Models\TaskUser::where('task_id',$task->id)->first();
$user= App\Models\User::where('id',$user_id->user_id)->first();

 ?>

    <div class="d-flex flex-wrap p-20">


            <div class="card file-card w-100 rounded-0 border-0 comment">
                <div class="card-horizontal">
                    <div class="card-img my-1 ml-0">
                        <img src="{{ $user->image_url }}" alt="{{ mb_ucwords($user->name) }}">
                    </div>
                    <div class="card-body border-0 pl-0 py-1 mb-2">
                        <div class="d-flex flex-grow-1">
                            <h4 class="card-title f-12 font-weight-normal text-dark mr-3 mb-1">
                                 <a
                                    href="{{ route('employees.show', $user->id) }}"
                                    class="text-darkest-grey">Task Submission by {{ mb_ucwords($user->name) }}</a>
                            </h4>
                        </div>
                        <hr>



                      {{--  <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">


                          <div class="mb-0 text-dark-grey">

                              <h5 class="text-center">Links</h5>
                              @foreach($tasks as $row)
                              @if($row->link != null)

                              <div class="card bg-light" >
                                <div class="card-body text-center">





                                    <p class="card-text">  <a class="text-dark-grey" style="font-weight:bold;" target="_blank" href="{{$row->link}}"><i class="fa-solid fa-link"></i> {{$row->link}}</a></p>
                              <br>

                            </div>
                          </div>
                          @endif
                          @endforeach


                          </div>

                        </div>
                        <hr>

                        <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">


                          <div class="mb-0 text-dark-grey">

                              <h5 class="">Description</h5>
                              @foreach($tasks as $row)
                              @if($row->text != null)
                              <div class="card bg-light" >
                                <div class="card-body text-center">






                                    <p class="card-text">  {!!$row->text!!}</p>
                              <br>

                            </div>
                          </div>
                          @endif
                          @endforeach


                          </div>

                        </div>
                        <hr>
                        <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">


                          <div class="mb-0 text-dark-grey">

                              <h5 class="">Attachment</h5>





                            @foreach($tasks as $row)
                            @if($row->attach != null)
                            <div class="card-body" style="width:100%">
                              <p class="card-text">  <a class="text-dark-grey" style="font-weight:bold;" target="_blank" href="{{asset('storage/TaskSubmission/'.$row->attach)}}"><i class="fa-solid fa-link"></i> {{$row->attach}}</a></p>

                             <!-- <img class="card-img-top" src="{{asset('storage/TaskSubmission/'.$row->attach)}}" width="300" height="150" alt="Card image"> -->



                               </div>

                              @endif
                              @endforeach



                          </div>

                        </div> --}}
                        <div class="main_links">
                            <div class="container">
                                <h5>Link:</h5>
                                <div class="row py-5 wrapper">





                                    <div class="col-md-4">
                                        <div class="myLinks">
                                            <span>
                                                <i class="fa-solid fa-link"></i>
                                            </span> <br>

                                            <a href="https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8" target="_blank">https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8</a>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="myLinks">
                                            <span>
                                                <i class="fa-solid fa-link"></i>
                                            </span> <br>

                                            <a href="https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8" target="_blank">https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8</a>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="myLinks">
                                            <span>
                                                <i class="fa-solid fa-link"></i>
                                            </span> <br>

                                            <a href="https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8" target="_blank">https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8</a>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="myLinks">
                                            <span>
                                                <i class="fa-solid fa-link"></i>
                                            </span> <br>

                                            <a href="https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8" target="_blank">https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8</a>
                                        </div>
                                    </div>


                                    <div class="col-md-4">
                                        <div class="myLinks">
                                            <span>
                                                <i class="fa-solid fa-link"></i>
                                            </span> <br>

                                            <a href="https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8" target="_blank">https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8</a>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="myLinks">
                                            <span>
                                                <i class="fa-solid fa-link"></i>
                                            </span> <br>

                                            <a href="https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8" target="_blank">https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8</a>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="myLinks">
                                            <span>
                                                <i class="fa-solid fa-link"></i>
                                            </span> <br>

                                            <a href="https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8" target="_blank">https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8</a>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="myLinks">
                                            <span>
                                                <i class="fa-solid fa-link"></i>
                                            </span> <br>

                                            <a href="https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8" target="_blank">https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8</a>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="myLinks">
                                            <span>
                                                <i class="fa-solid fa-link"></i>
                                            </span> <br>

                                            <a href="https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8" target="_blank">https://www.google.com/search?q=damy+link&rlz1C1ONGR_enBD1029BD1029&oq=damy+link&aqs=chrome..69i57j0i13i19i512l9.4720j1j7&sourceid=chrome&ie=UTF-8</a>
                                        </div>
                                    </div>

                                  {{--  <a href="#" id="loadMore">Load More <i class="fa-solid fa-link"></i></a>--}}


                                </div>
                            </div>
                        </div>


                        <!-- Description  -->

                        <section class="description">
                            <div class="container">
                                <hr>
                                <div class="row">
                                    <h4 class="py-4">Description :</h4>
                                    <div class="col-md-12">
                                        <div class="description_content">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque laboriosam sequi laborum nostrum quisquam itaque ducimus, eum commodi illo quo optio inventore? In eligendi consequatur molestiae exercitationem corporis minus tempore, voluptatem, maxime ipsum temporibus, aut aliquam eaque dolore placeat quidem est modi. Esse iure, aliquid delectus similique quo corrupti, sed possimus dignissimos, quos vero officiis iste vel corporis eos recusandae modi nulla commodi autem tempora cumque. Magnam reiciendis earum aspernatur voluptate quis, ullam in fugiat voluptates sed nobis repudiandae ipsam ipsa cum neque. Perferendis dolores excepturi sint possimus quam dolorem, optio, maxime inventore nulla laboriosam eaque unde similique enim est quaerat cupiditate tempore animi neque facere, illum nisi! At, itaque fuga consequuntur, eos architecto asperiores dolorem ipsum facere maxime nihil delectus dolorum officia ipsa dignissimos quo. Dolorum, dolor perspiciatis consectetur dolore, molestiae debitis nisi eum ex, nostrum maiores vitae officia aliquam consequuntur tempora quae corrupti incidunt. Debitis aspernatur maxime cumque, placeat sit vero temporibus itaque veritatis labore fugit totam beatae harum modi eligendi cum quae, ipsa reprehenderit asperiores porro impedit exercitationem natus animi. Quos, recusandae commodi dicta minima nesciunt labore totam! Maxime corrupti accusamus laboriosam impedit voluptatibus assumenda excepturi ipsam ut nulla amet obcaecati, dolores ab sunt cumque sit! Enim provident eligendi, voluptate quaerat atque deserunt quisquam culpa explicabo iusto quibusdam nam cupiditate nesciunt velit odit ipsum molestias sed doloribus quia incidunt modi optio pariatur. Quos dignissimos repellat deleniti iure necessitatibus tempora culpa velit porro debitis fugiat deserunt in laudantium voluptatem ipsa nemo voluptatibus perspiciatis, atque quia. Deleniti, eos provident?</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>


                        <!-- image overlay -->

                        <section class="overlay_layer">
                            <div class="container">

                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="overlays_content">
                                            <h4 class="py-4">Attachment :</h4>
                                        </div>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="overlays_content">
                                            <p class="py-4 text-right"> <span>Attach file formate</span> ( PDF, PNG, JPG, PPT, PPTX, MSXL, MS word, One Note, PSD, Illustrator, InDesign File )</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-3">
                                        <a href="" target="_blank">
                                            <div class="main_overlay">
                                                <img src="img/3.png" alt="Avatar" class="image">
                                                <div class="overlay">
                                                    <p>Lorem ipsum dolor sit. </p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div class="col-md-3">
                                        <a href="" target="_blank">
                                            <div class="main_overlay">
                                                <img src="img/1.png" alt="Avatar" class="image">
                                                <div class="overlay">
                                                    <p>Lorem </p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>


                                    <div class="col-md-3">
                                        <a href="" target="_blank">
                                            <div class="main_overlay">
                                                <img src="img/3.png" alt="Avatar" class="image">
                                                <div class="overlay">
                                                    <p>Lorem </p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div class="col-md-3">
                                        <a href="" target="_blank">
                                            <div class="main_overlay">
                                                <img src="img/images.jpeg" alt="Avatar" class="image">
                                                <div class="overlay">
                                                    <p>Lorem </p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div class="col-md-3">
                                        <a href="" target="_blank">
                                            <div class="main_overlay">
                                                <img src="img/2.jpg" alt="Avatar" class="image">
                                                <div class="overlay">
                                                    <p>Lorem </p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>



                                </div>
                            </div>
                        </section>



                    </div>
                </div>
            </div>
            <!-- @if($tasks == null)

            <x-cards.no-record icon="history" :message="__('messages.noRecordFound')" />
            @endif -->


    </div>

</div>
<!-- TAB CONTENT END -->

    <script src="{{asset('custom/deliverables/js/custom.js')}}"></script>
