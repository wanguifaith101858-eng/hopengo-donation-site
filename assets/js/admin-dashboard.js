$(function () {
  if (localStorage.getItem('hopebridgeRole') !== 'super-admin') {
    window.location.href = 'index.html';
    return;
  }

  $('#logoutLink').on('click', function () {
    localStorage.removeItem('hopebridgeRole');
  });

  $('.admin-tab').on('click', function () {
    $('.admin-tab').removeClass('bg-teal-700 text-white').addClass('bg-white text-slate-700');
    $(this).addClass('bg-teal-700 text-white').removeClass('bg-white text-slate-700');
    const target = $(this).data('tab');
    $('.tab-pane').removeClass('active');
    $('#' + target).addClass('active');
  });

  $('#addOrgForm').on('submit', function (event) {
    event.preventDefault();
    const orgName = $('#orgName').val().trim();
    const orgType = $('#orgType').val().trim();
    if (orgName && orgType) {
      $('#orgMessage').removeClass('hidden').text(orgName + ' has been queued for review.');
      this.reset();
    }
  });
});
