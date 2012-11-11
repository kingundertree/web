// JavaScript Document
$(document).ready(function(){
  var currentPosition = 0;
  var slideWidth = 580;
  var slides = $('.slidefive');
  var numberOfSlides = slides.length;

  // Remove scrollbar in JS
  $('#slidesContainerfive').css('overflow', 'hidden');

  // Wrap all .slides with #slideInner div
  slides
    .wrapAll('<div id="slideInnerfive"></div>')
    // Float left to display horizontally, readjust .slides width
	.css({
      'float' : 'left',
      'width' : slideWidth
    });

  // Set #slideInner width equal to total width of all slides
  $('#slideInnerfive').css('width', slideWidth * numberOfSlides);

  // Insert controls in the DOM
  $('#slideshowfive')
    .prepend('<span class="controlfive" id="leftControlfive"></span>')
    .append('<span class="controlfive" id="rightControlfive"></span>');

  // Hide left arrow control on first load
  manageControls(currentPosition);

  // Create event listeners for .controls clicks
  $('.controlfive')
    .bind('click', function(){
    // Determine new position
	currentPosition = ($(this).attr('id')=='rightControlfive') ? currentPosition+1 : currentPosition-1;
    
	// Hide / show controls
    manageControls(currentPosition);
    // Move slideInner using margin-left
    $('#slideInnerfive').animate({
      'marginLeft' : slideWidth*(-currentPosition)
    });
  });

  // manageControls: Hides and Shows controls depending on currentPosition
  function manageControls(position){
    // Hide left arrow if position is first slide
	if(position==0){ $('#leftControlfive').hide() } else{ $('#leftControlfive').show() }
	// Hide right arrow if position is last slide
    if(position==numberOfSlides-1){ $('#rightControlfive').hide() } else{ $('#rightControlfive').show() }
  }	
});
// JavaScript Document// JavaScript Document