/*global $ */
$ = jQuery;
$(document).ready(function() {

    "use strict";
  
    //Checks if li has sub (ul) and adds class for toggle icon - just an UI
    $('.site-navigation > ul > li:has( > ul)').addClass('menu-dropdown-icon');
    
    //Checks if drodown menu's li elements have anothere level (ul), if not the dropdown is shown as regular dropdown, not a mega menu (thanks Luka Kladaric)
    $('.site-navigation > ul > li > ul:not(:has(ul))').addClass('normal-sub');

    // append mobile toggle button
    if ($(window).width() <= 1024) {
      $( '.sub-menu' ).after( '<span class="menu-toggle"></span>' );
    }
    
  
    //Mobile menu is hidden if width is more then 959px, but normal menu is displayed
    //Normal menu is hidden if width is below 959px, and jquery adds mobile menu
    //Done this way so it can be used with wordpress without any trouble
  
    //If width is more than 1024px dropdowns are displayed on hover
    $(".site-navigation > ul > li").hover(function(e) {
      if ($(window).width() > 1024) {
        $(this).children("ul").stop(true, false).fadeToggle(150);
        e.preventDefault();
      }
    });
    
    //If width is less or equal to 1024px dropdowns are displayed on click
    $("li > .menu-toggle").click(function() {
      if ($(window).width() <= 1024) {
        $(this).prev("ul").slideToggle(300);
        $(this).toggleClass('is-active');
      }
    });
    
    //when clicked on mobile-menu, normal menu is shown as a list, classic rwd menu story
    $(".open-menu").click(function(e) {
      $(".main-navigation").toggleClass('show-on-mobile');
      $(this).toggleClass('is-active');
      $(".main-navigation").slideToggle(300);
      e.preventDefault();
    });


    //hide menu on mobile
    if ($(window).width() <= 1024) {
      $('.main-navigation').hide();
    }
  });