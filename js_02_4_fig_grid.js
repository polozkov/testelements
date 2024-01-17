G.F_FIG.prototype.f_fig_json_xy = function (my_json, nx, ny) {
  var copy_json = JSON.parse(JSON.stringify(my_json));

  copy_json.start_center.x += (nx + (ny % 2) * 0.5) * copy_json.shift_xy.x;
  copy_json.start_center.y += ny * copy_json.shift_xy.y;

  var i = nx + ny * copy_json.n_xy.x;
  copy_json.leg_width_start += i * 2 * copy_json.leg_width_delta;
  copy_json.r_hole += i * copy_json.r_hole_delta;

  return copy_json;
};

G.F_FIG.prototype.f_fig_grid = function () {
  var my_json = JSON.parse(this.input_json_string);
  //my_json.leg_amount = 3;

  G.f_set_wh(my_json.total_wh);

  var svg_grid = "";

  for (let iy = 0; iy < my_json.n_xy.y; iy++)
  for (let ix = 0; ix < my_json.n_xy.x; ix++) {
    let i_json = this.f_fig_json_xy(my_json, ix, iy);
    svg_grid += G.F_FIG.prototype.f_one_element(i_json.start_center, JSON.stringify(i_json));
  }

  return svg_grid;
};