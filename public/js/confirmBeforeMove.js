$('.l-sidebar__nav li a').on('click', function() {
  $('#confirmDialog, #dialogOverlay').fadeIn('fast');
  return false;
});

$('#moveBtn').on('click', function() {
  $('#confirmDialog, #dialogOverlay').fadeOut('fast');
});