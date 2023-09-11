import "../scss/style.scss";
import barGraph from "./main.js";
import arc from "./arc.js";
import grScatter from "./gr_scatter.js";
import mapGr from "./map.js";
import areaLine from "./area_line.js";
import brokenLine from "./broken_line.js";
import commonGr from "./common.js";

document.addEventListener("DOMContentLoaded", async () => {
  commonGr();
  barGraph();
  arc();
  grScatter();
  mapGr();
  areaLine();
  brokenLine();
});
