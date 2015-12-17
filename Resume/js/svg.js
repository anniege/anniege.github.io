svgDraw = function () {


  var r = 60, x0, y0,
  arc1, arc2, arc3, arc4;

  y0 = document.getElementsByTagName('svg')[0].getAttribute('height')/2;
  x0 = document.getElementsByTagName('svg')[0].getAttribute('width')/2;

  console.log(x0 +' and ' + y0);

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = angleInDegrees * Math.PI / 180.0;
    
    return {
     x: centerX + radius * Math.cos(angleInRadians),
     y: centerY + radius * Math.sin(angleInRadians)
   };
 }

 function describeArc (x0, y0, radius, startAngle, endAngle) {
   var start = polarToCartesian(x0, y0, radius, startAngle);
   var end = polarToCartesian(x0, y0, radius, endAngle);

   var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

   var d = ["M", start.x, start.y, "A", radius, radius, 0, arcSweep, 1, end.x, end.y].join(" ");

   return d;
 }

 arc1 = document.getElementById('line1').setAttribute("d", describeArc(x0, y0, r, 20, 110));
 arc2 = document.getElementById('line2').setAttribute("d", describeArc(x0, y0, r, 110, 170));
 arc3 = document.getElementById('line3').setAttribute("d", describeArc(x0, y0, r, 170, 260));
 arc4 = document.getElementById('line4').setAttribute("d", describeArc(x0, y0, r, 260, 20));

 var myVivus = new Vivus(document.getElementById('chart'), {
  type: 'oneByOne',
  duration: 100,
  animTimingFunction: Vivus.EASE
});

}


