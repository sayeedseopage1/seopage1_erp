/*******************************************************
                Accordion Sidebar Menu Start
*******************************************************/
var accItem = document.getElementsByClassName('accordionItem');
var accHD = document.getElementsByClassName('accordionItemHeading');
for (i = 0; i < accHD.length; i++) {
    accHD[i].addEventListener('click', toggleItem, false);
}

function toggleItem() {
    var itemClass = this.parentNode.className;

    for (i = 0; i < accItem.length; i++) {
        accItem[i].className = 'accordionItem closeIt';
    }
    if (itemClass == 'accordionItem closeIt') {
        this.parentNode.className = 'accordionItem openIt';
    }
}
/*******************************************************
                Accordion Sidebar Menu End
*******************************************************/

/*******************************************************
            Toggle The Side Navigation Start
*******************************************************/
// document.getElementById("sidebarToggle").addEventListener("click", toggleSidebar);

var ts = document.getElementById('sidebarToggle');
if (ts) {
    ts.addEventListener("click", toggleSidebar);
}

function toggleSidebar() {
    let toggle = document.querySelector('body');
    toggle.classList.toggle('sidebar-toggled');
}

window.addEventListener("resize", resiz);
function resiz() {
    if (screen.width < 769) {
        var element = document.querySelector("body");
        element.classList.remove("sidebar-toggled");
    }
}
/*******************************************************
            Toggle The Side Navigation End
*******************************************************/

/*******************************************************
               Header More Filter Start
*******************************************************/
function openMoreFilter() {
    var omf = document.getElementById("more_filter");
    omf.classList.add("in");
}

function closeMoreFilter() {
    var cls = document.getElementById("more_filter");
    cls.classList.remove("in");
}

if ($('#more_filter').length > 0) {
    $(document).on('mouseup', function(e)
    {
        var container = $("#more_filter");
        var searchField = $(".bs-searchbox");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0 && !searchField.is(e.target) && searchField.has(e.target).length === 0)
        {
            closeMoreFilter()
        }
    });
}


/*******************************************************
                Header More Filter End
*******************************************************/

/*******************************************************
                    Mobile Menu Start
*******************************************************/
function openMobileMenu() {
    var omm = document.getElementById("mobile_menu_collapse");
    omm.classList.add("toggled");

    var omm1 = document.getElementById("mobile_close_panel");
    omm1.classList.add("toggled");
}

function closeMobileMenu() {
    var cmm = document.getElementById("mobile_menu_collapse");
    cmm.classList.remove("toggled");

    var cmm1 = document.getElementById("mobile_close_panel");
    cmm1.classList.remove("toggled");
}
/*******************************************************
                    Mobile Menu End
*******************************************************/

/*******************************************************
              Mobile Admin Dashboard Open
*******************************************************/
function openAdminDashboard() {
    var oad1 = document.getElementById("mob-admin-dash");
    oad1.classList.add("in");

    var oad2 = document.getElementById("close-admin-overlay");
    oad2.classList.add("in");
}

var el = document.getElementById('close-admin-overlay');
if (el) {
    el.addEventListener("click", closeAdminDashboard);
}

var el = document.getElementById('close-admin');
if (el) {
    el.addEventListener("click", closeAdminDashboard);
}

function closeAdminDashboard() {
    var cad1 = document.getElementById("mob-admin-dash");
    cad1.classList.remove("in");

    var cad2 = document.getElementById("close-admin-overlay");
    cad2.classList.remove("in");
}
/*******************************************************
                    Mobile Settings End
*******************************************************/

/*******************************************************
                    Mobile Settings Open
*******************************************************/
function openSettingsSidebar() {
    var oss1 = document.getElementById("mob-settings-sidebar");
    oss1.classList.add("in");

    var oss2 = document.getElementById("close-settings-overlay");
    oss2.classList.add("in");
}

var el = document.getElementById('close-settings');
if (el) {
    el.addEventListener("click", closeSettingsSidebar);
}

var el = document.getElementById('close-settings-overlay');
if (el) {
    el.addEventListener("click", closeSettingsSidebar);
}

function closeSettingsSidebar() {
    var cls1 = document.getElementById("mob-settings-sidebar");
    cls1.classList.remove("in");

    var cls2 = document.getElementById("close-settings-overlay");
    cls2.classList.remove("in");
}
/*******************************************************
                    Mobile Settings End
*******************************************************/

/*******************************************************
                    Mobile Ticket Open
*******************************************************/
function openTicketsSidebar() {
    var ots1 = document.getElementById("ticket-detail-contact");
    ots1.classList.add("in");

    var oss2 = document.getElementById("close-tickets-overlay");
    oss2.classList.add("in");
}

var el = document.getElementById('close-tickets');
if (el) {
    el.addEventListener("click", closeTicketsSidebar);
}

var el = document.getElementById('close-tickets-overlay');
if (el) {
    el.addEventListener("click", closeTicketsSidebar);
}

function closeTicketsSidebar(){
    var cts1 = document.getElementById("ticket-detail-contact");
    cts1.classList.remove("in");

    var cts2 = document.getElementById("close-tickets-overlay");
    cts2.classList.remove("in");
}
/*******************************************************
                    Mobile Ticket End
*******************************************************/

/*******************************************************
                    Client Detail Open
*******************************************************/
function openClientDetailSidebar() {
    var ocds1 = document.getElementById("mob-client-detail");
    ocds1.classList.add("in");

    var ocds2 = document.getElementById("close-client-overlay");
    ocds2.classList.add("in");

    // var ocds4 = document.getElementById("close-client-detail");
    // ocds4.classList.remove("d-none");

    var ocds3 = document.getElementById("hide-project-menues");
    ocds3.classList.add("in");
}

var el = document.getElementById('close-client-overlay');
if (el) {
    el.addEventListener("click", closeClientDetail);
}

var el = document.getElementById('close-client-detail');
if (el) {
    el.addEventListener("click", closeClientDetail);
}

function closeClientDetail() {
    // var ocds4 = document.getElementById("close-client-detail");
    // ocds4.classList.add("d-none");

    var ccd1 = document.getElementById("mob-client-detail");
    ccd1.classList.remove("in");

    var ccd2 = document.getElementById("close-client-overlay");
    ccd2.classList.remove("in");

    var ccd3 = document.getElementById("hide-project-menues");
    ccd3.classList.remove("in");
}
/*******************************************************
                    Client Detail End
*******************************************************/

/*******************************************************
                    Project Menu Open
*******************************************************/
function openProjectSidebar() {
    var ops1 = document.getElementById("mob-project-menu");
    ops1.classList.add("in");

    var ops2 = document.getElementById("close-project-overlay");
    ops2.classList.add("in");
}

var el = document.getElementById('close-project-overlay');
if (el) {
    el.addEventListener("click", closeProjectSidebar);
}

var el = document.getElementById('close-projects');
if (el) {
    el.addEventListener("click", closeProjectSidebar);
}

function closeProjectSidebar() {
    var cps1 = document.getElementById("mob-project-menu");
    cps1.classList.remove("in");

    var cps2 = document.getElementById("close-project-overlay");
    cps2.classList.remove("in");
}
/*******************************************************
                    Project Menu End
*******************************************************/

/*******************************************************
                   Message Tabs Start
*******************************************************/
function msgTabs(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    document.getElementById('msgContentRight').className += ' d-block';
}

function closeMessageTab() {
    var cmt = document.getElementById("msgContentRight");
    cmt.classList.remove("d-block");
}
/*******************************************************
                   Message Tabs End
*******************************************************/

/*******************************************************
                   RTL Start
*******************************************************/
function rtl() {
    var rtl = document.querySelector("body");
    rtl.classList.toggle("rtl");
}
/*******************************************************
                   RTL End
*******************************************************/

/*******************************************************
                 Task Detail Start
*******************************************************/
function openTaskDetail() {
    var otd1 = document.getElementById("task-detail-1");
    otd1.classList.add("in");

    var ops2 = document.getElementById("close-task-detail-overlay");
    ops2.classList.add("in");

    var otd4 = document.getElementById("close-task-detail");
    otd4.classList.add("in");
}

var el = document.getElementById('close-task-detail-overlay');
if (el) {
    el.addEventListener("click", closeTaskDetail);
}

var el = document.getElementById('close-task-detail');
if (el) {
    el.addEventListener("click", closeTaskDetail);
}

function closeTaskDetail() {
    var ctd1 = document.getElementById("task-detail-1");
    ctd1.classList.remove("in");

    var ctd2 = document.getElementById("close-task-detail-overlay");
    ctd2.classList.remove("in");

	sessionStorage.setItem('RIGHT_MODAL', 'opened');

    window.history.back();

    var ctd3 = document.getElementById("close-task-detail");
    ctd3.classList.remove("in");
}
/*******************************************************
                 Task Detail End
*******************************************************/




// $(document).ready(function () {

//     //Datatables
//     $('#example').DataTable({
//         "language": {
//             "paginate": {
//                 "next": '<i class="icon-arrow-right icons"></i>',
//                 "previous": '<i class="icon-arrow-left icons"></i>'
//             }
//         },
//         "paging": true,
//         "ordering": false,
//         "info": false
//     });

// })



