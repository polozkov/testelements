var G = {
  MATH: {},
  F_FIG: {},

  DRAW: {},

  EL: {
    svg: document.getElementById("id_main_svg"),
    textarea: document.getElementById("id_textarea"),

    button_download: document.getElementById("id_button_download"),
    button_draw: document.getElementById("id_button_draw")
  }
};

G.EL.textarea.value = `{
  "leg_amount": 2,
  "leg_width_start": 4,
  "leg_width_delta": 0.1,

  "r_hole": 2.5,
  "r_hole_delta": 0.075,
  "r_inner": 15,
  "r_outer": 40,

  "fold_dash_lines_amount": 2, 
  "fold_dash_lines_percentage": 10,
  
  "depth_of_cutting": 0.5,

  "is_text": 1,
  "line_width": 0.0762,

  "total_wh": {"x": 330, "y": 290},
  "start_center": {"x": 17, "y": 42},
  "shift_xy": {"x": 31, "y": 50},
  "n_xy": {"x": 10, "y": 5}
}`;

G.f_set_wh = function (wh, scale = 1) {
  G.wh = {x: wh.x * scale, y: wh.y * scale};
  //G.viewBox = (G.wh.x) * (-0.5) + " " + (G.wh.y) * (-0.5) + " " + G.wh.x + " " + G.wh.y;
  G.viewBox = "0 0 " + G.wh.x + " " + G.wh.y;
//console.log(G.viewBox);
};

G.f_set_wh(JSON.parse(G.EL.textarea.value).total_wh, 1);

