/**
* Dynamically add/remove table row using jquery
*
* @author Risul Islam risul321@gmail.com
**/

/*Add row event*/
$(document).on('click', '.rowfy-addrow', function(){
  let rowfyable = $(this).closest('table');
  let lastRow = $('tbody tr:last', rowfyable).clone();
  $('input', lastRow).val('');
  $('tbody', rowfyable).append(lastRow);
  $(this).removeClass('rowfy-addrow btn-success').addClass('rowfy-deleterow btn-danger').text('-');
});

/*Delete row event*/
$(document).on('click', '.rowfy-deleterow', function(){
  $(this).closest('tr').remove();
});

/*Initialize all rowfy tables*/
$('.rowfy').each(function(){
  $('tbody', this).find('tr').each(function(){
    $(this).append('<td><button type="button" class="btn btn-sm '
      + ($(this).is(":last-child") ?
        'rowfy-addrow btn-success">+' :
        'rowfy-deleterow btn-danger">-') 
      +'</button></td>');
  });
});
