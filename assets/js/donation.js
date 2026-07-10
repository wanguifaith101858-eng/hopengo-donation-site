$(function () {
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

  setCauseSelection('school');
  $('#causeSummary').text(causeData.school.summary);
  $('#selectedCauseLabel').text(causeData.school.label);
  validateDonationForm();
});
