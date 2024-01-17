G.MATH.f_rot_cos_sin = function(p, cos, sin) {
  return {x: p.x * cos - p.y * sin, y: p.x * sin + p.y * cos};
};

G.MATH.f_rot_120 = function(p) {
  return G.MATH.f_rot_cos_sin(p, -0.5, sqrt(0.75));
};

G.MATH.f_rot_deg = function(p, deg) {
  return G.MATH.f_rot_cos_sin(p, Math.cos(Math.PI / 180.0 * deg), Math.sin(Math.PI / 180.0 * deg));
};

G.MATH.f_interpolate = function(axy, bxy, real_01) {
  var dxy = {x: bxy.x - axy.x, y: bxy.y - axy.y};
  var delta = {x: dxy.x * real_01, y: dxy.y * real_01};
  return ({x: axy.x + delta.x, y: axy.y + delta.y});
};

//console.log(G.MATH.f_rot_deg({x: 1, y: 0}, 60));

G.MATH.f_round = function(n, n_digits = 5) {
  var new_n = Math.round(n * (10 ** n_digits));
  if (new_n == 0) {return 0;}

  var i;
  for (i = 0; i <= n_digits; i++)
    if (!((new_n % (10 ** i)) == 0)) {
      break;
    };

  if (i == 0) {
    return new_n * (10.0 ** -n_digits);
  } 

  return n.toFixed(n_digits - i + 1);
}

//console.log(G.MATH.f_round(0.20400000000001));
//console.log(G.MATH.f_round(0.6));

G.MATH.f_to_pair = function(p, separator = ",") {
  return G.MATH.f_round(p.x) + separator + G.MATH.f_round(p.y);
};

G.array_gen = function (len, f) {
  var result_array = [];
  for (let i = 0; i < len; i++) result_array.push(f(i));
    return result_array;
}