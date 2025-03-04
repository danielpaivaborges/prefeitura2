$(function () {
  let watchScroll = 0;
  const rightComments = $(".r-event .event-body");
  const leftComments = $(".l-event .event-body");
  TweenMax.staggerFrom(rightComments, 1, { x: 100, ease: Bounce.easeOut }, 1);
  TweenMax.staggerFrom(leftComments, 1, { x: -100, ease: Bounce.easeOut }, 1);

  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();
    scrollTop > watchScroll
      ? $("footer").addClass("footer-up")
      : $("footer").removeClass("footer-up");

    watchScroll = scrollTop;
  });
});
