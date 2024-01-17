G.f_set_sizes = function (wh = G.wh, viewBox = G.viewBox, svg = G.EL.svg) {
  //svg.setAttribute("clientWidth", wh.x);
  //svg.setAttribute("clientHeight", wh.y);
  svg.setAttribute("viewBox", G.viewBox);
};

G.f_renew_inner_html = function (innerHTML = "", svg = G.EL.svg) {
  svg.innerHTML = innerHTML;
};

G.f_begin = function () {
  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg version="1.1"
        baseProfile="full"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:ev="http://www.w3.org/2001/xml-events"
        viewBox="` + G.viewBox + `"
        width="` + G.wh.x + `mm" height="` + G.wh.y + `mm">
`;
};

G.f_svg_total = function (svg_main) {
  return G.f_begin() + ` ` + svg_main + ` </svg>`;
};

G.f_download_file = function (my_text_data, my_file_name = "laser_cut_connector.svg", my_type = "text/plain") {
  //create invisible anchor
  var a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);

  //Binary Large Object with my_text_data and my_type
  a.href = window.URL.createObjectURL(
    new Blob([my_text_data], { my_type })
  );

  //prepare for downloading
  a.setAttribute("download", my_file_name);
  //start downloading
  a.click();
  //remove anchor link from DOM
  document.body.removeChild(a);
};

G.f_event_click_draw = function () {
  var svg_main = "";
  var obj_fig = new G.F_FIG(G.EL.textarea.value);

  G.f_set_wh(obj_fig.json.total_wh);
  G.f_set_sizes();

  svg_main += obj_fig.f_fig_grid();
  G.f_renew_inner_html(svg_main);
  return svg_main;
};

G.f_event_click_download = function () {
  G.f_download_file(G.f_svg_total(G.f_event_click_draw()));
};