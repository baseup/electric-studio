'use strict';

var ctrls = angular.module('elstudio.controllers.base', [
  'elstudio.services'
]);

ctrls.controller('NotFoundCtrl', function ($scope) {

});

ctrls.controller('AdminCtrl', function ($scope){

  $(document).ready(function(){
    
    // sidebar toggle
    $('.sidebar-toggle').click(function(){
      $('.page-sidebar').toggleClass('toggle');
      $('page-content').toggleClass('sidebar-toggled');
    });
    
    // Selectize
    $('.select').selectize({
      create: true,
      sortField: 'text'
    });
    
    //Datepicker
    $('.datepicker').pickadate({
      format: 'dd mmm yyyy',
      formatSubmit: 'yyyy/mm/dd',
      today: false
    });
    
    // Dropdown toggle
    $(document).click(function() {
      if($('[data-dropdown]').hasClass('expand')) {
        $('[data-dropdown]').removeClass('expand');
      }
    });
    
    $('[data-dropdown-toggle]').click(function(e) {
      e.stopPropagation();
      
      var id = $(this).data('dropdown-toggle'),
          target = $('[data-dropdown="'+id+'"]');
      
      target.toggleClass('expand');    
    }); 
    
    //tabs
    $('[data-tab-toggle]').click(function(e) {
      e.preventDefault();

      var id = $(this).data('tab-toggle'),
          pane = $('.tab-pane').filter('[data-tab-pane="'+id+'"]');

      $('[data-tab-toggle]').removeClass('active');
      $(this).addClass('active');

      $('.tab-pane').removeClass('tab-pane--active');
      pane.addClass('tab-pane--active');
    });
    
    //Modal popup 
    $('[data-modal-toggle]').click(function(e) {
      e.preventDefault();

      var id = $(this).data('modal-toggle'),
          modal = $('[data-modal="'+id+'"]');

      modalOpen(modal);
    });

    $('.modal-close').click(function() {
      modalClose($(this).closest('.modal'));
    });

    $('.modal').click(function(e) {
      var target = $(e.target);

      if(!target.closest('.modal__box').length) {
        modalClose($(this));
      }
    });

    function modalClose(modal) {
      modal.removeClass('show');
      modal.find('.modal__box').removeClass('show');
    }

    function modalOpen(modal) {
      modal.addClass('show');
      setTimeout(function(){
        modal.find('.modal__box').addClass('show');
      }, 100);
    }
    
    //Notify popup 
    function notification(opts) {
    
      opts = $.extend(true, {content:'', duration: 2200}, opts);

      var container = $('<div/>', {'class': 'notify__container notify__container--bottom-right'}),
          notify = $('<div/>', {'class': 'notify', 'html': opts.content});

      if($('.notify__container').length <= 0) {
        $('body').append(container);
      }

      $('.notify__container').append(notify);

      setTimeout(function() {
        notify.addClass('notify--show');
      }, 100);

      setTimeout(function() {
        notifyHide(notify);
      }, opts.duration);

      notify.click(function() {
        notifyHide($(this));
      });

      function notifyHide(notify) {
        notify.removeClass('notify--show');

        notify.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
          notify.remove();
        });
      }

    }
    
    //show notification on click
    $('.user-move-class').click(function() {
      notification({content: 'User moved to class'});
    });
    
    $('.user-remove-waitlist').click(function() {
      notification({content: 'User removed from waitlist'});
    });
    
    $('.cancel-booking').click(function() {
      notification({content: 'User booking has been cancelled'});
    });
    
    //fullcalendar
    $('.calendar').fullCalendar({
      defaultView: 'agendaWeek',
      allDaySlot: false,
      allDay: false,
      minTime: '07:00:00',
      maxTime: '20:00:00',
      events: [
        {
          title: 'Pure Electric',
          start: '2015-02-22T08:30:00',
        },
        {
          title: 'Power Hour',
          start: '2015-02-22T10:30:00'
        },
        {
          title: 'Pure Electric',
          start: '2015-02-23T08:30:00',
        },
        {
          title: 'Power Hour',
          start: '2015-02-23T11:30:00'
        },
        {
          title: 'Pure Electric',
          start: '2015-02-24T10:30:00',
        },
        {
          title: 'Power Hour',
          start: '2015-02-24T16:30:00'
        },
        {
          title: 'Pure Electric',
          start: '2015-02-25T08:30:00',
        },
        {
          title: 'Power Hour',
          start: '2015-02-25T10:30:00'
        }
      ],
      eventClick: function() {
        modalOpen($('.view-schedule'));
        
      }
    });
  });
});