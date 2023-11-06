const init = function (parent = "") {
    if (parent != "") {
        parent = parent + " ";
    }
    /*******************************************************
                   SELECT Start
*******************************************************/
    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
    ) {
        $(parent + ".select-picker").selectpicker("mobile");
    } else {
        $(parent + ".select-picker").selectpicker();
    }
    // $(parent + ".select2").select2();
    /*******************************************************
                   SELECT End
*******************************************************/
    //turn off autocomplete for all inputs
    $(parent + "input").attr("autocomplete", "off");

    //initialise tooltip
    $("body").tooltip({
        selector: '[data-toggle="tooltip"]',
        trigger: 'hover'
    });

    //initialise popover
    $(function () {
        $('[data-toggle="popover"]').popover();
    });

    //initialise dropify
    var drEvent = $(".dropify").dropify({
        messages: dropifyMessages,
    });

    drEvent.on("dropify.afterClear", function (event, element) {
        var elementID = element.element.id;
        var elementName = element.element.name;
        if ($("#" + elementID + "_delete").length == 0) {
            $("#" + elementID).after(
                '<input type="hidden" name="' +
                    elementName +
                    '_delete" id="' +
                    elementID +
                    '_delete" value="yes">'
            );
        }
    });
};

//select row in datatable
const dataTableRowCheck = (id) => {
    if ($(".select-table-row:checked").length > 0) {
        $("#quick-action-form").fadeIn();
        //if at-least one row is selected
        document.getElementById("select-all-table").indeterminate = true;
        $("#quick-actions")
            .find("input, textarea, button, select")
            .removeAttr("disabled");
        if ($("#quick-action-type").val() == "") {
            $("#quick-action-apply").attr("disabled", true);
        }
        $(".select-picker").selectpicker("refresh");
    } else {
        $("#quick-action-form").fadeOut();
        //if no row is selected
        document.getElementById("select-all-table").indeterminate = false;
        $("#select-all-table").attr("checked", false);
        resetActionButtons();
    }

    if ($("#datatable-row-" + id).is(":checked")) {
        $("#row-" + id).addClass("table-active");
    } else {
        $("#row-" + id).removeClass("table-active");
    }
};

//select all rows in datatable
const selectAllTable = (source) => {
    checkboxes = document.getElementsByName("datatable_ids[]");
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        // if disabled property is given to checkbox, it won't select particular checkbox.
        if (!$("#" + checkboxes[i].id).prop('disabled')){
            checkboxes[i].checked = source.checked;
        }
        if ($("#" + checkboxes[i].id).is(":checked")) {
            $("#" + checkboxes[i].id)
                .closest("tr")
                .addClass("table-active");
            $("#quick-actions")
                .find("input, textarea, button, select")
                .removeAttr("disabled");
            if ($("#quick-action-type").val() == "") {
                $("#quick-action-apply").attr("disabled", true);
            }
            $(".select-picker").selectpicker("refresh");
        } else {
            $("#" + checkboxes[i].id)
                .closest("tr")
                .removeClass("table-active");
            resetActionButtons();
        }
    }

    if ($(".select-table-row:checked").length > 0) {
        $("#quick-action-form").fadeIn();
    } else {
        $("#quick-action-form").fadeOut();
    }
};

//reset table action form elements
const resetActionButtons = () => {
    $("#quick-action-form")[0].reset();
    $("#quick-actions")
        .find("input, textarea, button, select")
        .attr("disabled", "disabled");
    $(".select-picker").selectpicker("refresh");
};

var el = document.getElementById("close-task-detail");

$("body").on("click", ".openRightModal", openTaskDetail);

var el = document.querySelector(".closeRightModal");
if (el) {
    el.addEventListener("click", closeTaskDetail);
}

//show hide secret values
$("body").on("click", ".toggle-password", function () {
    var $selector = $(this).closest(".input-group").find("input.form-control");
    $(this).find(".svg-inline--fa").toggleClass("fa-eye fa-eye-slash");
    var $type = $selector.attr("type") === "password" ? "text" : "password";
    $selector.attr("type", $type);
});

$("body").on("click", ".openRightModal", function (event) {
    event.preventDefault();

    const requestUrl = this.href;
    const inModal = $(this).hasClass("inModal");

    let redirectUrl = "";
    if (typeof $(this).data("redirect-url") !== "undefined") {
        redirectUrl = encodeURIComponent($(this).data("redirect-url"));
    }

    $.easyAjax({
        url: requestUrl,
        blockUI: true,
        container: RIGHT_MODAL,
        historyPush: !inModal,
        data: { redirectUrl: redirectUrl },
        success: function (response) {
            if (response.status == "success") {
                $(RIGHT_MODAL_CONTENT).html(response.html);
                $(RIGHT_MODAL_TITLE).html(response.title);
            }
        },
        error: function (request, status, error) {
            //console.log(request.responseText);
            if (request.status == 403) {
                $(RIGHT_MODAL_CONTENT).html(
                    '<div class="align-content-between d-flex justify-content-center mt-105 f-21">403 | Permission Denied</div>'
                );
            } else if (request.status == 404) {
                $(RIGHT_MODAL_CONTENT).html(
                    '<div class="align-content-between d-flex justify-content-center mt-105 f-21">404 | Not Found</div>'
                );
            } else if (request.status == 500) {
                $(RIGHT_MODAL_CONTENT).html(
                    '<div class="align-content-between d-flex justify-content-center mt-105 f-21">500 | Something Went Wrong</div>'
                );
            }
        },
    });
});

// Sidebar open close
$("#sidebarToggle").on("click", function () {
    if ($("body").hasClass("sidebar-toggled")) {
        localStorage.setItem("mini-sidebar", "yes");
    } else {
        localStorage.setItem("mini-sidebar", "no");
    }
});

// active left sub menu item
var currentUrl = window.location;
var pathArray = window.location.pathname.split("account/");
if (typeof pathArray[1] !== "undefined") {
    var currentRoute = pathArray[1].split("/");
    currentRoute = currentRoute[0];
    var element = $("#sideMenuScroll li a")
        .filter(function () {
            return this.href == currentUrl.href;
        })
        .addClass("active")
        .closest("li")
        .removeClass("closeIt")
        .addClass("openIt");

    // active left main menu item
    var element2 = $("#sideMenuScroll li a").filter(function () {
        var pathArray = this.href.split("account/");
        if (currentRoute == pathArray[1]) {
            return true;
        }
        // console.log(this.href, currentUrl.href, currentUrl.href.indexOf(this.href));
    });
    element2.addClass("active");
    element2
        .closest("li")
        .removeClass("closeIt")
        .addClass("openIt")
        .children("a")
        .addClass("active");
}

//nl2br
function nl2br(str, is_xhtml) {
    if (typeof str === "undefined" || str === null) {
        return "";
    }
    var breakTag =
        is_xhtml || typeof is_xhtml === "undefined" ? "<br />" : "<br>";
    return (str + "").replace(
        /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
        "$1" + breakTag + "$2"
    );
}
//decimal format
function decimalupto2(num) {
    var amt = Math.round(num * 100) / 100;
    return parseFloat(amt.toFixed(2));
}

//calculate total of invoices
function calculateTotal() {
    var subtotal = 0;
    var discount = 0;
    var tax = "";
    var taxList = new Object();
    var taxTotal = 0;
    var discountAmount = 0;
    var discountType = $("#discount_type").val();
    var discountValue = $(".discount_value").val();
    var calculateTax = $("#calculate_tax").val();
    var adjustmentAmount = $("#adjustment_amount").val();

    $(".quantity").each(function (index, element) {
        var discountedAmount = 0;
        var amount = parseFloat(
            $(this).closest(".item-row").find(".amount").val()
        );

        if (isNaN(amount)) {
            amount = 0;
        }

        subtotal = (parseFloat(subtotal) + parseFloat(amount)).toFixed(2);
    });

    if (discountType == "percent" && discountValue != "") {
        discountAmount =
            (parseFloat(subtotal) / 100) * parseFloat(discountValue);
        discountedAmount = parseFloat(subtotal - discountAmount);
    } else {
        discountAmount = parseFloat(discountValue);
        discountedAmount = parseFloat(subtotal - parseFloat(discountValue));
    }

    $(".quantity").each(function (index, element) {
        var itemTax = [];
        var itemTaxName = [];
        subtotal = parseFloat(subtotal);

        $(this)
            .closest(".item-row")
            .find("select.type option:selected")
            .each(function (index) {
                itemTax[index] = $(this).data("rate");
                itemTaxName[index] = $(this).text();
            });
        var itemTaxId = $(this).closest(".item-row").find("select.type").val();

        var amount = parseFloat(
            $(this).closest(".item-row").find(".amount").val()
        );

        if (isNaN(amount)) {
            amount = 0;
        }

        if (itemTaxId != "") {
            for (var i = 0; i <= itemTaxName.length; i++) {
                if (typeof taxList[itemTaxName[i]] === "undefined") {
                    if (
                        calculateTax == "after_discount" &&
                        discountAmount > 0
                    ) {
                        var taxValue =
                            (amount - (amount / subtotal) * discountAmount) *
                            (parseFloat(itemTax[i]) / 100);

                        if (!isNaN(taxValue)) {
                            taxList[itemTaxName[i]] = parseFloat(taxValue);
                        }
                    } else {
                        var taxValue = amount * (parseFloat(itemTax[i]) / 100);

                        if (!isNaN(taxValue)) {
                            taxList[itemTaxName[i]] = parseFloat(taxValue);
                        }
                    }
                } else {
                    if (
                        calculateTax == "after_discount" &&
                        discountAmount > 0
                    ) {
                        var taxValue =
                            parseFloat(taxList[itemTaxName[i]]) +
                            (amount - (amount / subtotal) * discountAmount) *
                                (parseFloat(itemTax[i]) / 100);

                        if (!isNaN(taxValue)) {
                            taxList[itemTaxName[i]] = parseFloat(taxValue);
                        }
                    } else {
                        var taxValue =
                            parseFloat(taxList[itemTaxName[i]]) +
                            amount * (parseFloat(itemTax[i]) / 100);

                        if (!isNaN(taxValue)) {
                            taxList[itemTaxName[i]] = parseFloat(taxValue);
                        }
                    }
                }
            }
        }
    });

    $.each(taxList, function (key, value) {
        if (!isNaN(value)) {
            tax =
                tax +
                '<tr><td class="text-dark-grey">' +
                key +
                '</td><td><span class="tax-percent">' +
                decimalupto2(value).toFixed(2) +
                "</span></td></tr>";
            taxTotal = taxTotal + decimalupto2(value);
        }
    });

    if (isNaN(subtotal)) {
        subtotal = 0;
    }

    $(".sub-total").html(decimalupto2(subtotal).toFixed(2));
    $(".sub-total-field").val(decimalupto2(subtotal));

    if (discountValue != "") {
        if (discountType == "percent") {
            discount = (parseFloat(subtotal) / 100) * parseFloat(discountValue);
        } else {
            discount = parseFloat(discountValue);
        }
    }

    if (tax != "") {
        $("#invoice-taxes").html(tax);
    } else {
        $("#invoice-taxes").html(
            '<tr><td colspan="2"><span class="tax-percent">0.00</span></td></tr>'
        );
    }

    if (adjustmentAmount && adjustmentAmount != 0 && adjustmentAmount != '') {
        subtotal = subtotal + parseFloat(adjustmentAmount);
    }

    $("#discount_amount").html(decimalupto2(discount).toFixed(2));

    var totalAfterDiscount = decimalupto2(subtotal - discount);

    totalAfterDiscount = totalAfterDiscount < 0 ? 0 : totalAfterDiscount;

    var total = decimalupto2(totalAfterDiscount + taxTotal);

    $(".total").html(total.toFixed(2));
    $(".total-field").val(total.toFixed(2));
}

function deSelectAll() {
    $("#select-all-table").prop("checked", false);
}

$("table th:first-child").removeAttr("title");

//Prevent sidebar dropdown close
$(document).on("click", ".main-sidebar .dropdown-menu", function (e) {
    e.stopPropagation();
});

//submit form on press enter
$(document).on("keypress", "input.form-control", function(e) {
    var inModalLg = $(MODAL_LG).hasClass("show");
    var inModalXl = $(MODAL_XL).hasClass("show");

    if (e.key === "Enter") {
        if (inModalLg || inModalXl) {
            $(this)
                .closest(".modal-content")
                .find(".btn-primary")
                .trigger("click");
        } else {
            $(this).closest("form").find(".btn-primary").trigger("click");
        }
        return false; //<---- Add this line
    }
});

$("body").on("click", "#right-modal-content .btn-cancel", function (e) {
    e.preventDefault();
    closeTaskDetail();
});

//hide tooltip after click on element
$(document).on('mousedown', "[aria-describedby]", function() {
    $("[aria-describedby]").tooltip('hide');
});

// Snippet to reload the page on browser back and forward button click
$(document).ready(function () {
    sessionStorage.setItem("RIGHT_MODAL", "closed");
    if (window.history && window.history.pushState) {
        $(window).on("popstate", function () {
            if (sessionStorage.getItem("RIGHT_MODAL") != "opened") {
                window.location.reload();
            }
        });
    }
});

