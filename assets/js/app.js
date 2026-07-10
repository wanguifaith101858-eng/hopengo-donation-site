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
});
