import * as d3 from "d3";

const nodes = [
  // nodes는 요소 자체에 대한 정보를 담고 있습니다.
  {
    id: "a사",
    직원수: 11,
    유형: "주식회사"
  },
  {
    id: "b사",
    직원수: 8,
    유형: "학원"
  },
  {
    id: "c사",
    직원수: 7,
    유형: "연구원"
  },
  {
    id: "d사",
    직원수: 7,
    유형: "출판사"
  },
  {
    id: "e사",
    직원수: 32,
    유형: "주식회사"
  },
  {
    id: "f사",
    직원수: 11,
    유형: "주식회사"
  }
];

const links = [
  // links는 연결에 대한 정보를 담고 있습니다.
  {
    source: "a사",
    target: "b사",
    거리: 8
  },
  {
    source: "a사",
    target: "c사",
    거리: 9
  },
  {
    source: "a사",
    target: "d사",
    거리: 9
  },
  {
    source: "a사",
    target: "e사",
    거리: 8
  },
  {
    source: "a사",
    target: "f사",
    거리: 8
  },
  // 분할
  {
    source: "b사",
    target: "c사",
    거리: 3
  },
  {
    source: "b사",
    target: "d사",
    거리: 4
  },
  {
    source: "b사",
    target: "e사",
    거리: 4
  },
  {
    source: "b사",
    target: "f사",
    거리: 5
  },
  // 분할
  {
    source: "d사",
    target: "e사",
    거리: 3
  },
  {
    source: "d사",
    target: "f사",
    거리: 3
  }
];

// 그래프를 그리기 위한 객체
const networkGraph = {
  createGraph: function(nodes, links) {
    // svg의 크기
    const width = 800;
    const height = 800;

    // 그룹별로 color
    const fillColor = function(g) {
      if (g == "주식회사") {
        return "pink";
      } else if (g == "학원") {
        return "skyblue";
      } else if (g == "학원") {
        return "blue";
      } else {
        return "red";
      }
    };

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id(d => d.id)
      )
      .force("charge", d3.forceManyBody().strength(0)) // 모든 노드 간에 힘, 양이면 당기고 음수면 반발합니다.
      .force("center", d3.forceCenter(width / 2, height / 2)) // 중력의 중심점
      .force(
        "collide",
        d3.forceCollide().radius(d => d.직원수 * 9)
      ); // 노드가 겹치지 않게, 줄이면 겹쳐집니다.

    const svg = d3
      .select("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g");

    const link = g
      .append("g")
      .attr("stroke", "black")
      .attr("stroke-opacity", "0.3") // 라인의 투명도, 선이 겹치는 경우가 많아 보통 투명하게 설정
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.거리 * 3)); // 거리에 비례하여 두깨 설정

    const node = g
      .append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .each(function(d) {
        d3.select(this)
          .append("circle")
          .attr("r", d.직원수 * 5)
          .attr("fill", fillColor(d.유형));

        d3.select(this)
          .append("text")
          .text(`회사명 : ${d.id}, 직원수 : ${d.직원수}`)
          .attr("dy", 0) //0과 100을 설정해보세요.
          .style("text-anchor", "middle");
      })
      .call(drag(simulation));

    simulation.on("tick", function() {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    return svg.node();
  }
};

function drag(simulation) {
  function start(event, d) {
    // event와 d값이 들어가게 됩니다.
    if (!event.active) {
      simulation.alphaTarget(0.3).restart();
    } //시뮬레이션 재시작
    // alphaTarget은 0 ~ 1의 값을 가집니다. 처음에 시작되는 애니메이션이라 생각하시면 됩니다.
    d.fx = d.x;
    d.fy = d.y;

    console.log(event);
    console.log(d);
    console.log(this);
    d3.select(this)
      .select("circle")
      .attr("stroke", "black")
      .attr("stroke-width", "10px");
  }

  function drag(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function end(event, d) {
    if (!event.active) {
      simulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;

    d3.select(this)
      .select("circle")
      .attr("stroke", "null")
      .attr("stroke-width", "null");
  }

  return d3
    .drag()
    .on("start", start)
    .on("drag", drag)
    .on("end", end);
}

networkGraph.createGraph(nodes, links);
