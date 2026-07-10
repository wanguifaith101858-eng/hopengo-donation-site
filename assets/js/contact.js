$(function () {
  function showFieldError(fieldName, message) {
    $('[data-error-for="' + fieldName + '"]').text(message);
  }

  function clearFieldError(fieldName) {
    $('[data-error-for="' + fieldName + '"]').text('');
  }

  function validateContactForm() {
    const values = {
      firstName: $('#firstName').val().trim(),
      lastName: $('#lastName').val().trim(),
      email: $('#email').val().trim(),
      company: $('#company').val().trim(),
      subject: $('#subject').val().trim(),
      message: $('#message').val().trim()
    };

    let isValid = true;

    if (!values.firstName) {
      showFieldError('firstName', 'First name is required.');
      isValid = false;
    } else {
      clearFieldError('firstName');
    }

    if (!values.lastName) {
      showFieldError('lastName', 'Last name is required.');
      isValid = false;
    } else {
      clearFieldError('lastName');
    }

    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      showFieldError('email', 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearFieldError('email');
    }

    if (!values.subject) {
      showFieldError('subject', 'Subject is required.');
      isValid = false;
    } else {
      clearFieldError('subject');
    }

    if (!values.message || values.message.length < 10) {
      showFieldError('message', 'Please enter a message with at least 10 characters.');
      isValid = false;
    } else {
      clearFieldError('message');
    }

    if (!values.company) {
      clearFieldError('company');
    }

    return isValid;
  }

  $('#contactForm').on('submit', function (event) {
    event.preventDefault();
    if (validateContactForm()) {
      $('#contactSuccess').removeClass('hidden').text('Thank you! Your message has been sent to HopeBridge.');
      $('#contactForm')[0].reset();
      setTimeout(function () {
        $('#contactSuccess').addClass('hidden');
      }, 5000);
    }
  });
});
