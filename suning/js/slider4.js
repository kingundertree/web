// JavaScript Document
$(document).ready(function(){
  var currentPosition = 0;
  var slideWidth = 580;
  var slides = $('.slidefour');
  var numberOfSlides = slides.length;

  // Remove scrollbar in JS
  $('#slidesContainerfour').css('overflow', 'hidden');

  // Wrap all .slides with #slideInner div
  slides
    .wrapAll('<div id="slideInnerfour"></div>')
    // Float left to display horizontally, readjust .slides width
	.css({
      'float' : 'left',
      'width' : slideWidth
    });

  // Set #slideInner width equal to total width of all slides
  $('#slideInnerfour').css('width', slideWidth * numberOfSlides);

  // Insert controls in the DOM
  $('#slideshowfour')
    .prepend('<span class="controlfour" id="leftControlfour"></span>')
    .append('<span class="controlfour" id="rightControlfour"></span>');

  // Hide left arrow control on first load
  manageControls(currentPosition);

  // Create event listeners for .controls clicks
  $('.controlfour')
    .bind('click', function(){
    // Determine new position
	currentPosition = ($(this).attr('id')=='rightControlfour') ? currentPosition+1 : currentPosition-1;
    
	// Hide / show controls
    manageControls(currentPosition);
    // Move slideInner using margin-left
    $('#slideInnerfour').animate({
      'marginLeft' : slideWidth*(-currentPosition)
    });
  });

  // manageControls: Hides and Shows controls depending on currentPosition
  function manageControls(position){
    // Hide left arrow if position is first slide
	if(position==0){ $('#leftControlfour').hide() } else{ $('#leftControlfour').show() }
	// Hide right arrow if position is last slide
    if(position==numberOfSlides-1){ $('#rightControlfour').hide() } else{ $('#rightControlfour').show() }
  }	
});
// JavaScript Document// JavaScript Document