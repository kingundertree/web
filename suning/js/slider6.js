// JavaScript Document
$(document).ready(function(){
  var currentPosition = 0;
  var slideWidth = 580;
  var slides = $('.slidesix');
  var numberOfSlides = slides.length;

  // Remove scrollbar in JS
  $('#slidesContainersix').css('overflow', 'hidden');

  // Wrap all .slides with #slideInner div
  slides
    .wrapAll('<div id="slideInnersix"></div>')
    // Float left to display horizontally, readjust .slides width
	.css({
      'float' : 'left',
      'width' : slideWidth
    });

  // Set #slideInner width equal to total width of all slides
  $('#slideInnersix').css('width', slideWidth * numberOfSlides);

  // Insert controls in the DOM
  $('#slideshowsix')
    .prepend('<span class="controlsix" id="leftControlsix"></span>')
    .append('<span class="controlsix" id="rightControlsix"></span>');

  // Hide left arrow control on first load
  manageControls(currentPosition);

  // Create event listeners for .controls clicks
  $('.controlsix')
    .bind('click', function(){
    // Determine new position
	currentPosition = ($(this).attr('id')=='rightControlsix') ? currentPosition+1 : currentPosition-1;
    
	// Hide / show controls
    manageControls(currentPosition);
    // Move slideInner using margin-left
    $('#slideInnersix').animate({
      'marginLeft' : slideWidth*(-currentPosition)
    });
  });

  // manageControls: Hides and Shows controls depending on currentPosition
  function manageControls(position){
    // Hide left arrow if position is first slide
	if(position==0){ $('#leftControlsix').hide() } else{ $('#leftControlsix').show() }
	// Hide right arrow if position is last slide
    if(position==numberOfSlides-1){ $('#rightControlsix').hide() } else{ $('#rightControlsix').show() }
  }	
});
// JavaScript Document// JavaScript Document