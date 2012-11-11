// JavaScript Document
$(document).ready(function(){
  var currentPosition = 0;
  var slideWidth = 580;
  var slides = $('.slidetwo');
  var numberOfSlides = slides.length;

  // Remove scrollbar in JS
  $('#slidesContainertwo').css('overflow', 'hidden');

  // Wrap all .slides with #slideInner div
  slides
    .wrapAll('<div id="slideInnertwo"></div>')
    // Float left to display horizontally, readjust .slides width
	.css({
      'float' : 'left',
      'width' : slideWidth
    });

  // Set #slideInner width equal to total width of all slides
  $('#slideInnertwo').css('width', slideWidth * numberOfSlides);

  // Insert controls in the DOM
  $('#slideshowtwo')
    .prepend('<span class="controltwo" id="leftControltwo"></span>')
    .append('<span class="controltwo" id="rightControltwo"></span>');

  // Hide left arrow control on first load
  manageControls(currentPosition);

  // Create event listeners for .controls clicks
  $('.controltwo')
    .bind('click', function(){
    // Determine new position
	currentPosition = ($(this).attr('id')=='rightControltwo') ? currentPosition+1 : currentPosition-1;
    
	// Hide / show controls
    manageControls(currentPosition);
    // Move slideInner using margin-left
    $('#slideInnertwo').animate({
      'marginLeft' : slideWidth*(-currentPosition)
    });
  });

  // manageControls: Hides and Shows controls depending on currentPosition
  function manageControls(position){
    // Hide left arrow if position is first slide
	if(position==0){ $('#leftControltwo').hide() } else{ $('#leftControltwo').show() }
	// Hide right arrow if position is last slide
    if(position==numberOfSlides-1){ $('#rightControltwo').hide() } else{ $('#rightControltwo').show() }
  }	
});
// JavaScript Document// JavaScript Document