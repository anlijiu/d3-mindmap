import React, { useEffect, useRef, useState } from 'react'
import { select } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'
import { axisLeft, axisBottom } from 'd3-axis'
import { tree, hierarchy } from 'd3-hierarchy';
import flextree from './flextree';
import BezierModule from '../bezier';
const { Bezier } = BezierModule;
console.log("  bezier : ", Bezier)
// const { Bezier } = bezier

// margin convention often used with D3
const margin = { top: 80, right: 60, bottom: 80, left: 60 }
const width = 800 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

const color = ['#f05440', '#d5433d', '#b33535', '#283250']

const MindMap = ({ data }) => {
  const d3svg = useRef(null)

  const [context] = useState(() => {
    const canvas = document.createElement('canvas');
    return canvas.getContext('2d');
  })

  const getSize = (txt) => context.measureText(txt)

  const linearDistanceFunction = (d, tlen, alen, slen) => {
    return v => {
      const f1 = alen / tlen,
        f2 = (alen + slen) / tlen;
      return map(v, 0, 1, f1 * d, f2 * d);
    };
  }

  const constrain = (v, s, e) => {
    return v < s ? s : v > e ? e : v;
  }

  const map = (v, s, e, ns, ne, c = false) => {
    const i1 = e - s,
      i2 = ne - ns,
      p = v - s;
    let r = ns + (p * i2) / i1;
    if (c) return constrain(r, ns, ne);
    return r;
  }

  const outline = (curve, d) => {
    const reduced = curve.reduce();
    const fcurves = [];

    let bcurves = [],
      alen = 0,
      tlen = curve.length();

    // form curve oulines
    reduced.forEach(segment => {
      let slen = segment.length();
      fcurves.push(segment.scale(linearDistanceFunction(d, tlen, alen, slen)));
      bcurves.push(segment.scale(linearDistanceFunction(-d, tlen, alen, slen)));
      alen += slen;
    });

    // reverse the "return" outline
    bcurves = bcurves
      .map(s => {
        s.points = s.points.reverse();
        return s;
      })
      .reverse();

    return [...fcurves, ...bcurves];
  }

  const blink = (d, s) => {
    if(d.source.parent !== null) {
      return "M" + d.target.y + "," + d.target.x + "C" + (d.target.y + d.source.y) / 2.5 + "," + d.target.x + " " + (d.target.y + d.source.y) / 2 + "," + d.source.x + " " + d.source.y + "," + d.source.x;
    } else {
      const sizeSource = context.measureText(d.source.data.name);
      const sizeTarget = context.measureText(d.target.data.name);
      let origBezier;
      // if(Math.abs(d.target.y - d.source.y) > Math.abs(d.target.x - d.source.x)) {
        origBezier = new Bezier([
          s == 1 ? d.source.y + 10 : d.source.y - 10, d.source.x + 0.01*(d.target.x - d.source.x),//终点
          d.target.y - 0.3*(d.target.y - d.source.y), d.source.x + 0.3*(d.target.x - d.source.x),//控制点1
          d.source.y + 0.3*(d.target.y - d.source.y), d.target.x,//控制点2
          s == 1 ? d.target.y - 30 : d.target.y + 30, d.target.x,//起点
        ]);
      // } else {
      //   origBezier = new Bezier([
      //     d.target.y, d.target.x,//起点
      //     d.source.y, d.target.x,//控制点1
      //     d.source.y, d.source.x//终点
      //   ]);
      // }
      // let origBezier = new Bezier([
      //     d.target.y, d.target.x,//起点
      //     d.source.y, d.target.x,//控制点2
      //     d.target.y, d.source.x,//控制点1
      //     d.source.y, d.source.x//终点
      // ]);
      console.log("d.target.y: ", d.target);
      console.log("d.target.x: ", d.target.x);
      console.log("d.source.y: ", d.source);
      console.log("d.source.x: ", d.source.x);
      // const outlineBeziers = outline(origBezier, 20);
      let p;
      // if(d.target.x !== d.source.x && d.source.y != d.target.y) {
        const outline = origBezier.outline(3, 3, 1, 1);
        p = outline.curves.reduce((total, item, index) => `${total} ${index ==0 ? item.toSVG() : item.toSVG().replace('M', 'L')}`, "")
      // } else {
      //   p = origBezier.toSVG();
      // }
      p += 'Z';
      console.log("final P : ", p)
      return p;
    }
  }
  const drawTree = (svg, root, pos) => {
    var SWITCH_CONST = 1;
    if (pos === "left") {
      SWITCH_CONST = -1;
    }

    var width  = +svg.attr("width"),
        height = +svg.attr("height")

    // Shift the entire tree by half it's width
    var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const layout = flextree()
      // .nodeSize(node => [40,  150])
      .nodeSize(node => {
        const tsize = getSize(node.data.data.name)
        const size = [30, (tsize.width+100)]
        console.log(node.data.data.name, " measure size: ", size)
        return size
      })
      .spacing((nodeA, nodeB) => 30);

    const t = layout.hierarchy(root);
    layout(t);
    console.log("dump: ", layout.dump(t)); 


    var nodes = t.descendants().reverse();
    var links = t.links();
    // Set both root nodes to be dead center vertically
    nodes.forEach(function (d) { d.y = d.depth * 130*SWITCH_CONST; if(d.depth==1) d.y+=50*SWITCH_CONST });

    console.log("nodes are ", nodes)
    // Create links
    var link = g.selectAll(".link")
      .data(links)
      .enter()

    link.append("path")
      .attr("class", "link")
      .attr("d", (d) => blink(d, SWITCH_CONST))
      // .attr("stroke", (d) => "#5555")
      .attr("stroke", function(d) { return d.source.parent ? "#555": "none" } )
      .attr("fill", function(d) { return d.source.parent ? "none": "url(#mygrad)" } );
    // Create nodes
    var node = g.selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", function(d) {
        return "node" + (d.children ? " node--internal" : " node--leaf");
      })
      .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
      })

    node.append("circle")
      .attr('cx', d => d.ySize/4)
      .attr('cy', d => 0)
      .attr("r", function(d, i) {
        return 2.5
      });

    node.append("text")
      .attr("dy", 3)
      .style("text-anchor", "middle")
      .text(function(d) {
        return d.data.data.name
      });
  }

  useEffect(() => {
    if (data && d3svg.current) {



      var split_index = Math.round(data.children.length / 2)
      // Left data
      var data1 = {
        "name": data.name,
        "children": JSON.parse(JSON.stringify(data.children.slice(0, split_index)))
      };
      // Right data
      var data2 = {
        "name": data.name,
        "children": JSON.parse(JSON.stringify(data.children.slice(split_index)))
      };
      // Create d3 hierarchies
      var right = hierarchy(data1);
      var left = hierarchy(data2);
      let svg = select(d3svg.current)

      var lg = svg.append("defs").append("linearGradient")
        .attr("id", "mygrad")//id of the gradient
        .attr("x1", "0%")
        .attr("x2", "0%")
        .attr("y1", "0%")
        .attr("y2", "100%")//since its a vertical linear gradient 
      ;
      lg.append("stop")
        .attr("offset", "0%")
        .style("stop-color", "red")//end in red
        .style("stop-opacity", 1)

      lg.append("stop")
        .attr("offset", "100%")
        .style("stop-color", "blue")//start in blue
        .style("stop-opacity", 1)

      svg.append("circle")
        .attr('stroke-width', '2.5')
        .attr('stroke', '#ff00f0')
        .attr('cx', d => 400)
        .attr('cy', d => 200)
        .attr('r', 5)

      // Render both trees
      drawTree(svg, right, "right")
      drawTree(svg, left, "left")
    }
  }, [data])

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      className="mindmap-container"
      role="img"
      ref={d3svg}
    ></svg>
  )
}

export default MindMap 

// style={{ pointerEvents: 'all', width: '100%', height: '100%' }}
