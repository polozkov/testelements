G.DRAW.RGB_CUT = "black";
G.DRAW.RGB_FILL = "none";
G.DRAW.RGB_FOLDS = "red";
G.DRAW.RGB_TEXT = "green";

G.DRAW.f_path = function (d, line_width) {
  var my_style = 'stroke-width = "' + line_width + '" stroke = "' + G.DRAW.RGB_CUT + '" fill = "' + G.DRAW.RGB_FILL;
  var svg_path = '<path d="' + d + '" ' + my_style + '"/>';
  return svg_path;
};

G.DRAW.f_line = function (line_width, axy, bxy) {
  var my_style = 'stroke-width = "' + line_width + '" stroke = "' + G.DRAW.RGB_FOLDS;
  var svg_line = '<line x1="' + axy.x + '" y1="' + axy.y + '" x2="' + bxy.x + '" y2="' + bxy.y + '" ';
  return svg_line + my_style + '"/>';
};

G.DRAW.f_text = function (line_width, my_text = "R", my_center = {x:0, y:0}, my_rot = 0, my_font = 30, my_delta_rot = 90) {
  var svg_text = '<text x="0" y="0" ';
  svg_text += 'stroke-width = "' + line_width + '" ';
  svg_text += `font-family="Arial" `;
  svg_text += 'stroke = "' + G.DRAW.RGB_TEXT + '" fill = "' + 'none" ';
  svg_text += 'font-size="' + my_font + '" ';

  svg_text += 'transform="';
  svg_text += 'rotate(' + my_delta_rot + " " + my_center.x + " " + my_center.y + ') ';
  svg_text += 'translate(' +  my_center.x + "," +  my_center.y + ') ';
  svg_text += 'rotate(' + my_rot + ') ';
  svg_text += '"';
  svg_text += '>';

  //var svg_span = '<tspan text-anchor="middle" dominant-baseline="central">' + my_text + '</tspan>';

  return svg_text + my_text + '</text>';
  //'text-anchor="middle" alignment-baseline="middle"'
};