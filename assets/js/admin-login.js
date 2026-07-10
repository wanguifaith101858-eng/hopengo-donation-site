$(function () {
  $('#adminLoginForm').on('submit', function (event) {
    event.preventDefault();
    const email = $('#adminEmail').val().trim();
    const password = $('#adminPassword').val();
    if (email === 'superadmin@hopebridge.org' && password === 'admin1234') {
      localStorage.setItem('hopebridgeRole', 'super-admin');
      window.location.href = 'dashboard.html';
    } else {
      $('#adminError').removeClass('hidden').text('Access denied. Use the super admin demo credentials.');
    }
  });
});
