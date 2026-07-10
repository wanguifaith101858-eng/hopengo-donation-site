$(function () {
  function closeMobileMenu($header) {
    const $menu = $header.find('.mobile-nav');
    $menu.addClass('hidden').removeClass('open');
    $header.find('.mobile-menu-button').attr('aria-expanded', 'false');
  }

  $('.mobile-menu-button').on('click', function () {
    const $button = $(this);
    const $header = $button.closest('header');
    const $menu = $header.find('.mobile-nav');
    const isOpen = $button.attr('aria-expanded') === 'true';
    $button.attr('aria-expanded', String(!isOpen));
    if (isOpen) {
      $menu.addClass('hidden').removeClass('open');
    } else {
      $menu.removeClass('hidden').addClass('open');
    }
  });

  $('.mobile-nav a').on('click', function () {
    closeMobileMenu($(this).closest('header'));
  });

  $(document).on('keydown', function (event) {
    if (event.key === 'Escape') {
      $('header').each(function () {
        const $header = $(this);
        if (!$header.find('.mobile-nav').hasClass('hidden')) {
          closeMobileMenu($header);
        }
      });
    }
  });

  $(document).on('click touchstart', function (event) {
    const $target = $(event.target);
    const $header = $('header');
    if ($header.find('.mobile-nav').not('.hidden').length && !$target.closest('header').length) {
      closeMobileMenu($header);
    }
  });

  $(window).on('resize', function () {
    if (window.innerWidth >= 768) {
      $('.mobile-nav').addClass('hidden');
      $('.mobile-menu-button').attr('aria-expanded', 'false');
    }
  });

  const causeData = {
    school: {
      summary: 'You are supporting school programs, classroom improvements, and learning materials.',
      label: 'School Support'
    },
    orphanage: {
      summary: 'You are supporting orphanage care, food, shelter, and medical needs.',
      label: 'Orphanage Care'
    },
    street: {
      summary: 'You are supporting rehabilitation and outreach for street children.',
      label: 'Street Children'
    },
    food: {
      summary: 'You are funding food relief packs and daily nutrition for vulnerable families.',
      label: 'Food Relief'
    },
    medical: {
      summary: 'You are helping provide medical outreach, checkups, and urgent health support.',
      label: 'Medical Outreach'
    }
  };

  function setCauseSelection(target) {
    $('.cause-tab').each(function () {
      const isActive = $(this).data('target') === target;
      $(this).toggleClass('active', isActive);
      $(this).toggleClass('bg-teal-600 border-teal-600 text-white', isActive);
      $(this).toggleClass('border-slate-300 bg-white text-slate-700', !isActive);
    });
  }

  function formatCardNumber(value) {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  function formatExpiry(value) {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) {
      return digits.slice(0, 2) + '/' + digits.slice(2);
    }
    return digits;
  }

  function formatCvc(value) {
    return value.replace(/\D/g, '').slice(0, 3);
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

  function showFieldError(fieldName, message) {
    $('[data-error-for="' + fieldName + '"]').text(message);
  }

  function clearFieldError(fieldName) {
    $('[data-error-for="' + fieldName + '"]').text('');
  }

  function updateDonationSummary() {
    const donationAmount = $('#donationAmount').val().trim();
    const hasAmount = donationAmount && Number(donationAmount) > 0;
    $('#selectedAmountLabel').text(hasAmount ? '$' + Number(donationAmount).toLocaleString() : '$0');
  }

  function validateDonationForm() {
    const donationAmount = $('#donationAmount').val().trim();
    const paymentMethod = $('input[name="paymentMethod"]:checked').val();
    const selectedCause = $('.cause-tab.active').data('target');
    const cardNumber = $('#cardNumber').val().trim();
    const cardName = $('#cardName').val().trim();
    const cardExpiry = $('#cardExpiry').val().trim();
    const cardCvc = $('#cardCvc').val().trim();

    let isValid = true;

    if (!donationAmount || Number(donationAmount) < 1) {
      showFieldError('donationAmount', 'Please enter a valid amount in USD.');
      isValid = false;
    } else {
      clearFieldError('donationAmount');
    }

    if (!paymentMethod) {
      $('[data-error-for="paymentMethod"]').text('Please select a contribution method.');
      isValid = false;
    } else {
      $('[data-error-for="paymentMethod"]').text('');
    }

    if (paymentMethod === 'card') {
      $('#cardPaymentPanel').removeClass('hidden');
      $('#paypalNote').addClass('hidden');
      const cleanCardNumber = cardNumber.replace(/\s/g, '');
      if (!/^\d{16}$/.test(cleanCardNumber)) {
        showFieldError('cardNumber', 'Enter a valid 16-digit card number.');
        isValid = false;
      } else {
        clearFieldError('cardNumber');
      }
      if (!cardName) {
        showFieldError('cardName', 'Cardholder name is required.');
        isValid = false;
      } else {
        clearFieldError('cardName');
      }
      if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(cardExpiry)) {
        showFieldError('cardExpiry', 'Use MM/YY format.');
        isValid = false;
      } else {
        clearFieldError('cardExpiry');
      }
      if (!/^\d{3}$/.test(cardCvc)) {
        showFieldError('cardCvc', 'Enter the 3-digit CVC.');
        isValid = false;
      } else {
        clearFieldError('cardCvc');
      }
    } else if (paymentMethod === 'paypal') {
      $('#cardPaymentPanel').addClass('hidden');
      $('#paypalNote').removeClass('hidden');
      clearFieldError('cardNumber');
      clearFieldError('cardName');
      clearFieldError('cardExpiry');
      clearFieldError('cardCvc');
    } else {
      $('#cardPaymentPanel').addClass('hidden');
      $('#paypalNote').addClass('hidden');
    }

    if (!selectedCause) {
      isValid = false;
    }

    updateDonationSummary();
    $('#payButton').prop('disabled', !isValid);
    return isValid;
  }

  if ($('#contactForm').length) {
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
  }

  if ($('#donationForm').length) {
    $('.cause-tab').on('click', function () {
      const key = $(this).data('target');
      setCauseSelection(key);
      $('#causeSummary').text(causeData[key].summary);
      $('#selectedCauseLabel').text(causeData[key].label);
      validateDonationForm();
    });

    $('input[name="paymentMethod"]').on('change', function () {
      $('.payment-option').removeClass('active bg-teal-600 border-teal-600 text-white');
      $(this).closest('.payment-option').addClass('active bg-teal-600 border-teal-600 text-white');
      validateDonationForm();
    });

    $('#donationAmount').on('input', validateDonationForm);
    $('#cardNumber').on('input', function () {
      $(this).val(formatCardNumber($(this).val()));
      validateDonationForm();
    });
    $('#cardExpiry').on('input', function () {
      $(this).val(formatExpiry($(this).val()));
      validateDonationForm();
    });
    $('#cardCvc').on('input', function () {
      $(this).val(formatCvc($(this).val()));
      validateDonationForm();
    });
    $('#cardName').on('input', validateDonationForm);

    $('#donationForm').on('submit', function (event) {
      event.preventDefault();
      if (validateDonationForm()) {
        const paymentMethod = $('input[name="paymentMethod"]:checked').val();
        const message = paymentMethod === 'paypal'
          ? 'PayPal handoff is ready. Your backend team can connect the live PayPal flow next.'
          : 'Your secure card payment request is ready for processing. Your backend team can connect Flutterwave next.';
        $('#donationSuccess').removeClass('hidden').text(message);
        $('#donationForm')[0].reset();
        setCauseSelection('school');
        $('.payment-option').removeClass('active bg-teal-600 border-teal-600 text-white');
        $('#cardPaymentPanel').addClass('hidden');
        $('#paypalNote').addClass('hidden');
        $('#causeSummary').text(causeData.school.summary);
        $('#selectedCauseLabel').text(causeData.school.label);
        $('#donationAmount').val('');
        $('#selectedAmountLabel').text('$0');
        $('#payButton').prop('disabled', true);
        setTimeout(function () {
          $('#donationSuccess').addClass('hidden');
        }, 6000);
      }
    });
  }

  if ($('#adminLoginForm').length) {
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
  }

  if ($('#adminDashboard').length) {
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
  }
});
