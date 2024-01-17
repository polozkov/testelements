G.F_FIG = function(input_json_string) {
  this.input_json_string = input_json_string;
  this.json = JSON.parse(input_json_string);
  //console.log(this.json);
};

G.F_FIG.prototype.f_one_arc_string = function (xy_left, xy_right, R, i, n_legs, my_json) {
  var deg_step = 360.0 / n_legs;
  var final_to = G.MATH.f_rot_deg(xy_left, deg_step * (i + 1));
  var d = "";

  //var final_from = G.MATH.f_rot_deg(xy_right, deg_step * i);
  //d += "M " + G.MATH.f_to_pair(final_from);
  d += " A " + R + "," + R + " 0 " + ((my_json.leg_amount == 1) ? 1 : 0) + " 1 " + G.MATH.f_to_pair(final_to);
  return d;
};

G.F_FIG.prototype.f_one_leg_string = function(xy_left, xy_right, R, deg_absolute, R_extra, w50, my_json) {
  //var final_inner_from = G.MATH.f_rot_deg(xy_left, deg_absolute);
  //var final_inner_to = G.MATH.f_rot_deg(xy_right, deg_absolute);

  //var final_outer_from = G.MATH.f_rot_deg({x: -w50, y: -R_extra}, deg_absolute);
  //var final_outer_to = G.MATH.f_rot_deg({x: w50, y: -R_extra}, deg_absolute);


  var DEEP_TOP_1 = 8;
  var DEEP_TOP_2 = 10;
  var DEEP_LOW_2 = 18;
  var DEEP_LOW_1 = 20;
  var DEEP_SIDE = my_json.depth_of_cutting;

  var [low0, low1, low2_outer, low2_inner, top2_inner, top2_outer, top1, top0, top_finish] = [0,1,2,3,4,5,6,7,8];
  //deep_side_sign +1 for Left; -1 for Right (cut)
  function f_L(is_with_rotation = true, deep_side_sign = 1) {
    var h = [xy_left.y, -R_extra+DEEP_LOW_1, -R_extra+DEEP_LOW_2, -R_extra+DEEP_TOP_2, -R_extra+DEEP_TOP_1, -R_extra];

    var low0 = {x: xy_left.x, y: h[0]};
    var low1 = {x: -w50, y: h[1]};
    var low2_outer = {x: -w50, y: h[2]};
    var low2_inner = {x: -w50+DEEP_SIDE, y: h[2]};

    var top2_inner = {x: -w50+DEEP_SIDE, y: h[3]};
    var top2_outer = {x: -w50, y: h[3]};
    var top1 = {x: -w50, y: h[4]};
    var top0 = {x: -w50, y: h[5]};

    var top_finish = {x: 0, y: h[5]};

    var L = [low0, low1, low2_outer, low2_inner, top2_inner, top2_outer, top1, top0, top_finish];
    var L_rot = G.array_gen(L.length, i => G.MATH.f_rot_deg(L[i], deg_absolute));
    return is_with_rotation ? L_rot : L;
  }

  function f_R(is_with_rotation = true) {
    var L = f_L(false, -1);
    var R = G.array_gen(L.length, (i => ({x: -L[i].x, y: L[i].y})));
    var R_rot = G.array_gen(R.length, i => G.MATH.f_rot_deg(R[i], deg_absolute));
    return is_with_rotation ? R_rot : R;
  }

  var d = "";

  //[low0, low1, low2_outer, low2_inner, top2_inner, top2_outer, top1, top0]
  d += "L " + G.MATH.f_to_pair(f_L()[low1]) + " ";
  d += "Q " + G.MATH.f_to_pair(f_L()[low2_outer]) + " " +  G.MATH.f_to_pair(f_L()[low2_inner]) + " ";
  d += "L " + G.MATH.f_to_pair(f_L()[top2_inner]) + " ";
  d += "Q " + G.MATH.f_to_pair(f_L()[top2_outer]) + " " +  G.MATH.f_to_pair(f_L()[top1]) + " ";
  //d += "L " + G.MATH.f_to_pair(f_L()[top0]) + " ";

  d += "Q " + G.MATH.f_to_pair(f_L()[top0]) + " " +  G.MATH.f_to_pair(f_L()[top_finish]) + " ";
  d += "L " + G.MATH.f_to_pair(f_R()[top_finish]) + " ";
  d += "Q " + G.MATH.f_to_pair(f_R()[top0]) + " " +  G.MATH.f_to_pair(f_R()[top1]) + " ";
  //d += "L " + G.MATH.f_to_pair(f_R()[top0]) + " ";

  //d += "L " + G.MATH.f_to_pair(f_R()[top1]) + " ";
  d += "Q " + G.MATH.f_to_pair(f_R()[top2_outer]) + " " +  G.MATH.f_to_pair(f_R()[top2_inner]) + " ";
  d += "L " + G.MATH.f_to_pair(f_R()[low2_inner]) + " ";
  d += "Q " + G.MATH.f_to_pair(f_R()[low2_outer]) + " " +  G.MATH.f_to_pair(f_R()[low1]) + " ";
  d += "L " + G.MATH.f_to_pair(f_R()[low0]) + " ";

  
  //d +=  "L " + G.MATH.f_to_pair(f_R()[f_L().length - 1]) + " " + G.MATH.f_to_pair(f_R()[0]);
  return d;
};

G.F_FIG.prototype.f_circle_by_two_arcs = function (R) {
  var d = "";
  var top = {x: 0, y: -R};
  var low = {x: 0, y : R};
  d += "M " + G.MATH.f_to_pair(top);
  d += " A " + R + " " + R + " 0 1 0 " + G.MATH.f_to_pair(low);
  d += " A " + R + " " + R + " 0 1 0 " + G.MATH.f_to_pair(top);
  return d + " z";
};


G.F_FIG.prototype.f_dash_line_for_fold = function (axy, bxy, my_json) {
  var fold_lines_amount = my_json.fold_dash_lines_amount;
  var fold_percentage = my_json.fold_dash_lines_percentage;

  if (!fold_lines_amount) return "";

  var ratio_cut = fold_percentage * 0.01 / fold_lines_amount;
  var ratio_not_cut = (100 - fold_percentage) * 0.01 / (fold_lines_amount + 1);
  var ratio_step = ratio_not_cut + ratio_cut;
  var svg = "";

  for (let i = 0; i < fold_lines_amount; i++) {
    let i_ratio_from = ratio_not_cut + i * ratio_step;
    let i_axy = G.MATH.f_interpolate(axy, bxy, i_ratio_from);
    let i_bxy = G.MATH.f_interpolate(axy, bxy, i_ratio_from + ratio_cut);
    //console.log(ratio_cut, ratio_not_cut, i_ratio_from);
    svg += G.DRAW.f_line(my_json.line_width, i_axy, i_bxy) + " ";
  };
  return svg;
};

G.F_FIG.prototype.f_one_element = function(translate_detail = {x:0, y:0}, input_json_string = this.input_json_string) {
  var my_json = JSON.parse(input_json_string);
  var n_legs = my_json.leg_amount;
  var r_outer = my_json.r_outer;
  var R = my_json.r_inner;
  
  var f_w50 = (i, is_fold) => (my_json.leg_width_start + i * my_json.leg_width_delta) * 0.5;
  var f_h = (i, is_fold) => Math.sqrt(R * R - f_w50(i) * f_w50(i) * (is_fold ? 0 : 1));
  var f_p_left = (i, is_fold) => ({x: -f_w50(i, is_fold), y: -f_h(i, is_fold)});
  var f_p_right = (i, is_fold) => ({x: f_w50(i, is_fold), y: -f_h(i, is_fold)});

  var d = "";
  d += "M " + G.MATH.f_to_pair(f_p_left(0));

  var leg_folds = "";
  var leg_texts = "";

  for (let i = 0; i < n_legs; i++) {
    let p_left = f_p_left(i);
    let p_right = f_p_right(i);
    let i_deg = 360.0 / n_legs * i;
    d += this.f_one_leg_string(p_left, p_right, R, i_deg, r_outer, f_w50(i), my_json);
    let i_next = (i+1) % n_legs;
    d += this.f_one_arc_string(f_p_left(i_next), p_right, R, i, n_legs, my_json) + " ";
  }

  for (let i = 0; i < n_legs; i++) {
    let i_deg = 360.0 / n_legs * i;
    leg_folds += this.f_dash_line_for_fold(G.MATH.f_rot_deg(f_p_left(i, 1), i_deg), G.MATH.f_rot_deg(f_p_right(i, 1), i_deg), my_json);
  }

  for (let i = 0; i < n_legs; i++) {
    let i_deg = 360.0 / n_legs * i;
    let w50 = f_w50(i);
    let i_font = r_outer * 0.1;
    let i_center_0 = {x: 0 - i_font * 0.33, y: -(r_outer * 0.6)};
    let i_center = G.MATH.f_rot_deg(i_center_0, i_deg);
    let i_text = G.MATH.f_round((w50 * 2), 1) + "";
    leg_texts += G.DRAW.f_text(my_json.line_width, i_text, i_center, i_deg, i_font);
  }

  if (!my_json.is_text) {leg_texts = "";}

  d += " z " + this.f_circle_by_two_arcs(my_json.r_hole);

  var group = G.DRAW.f_path(d, my_json.line_width) + leg_folds + leg_texts;

  var group_start = '<g transform="translate(' + translate_detail.x + ',' + translate_detail.y + ')">';
  return group_start + group + '</g>';
};
