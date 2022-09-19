<!-- SETTINGS BOX START -->
<div class="settings-box bg-additional-grey rounded">

    @isset($alert) {{ $alert }} @endisset
    @isset($buttons) {{ $buttons }} @endisset

    <x-form id="editSettings" :method="($method ?? 'PUT')" class="ajax-form">
        <a class="mb-0 d-block d-lg-none text-dark-grey s-b-mob-sidebar" onclick="openSettingsSidebar()"><i
                class="fa fa-ellipsis-v"></i></a>
        <div class="s-b-inner s-b-notifications bg-white b-shadow-4 rounded">
            {{ $header }}
            <div class="s-b-n-content">
                <div class="tab-content" id="nav-tabContent">
                    <!--  TAB CONTENT START -->
                    <div class="tab-pane fade show active" id="nav-email" role="tabpanel"
                        aria-labelledby="nav-email-tab">
                        <div class="d-flex flex-wrap justify-content-between">
                            {{ $slot }}
                        </div>
                        @isset($action) {{ $action }} @endisset
                    </div>
                    <!-- TAB CONTENT END -->
                </div>
            </div>
        </div>
    </x-form>
</div>
<!-- SETTINGS BOX END -->
