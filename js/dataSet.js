import * as d3 from "d3";

// 데이터 세트
const dataSet = [100, 200, 20, 45, 300];
// 그래프 그리기
const svg = d3
  .select(".vertical-wrap")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);
drawGraph(dataSet);
function drawGraph(dataSet) {
  const maxValue = Math.max(...dataSet);

  const OriginAttr = {
    fill: "rgba(255, 0, 0, 0)"
  };

  svg
    .selectAll("rect") // 대상 요소 설정
    .data(dataSet) // 데이터 세트 설정
    .enter() // 데이터 수에 따라 요소 추가
    .append("rect") // 사각형 SVG 만들기
    .attr("x", 0) // X 좌표(시점)
    .attr("y", (d, i) => {
      return i * 25;
    }) // Y 좌표(각 데이터 세트의 드로잉 위치)
    .attr("width", (d, i) => {
      return `${d}px`;
    }) // 가로 막대 그래프의 가로폭(X 좌표의 끝점)
    .attr("height", "20px") // 가로 막대 그래프의 세로 폭
    .attr("fill", (d, i) => {
      return `rgba(255, 0, 0, ${d / maxValue})`;
    }) // 막대 그래프 색
    .on("mouseover", function() {
      OriginAttr.fill = this.attributes.fill.value; // 변경 전의 상태를 기억
      d3.select(this).attr("fill", "blue"); // 클릭된 그래프의 색상 변경
    })
    .on("mouseout", function() {
      d3.select(this).attr("fill", OriginAttr.fill); // 변경 전의 상태로 되돌린다
    });
}
