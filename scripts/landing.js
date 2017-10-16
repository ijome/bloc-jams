var points = document.getElementsByClassName('point');

var animatePoints = function (points) {

  var revealPoints = function() {
      for (var i = 0; i < points.length; i++) {
        points[i].style.opacity = 1;
        points[i].style.transform = "scaleX(1) translateY(0)";
        points[i].style.msTransform = "scaleX(1) translateY(0)";
        points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
      };
  };

  revealPoints();
};

window.onload = function() {
//automatically call animatePoints if the window is taller than 950px
  if (window.innerHeight > 950) {
    animatePoints(points);
  }

var sellingPoints = document.getElementsByClassName('selling-points')[0];
var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200

  window.addEventListener('scroll', function(event) {
    if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
      animatePoints(points);
    }
  });
}
