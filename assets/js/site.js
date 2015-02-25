(function($) {
  
  $(document).ready(function() {
    
    var login = $('.header-form-container.login'),
        signup = $('.header-form-container.signup'),
        book = $('.book-menu'),
        loginToggle = $('.login-toggle'),
        signupToggle = $('.signup-toggle'),
        bookToggle = $('.book-toggle'),
        menuToggle = $('.menu-toggle');
    
    $('.slider-container').unslider({
      fluid: true,
      dots: true,
      delay: 5000,
      speed: 700,
    });

    $('.fit-text span').fitText(2);
    
    loginToggle.click(function() {
      login.toggleClass('show');
      signup.add(book).removeClass('show');
    });
    
    signupToggle.click(function() {
      signup.toggleClass('show');
      login.add(book).removeClass('show');
    });
    
    bookToggle.click(function() {
      book.toggleClass('show');
      login.add(signup).removeClass('show');
    });
    
    menuToggle.click(function() {
      $('.main-menu').toggleClass('show');
    });
    
    // Seats
    $('.seats td').not('.unavailable').find('span').click(function() {
      $('.seats td').removeClass('selected');
      $(this).parent('td').toggleClass('selected');
    });
    
  });
  
  $(window).resize(function() {
    var winH = $(this).height(), 
        headerH = $('.main-header').outerHeight(),
        footerH = $('.main-footer').height();
    
    if($(this).width() >= 980){
      $('.fitscreen').find('.slide, .content-wrap').height(winH - (headerH + footerH));
    }
    
  }).trigger('resize');
  
  
})(jQuery);