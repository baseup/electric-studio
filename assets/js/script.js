(function ($) {

  $.fn.drags = function (opt) {
    opt = $.extend({
      handle: '',
      cursor: 'move',
      draggableClass: 'draggable',
      activeHandleClass: 'active-handle',
      cancel: 'a,input,textarea,button,select,option'
    }, opt);

    var $selected = null;
    var $elements = (opt.handle === '') ? this : this.find(opt.handle);

    $elements.css('cursor', opt.cursor).on('mousedown', function (e) {
      var elIsCancel = e.target.nodeName ? $(e.target).closest(opt.cancel).length : false;

      if (opt.handle === '') {
        $selected = $(this);
        $selected.addClass(opt.draggableClass);
      } else {
        $selected = $(this).parent();
        $selected.addClass(opt.draggableClass).find(opt.handle).addClass(opt.activeHandleClass);
      }

      if (elIsCancel) {
        // cancel drag if user started on a cancel element
        return true;
      }

      var drg_h = $selected.outerHeight(),
          drg_w = $selected.outerWidth(),
          pos_y = $selected.offset().top + drg_h - e.pageY,
          pos_x = $selected.offset().left + drg_w - e.pageX;
      $(document).on('mousemove', function (e) {
        $selected.offset({
          top: e.pageY + pos_y - drg_h,
          left: e.pageX + pos_x - drg_w
        });
      }).on('mouseup', function () {
        $(this).off('mousemove'); // Unbind events from document
        if ($selected !== null) {
          $selected.removeClass(opt.draggableClass);
          $selected = null;
        }
      });
      e.preventDefault(); // disable selection
    }).on('mouseup', function () {
      if (opt.handle === '') {
        $selected.removeClass(opt.draggableClass);
      } else {
        $selected.removeClass(opt.draggableClass)
                 .find(opt.handle).removeClass(opt.activeHandleClass);
      }
      $selected = null;
    });

    return this;
  };

  /**
   * MODAL
   *
   * call using $(modal).Modal();
   */
  $.fn.Modal = function () {
    return this.each(function () {

      var el = $(this);

      modalOpen(el);

      el.find('.modal-close').click(function () {
        modalClose(el);
      });

      el.click(function (e) {
        var target = $(e.target);

        if (!target.closest('.modal__box').length) {
          modalClose(el);
        }
      });

      function modalClose(modal) {
        modal.removeClass('show');
        modal.find('.modal__box').removeClass('show');
      }

      function modalOpen(modal) {
        modal.addClass('show');
        setTimeout(function () {
          modal.find('.modal__box').addClass('show');
        }, 100);
      }
    });
  }


  /**
   * TAB
   *
   * call using $(tab-menu).Tab();
   * wherein `tab-menu` is a parent of multiple tab toggles, pref. a `<ul>` list
   * tab toggle requires => data-tab-toggle="target"
   * tab pane requires => data-tab-pane="target"
   */
  $.fn.Tab = function () {
    return this.each(function () {
      var el = $(this),
          tabs = el.find('[data-tab-toggle]');

      tabs.click(function (e) {
        e.preventDefault();

        var id = $(this).data('tab-toggle'),
            targetPane = $('[data-tab-pane="'+id+'"]');

        tabs.removeClass('active');
        $(this).addClass('active');

        $('.tab-pane').removeClass('tab-pane--active');
        targetPane.addClass('tab-pane--active');
      });
    });
  }

  
  /**
   * DROPDOWN
   *
   * call using $(selector).Dropdown();
   * `selector` requires => data-dropdown-toggle="target"
   */
  $.fn.Dropdown = function () {
    return this.each(function () {
      var el = $(this),
          id = el.data('dropdown-toggle'),
          target = $('[data-dropdown="'+id+'"]');

      el.off('click.dropdown');

      el.on('click.dropdown', function () {
        el.addClass('active');

        target.toggleClass('expand');
      });  

    });
  }

  
  /**
   * NOTIFY
   *
   * call using $.Notify({content:'texts'});
   * set `duration` only if required
   */
  $.Notify = function (opts) {
    
    opts = $.extend(true, {content:'', duration: 2200}, opts);

    var container = $('<div/>', {'class': 'notify__container notify__container--bottom-right'}),
        notify = $('<div/>', {'class': 'notify', 'html': opts.content});

    if ($('.notify__container').length <= 0) {
      $('body').append(container);
    }

    $('.notify__container').append(notify);

    setTimeout(function () {
      notify.addClass('notify--show');
    }, 100);

    setTimeout(function () {
      notifyHide(notify);
    }, opts.duration);

    notify.click(function () {
      notifyHide($(this));
    });

    function notifyHide(notify) {
      notify.removeClass('notify--show');

      notify.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
        notify.remove();
      });
    }
  }

  $.Alert = function (message) {
    var content = message;
    if (typeof message == 'object') {
      content = message.content;
    }
    $('#alert-modal-message').html(message);
    $('#alert-modal').Modal();
  }

  $.Confirm = function (message, okcallback) {
    var content = message;
    if (typeof message == 'object') {
      content = message.content;
    }
    $('#confirm-modal-message').html(message);
    $('#confirm-ok-button').off('click');
    $('#confirm-ok-button').click(function () {
      okcallback();
    });

    $('#confirm-modal').Modal();
  }

  $.Prompt = function (message, okcallback) {
    var content = message;
    if (typeof message == 'object') {
      content = message.content;
    }
    $('#prompt-modal-message').html(message);
    $('#prompt-ok-button').off('click');
    $('#prompt-ok-button').click(function () {
      var inputval = $('#prompt-input').val();
      okcallback(inputval);
      $('#prompt-input').val(null);
    });

    $('#prompt-modal').Modal();
  }

})(jQuery);