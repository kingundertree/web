// JavaScript Document
$(document).ready(function(){
  var currentPosition = 0;
  var slideWidth = 890;
  var slides = $('.slideone');
  var numberOfSlides = slides.length;

  // Remove scrollbar in JS
  $('#slidesContainerone').css('overflow', 'hidden');

  // Wrap all .slides with #slideInner div
  slides
    .wrapAll('<div id="slideInnerone"></div>')
    // Float left to display horizontally, readjust .slides width
	.css({
      'float' : 'left',
      'width' : slideWidth
    });

  // Set #slideInner width equal to total width of all slides
  $('#slideInnerone').css('width', slideWidth * numberOfSlides);

  // Insert controls in the DOM
  $('#slideshowone')
    .prepend('<span class="controlone" id="leftControlone"></span>')
    .append('<span class="controlone" id="rightControlone"></span>');

  // Hide left arrow control on first load
  manageControls(currentPosition);

  // Create event listeners for .controls clicks
  $('.controlone')
    .bind('click', function(){
    // Determine new position
	currentPosition = ($(this).attr('id')=='rightControlone') ? currentPosition+1 : currentPosition-1;
    
	// Hide / show controls
    manageControls(currentPosition);
    // Move slideInner using margin-left
    $('#slideInnerone').animate({
      'marginLeft' : slideWidth*(-currentPosition)
    });
  });

  // manageControls: Hides and Shows controls depending on currentPosition
  function manageControls(position){
    // Hide left arrow if position is first slide
	if(position==0){ $('#leftControlone').hide() } else{ $('#leftControlone').show() }
	// Hide right arrow if position is last slide
    if(position==numberOfSlides-1){ $('#rightControlone').hide() } else{ $('#rightControlone').show() }
  }	
});
// JavaScript Document