import React, { useEffect, useRef, useState, useMemo } from 'react'
import PropTypes from 'prop-types';
import { Remarkable } from 'remarkable';
import rkatex from 'remarkable-katex';
import Prism from 'prismjs';
import { select } from 'd3-selection'
import transition from 'd3-transition';
import { scaleOrdinal, scaleLinear, scaleBand } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { axisLeft, axisBottom } from 'd3-axis';
import { linkHorizontal } from 'd3-shape';
import { tree, hierarchy } from 'd3-hierarchy';
import loadLanguages from 'prismjs/components/index.js';
import flextree from './flextree';
import BezierModule from '../bezier';
import { buildTree, cleanNode } from './markmap/lib';
import { getId, walkTree, childSelector } from './markmap/utils';
const { Bezier } = BezierModule;
console.log("  bezier : ", Bezier)
// const { Bezier } = bezier

// margin convention often used with D3
const margin = { top: 80, right: 60, bottom: 80, left: 60 }
const width = 800 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom


const color = ['#f05440', '#d5433d', '#b33535', '#283250']

const AnotherMindMap = ({ data, color }) => {
  const idRef = useRef(getId());
  const d3svg = useRef(null);
  const invisible = useRef(null);
  const [md] = useState (() => {
    const markable = new Remarkable({
      html: true,
      breaks: true,
      maxNesting: Infinity,
    });
    markable.block.ruler.enable([
      'deflist',
    ]);

    markable.use(rkatex);

    markable.set({
      highlight: (str, lang) => {
        let grammar = Prism.languages[lang];
        if (!grammar) {
          loadLanguages([lang]);
          grammar = Prism.languages[lang];
        }
        if (grammar) {
          return Prism.highlight(str, grammar, lang);
        }
        return '';
      },
    });
    return markable;
  })

  const rootData = useMemo(() => {
    const tokens = md.parse(data || '', {});
    let root = buildTree(tokens, md)
    cleanNode(root);
    if (root.children?.length === 1) root = root.children[0];
    const { children , ...rootProps } = root;
    const split_index = Math.round(children.length / 2)
    // Left data
    const leftData = {
      ...rootProps,
      children: children.slice(0, split_index)
    };
      // Right data
    const rightData = {
      ...rootProps,
      children: children.slice(split_index)
    };

    return { leftData, rightData };
  }, [data]);

  console.log(" rootData: ", rootData );

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
// d="M377,-56.5C269.6,-56.5 337,9 297,9"
  const linkShape = ({source, target, ratio = 1, staticWidth = true}) => {
    console.log("linkShape, source:", source, ",  target:", target)
    if(staticWidth) {
      const linkShape = linkHorizontal() 
      return linkShape({source, target});
      // return "M" + target[0] + " " + target[1] + "C" + (target[0] + source[0]) / 2.5 + "," + target[1] + " " + (target[0] + source[0]) / 2 + "," + source[1] + " " + source[0] + "," + source[1];
    } else {
      let origBezier = new Bezier([
          source[0], source[1] + 0.01*(target[1] - source[1]),//终点
          target[0] - 0.3*(target[0] - source[0]), source[1] + 0.3*(target[1] - source[1]),//控制点1
          source[0] + 0.3*(target[0] - source[0]), target[1],//控制点2
          target[0], target[1],//起点
        ]);
      let p;
      const outline = origBezier.outline(3, 3, .1, .1);
      p = outline.curves.reduce((total, item, index) => `${total} ${index ==0 ? item.toSVG() : item.toSVG().replace('M', 'L')}`, "")
      p += 'Z';
      console.log("final P : ", p)
      return p;
    }
  }

  const adjustSpacing = (tree, spacing, SWITCH_CONST) => {
    walkTree(tree, (d, next) => {
      d.ySizeInner = d.ySize - spacing;
      console.log("adjustSpacing: ySizeInner", d.ySizeInner, "   d.ySize:", d.ySize)
      const leftw = SWITCH_CONST == 1 ? 0 : d.ySizeInner;
      d.y += spacing + leftw; //* SWITCH_CONST;
      next();
    }, 'children');
  }


  const linkWidth = (nodeData) => {
    const data = nodeData.data;
    return Math.max(6 - 2 * data.depth, 1.5);
  }

  const handleClick = (e, d) => {
    const { data } = d;
    data.payload = {
      ...data.payload,
      fold: !data.payload?.fold,
    };

    console.log("handleClick  data:", data)
    // this.renderData(d.data);
  }

  const drawTree = (svg, root, pos) => {
    let SWITCH_CONST = 1;
    const spacingHorizontal = 50;
    const spacingVertical = 5;
    const paddingX = 8;
    const diameter = 12;
    const radius = 6;

    if (pos === "left") {
      SWITCH_CONST = -1;
    }

    const layout = flextree()
      .nodeSize(node => {
        const [width, height] = node.data.payload.size;
        return [height, width + (width ? paddingX * 2 : 0) + spacingHorizontal];
      })
      .spacing((a, b) => {
        return a.parent === b.parent ? spacingVertical : spacingVertical * 2;
      });

    const t = layout.hierarchy(root);
    layout(t);
    console.log("t: ", t)
    adjustSpacing(t, spacingHorizontal, SWITCH_CONST);

    const descendants = t.descendants().reverse();
    // t.each((node) => {
    //   if(node.depth == 1) {
    //     node.y += node.depth * 80 * SWITCH_CONST;
    //   } else {
    //     node.y += node.depth * 40 * SWITCH_CONST;
    //   }
    // });
    console.log("dump: ", layout.dump(t)); 

    const _transition = (sel) => {
      console.log("sel: ", sel)
      const duration = 1;
      return sel.transition().duration(duration);
    }


    var nodes = t.descendants().reverse();
    var links = t.links();
    // Set both root nodes to be dead center vertically
    // nodes.forEach(function (d) { d.y = d.depth * 130*SWITCH_CONST; if(d.depth==1) d.y+=50*SWITCH_CONST });
    nodes.forEach(function (d) { d.y = d.y * SWITCH_CONST });
    const origin = descendants && descendants.find(item => item.data === descendants) || t
    // const origin = originData && descendants.find(item => item.data === originData) || tree;
    const x0 = origin.data.payload.x0 ?? origin.x;
    const y0 = origin.data.payload.y0 ?? origin.y;

    var width  = +svg.attr("width"),
        height = +svg.attr("height")

    const treeYOffset = -t.y - t.ySizeInner/2;
    const treeXOffset = -t.xSize/2;
    // const treeOffset = 0; // -120 50  =85>  -35 -35    width54   ysizeinner70   r6   paddingX8 
    console.log("treeOffset: ", treeXOffset, ", ", treeYOffset)
    // Shift the entire tree by half it's width
    // var g = svg.append("g").attr("transform", "scale(0.8 1)\ntranslate(" + width / 1.6 + "," + height / 2 + ")");
    var g = svg.append("g").attr("transform", "translate(" + (width/2 + treeYOffset) + "," + (height / 2 + treeXOffset) + ")");


    const node = g.selectAll(childSelector('g'))
      .data(nodes, d => d.data.payload.key);

    const nodeEnter = node.enter().append('g')
      .attr('transform', d => `translate(${y0},${x0})`);

    const nodeExit = _transition(node.exit());
    nodeExit.select('rect').attr('width', 0).attr('x', d => d.ySizeInner);
    nodeExit.select('foreignObject').style('opacity', 0);
    nodeExit.attr('transform', d => `translate(${origin.y}, ${origin.x})`).remove();

    const nodeMerge = node.merge(nodeEnter);


    _transition(nodeMerge).attr('transform', d => `translate(${d.y },${d.x})`);

    // const rect = nodeMerge.select(childSelector('rect'))
    //   .data(d => d, d => d.data.payload.key)
    //   .join(
    //     enter => {
    //       return enter.append('rect')
    //         .attr('x', d => d.ySizeInner)
    //         .attr('y', d => d.xSize - linkWidth(d) / 2)
    //         .attr('width', 0)
    //         .attr('height', linkWidth);
    //     },
    //     update => update,
    //     exit => exit.remove(),
    //   );
    // 
    // _transition(rect)
    //   .attr('x', -1)
    //   .attr('width', d => d.ySizeInner + 2)

    const circle = nodeMerge.selectAll(childSelector('circle'))
      .data(d => (d.data.children ? [d] : []), d => d.data.payload.key)
      .join(
        enter => {
          return enter.append('circle')
            .attr('stroke-width', '1.5')
            .attr('cx', d => SWITCH_CONST == 1 ? d.ySizeInner : 0)
            .attr('cy', d => d.xSize/2)
            .attr('r', radius)
            .on('click', handleClick);
        },
        update => update,
        exit => exit.remove(),
      );
    _transition(circle)
      .attr('r', radius)
      .attr('stroke', d => color(d.data))
      .attr('fill', d => (d.data.payload?.fold && d.data.children ? color(d.data) : '#fff'));


    const id = idRef.current;
    const foreignObject = nodeMerge.selectAll(childSelector('foreignObject'))
      .data(d => [d], d => d.data.payload.key)
      .join(
        enter => {
          const fo = enter.append('foreignObject')
            .attr('class', `${id}-fo`)
            .attr('x', paddingX)
            .attr('y', 0)
            .style('opacity', 0)
            .attr('height', d => d.xSize)
            .on('mousedown', (e) => e.stopPropagation())
            .on('dblclick', (e) => e.stopPropagation());
          fo.append('xhtml:div')
            .select(function select(d) {
              const node = d.data.payload.el.cloneNode(true);
              this.replaceWith(node);
              return node;
            })
            .attr('xmlns', 'http://www.w3.org/1999/xhtml');
          return fo;
        },
        update => update,
        exit => exit.remove(),
      )
      .attr('width', d => Math.max(0, d.ySizeInner - paddingX * 2));

    _transition(foreignObject)
      .style('opacity', 1);
    console.log("nodes are ", nodes)


    // Create links
    const path = g.selectAll(childSelector('path'))
      .data(links, d => d.target.data.payload.key)
      .join(
        enter => {
          const source = [
            y0 + origin.ySizeInner,
            x0 + origin.xSize / 2,
          ];
          return enter.insert('path', 'g')
            .attr('d', linkShape({ source, target: source, staticWidth: true }));
        },
        update => update,
        exit => {
          const source = [
            origin.y + origin.ySizeInner,
            origin.x + origin.xSize / 2,
          ];
          return _transition(exit)
            .attr('d', linkShape({ source, target: source, staticWidth: true }))
            .remove();
        },
      );
    _transition(path)
      .attr('stroke', d => color(d.target.data))
      .attr('stroke-width', d => linkWidth(d.target))
      .attr('fill', d => d.source.parent ? 'none': color(d.target.data)  )
      .attr('d', d => {
        const source = [
          SWITCH_CONST == 1 ? d.source.y + d.source.ySizeInner : d.source.y,
          d.source.x + d.source.xSize / 2,
        ];
        const target = [
          SWITCH_CONST == 1 ? d.target.y : d.target.y + d.target.ySizeInner,
          d.target.x + d.target.xSize / 2,
        ];
        return linkShape({ source, target, staticWidth: !!d.source.parent });
      });





    // var link = g.selectAll(".link")
    //   .data(links)
    //   .enter()
    // 
    // link.append("path")
    //   .attr("class", "link")
    //   .attr("d", (d) => blink(d, SWITCH_CONST))
    //   // .attr("stroke", (d) => "#5555")
    //   .attr("stroke", function(d) { return d.source.parent ? "#555": "none" } )
    //   .attr("fill", function(d) { return d.source.parent ? "none": "url(#mygrad)" } );
    // Create nodes
    // var _node = g.selectAll(".node")
    //   .data(nodes)
    //   .enter()
    //   .append("g")
    //   .attr("class", function(d) {
    //     return "node" + (d.children ? " node--internal" : " node--leaf");
    //   })
    //   .attr("transform", function(d) {
    //     return "translate(" + d.y + "," + d.x + ")";
    //   })
    // 
    // _node.append("circle")
    //    .attr('stroke-width', '1.5')
    //    .attr('cx', d => d.ySizeInner)
    //    .attr('cy', d => d.xSize)
    //    .attr('r', 0)
    // 
    // _node.append("text")
    //   .attr("dy", 3)
    //   .style("text-anchor", "middle")
    //   .text(function(d) {
    //     return d.data.name
    //   });
  }

  const nodeFont = 'italic bold 12px arial,serif';
  const getStyleContent = () => {
    const id = idRef.current; 
    const style = {};
    const extraStyle = typeof style === 'function' ? style(id) : '';
    const styleText = `\
.${id} { line-height: 1; }
.${id} a { color: #0097e6; }
.${id} a:hover { color: #00a8ff; }
.${id}-g > path { fill: none; }
.${id}-g > g > circle { cursor: pointer; }
.${id}-fo > div { display: inline-block; font: ${nodeFont}; white-space: nowrap; }
.${id}-fo code { font-size: calc(1em - 2px); color: #555; background-color: #f0f0f0; border-radius: 2px; }
.${id}-fo :not(pre) > code { padding: .2em .4em; }
.${id}-fo del { text-decoration: line-through; }
.${id}-fo em { font-style: italic; }
.${id}-fo strong { font-weight: bolder; }
.${id}-fo pre { margin: 0; padding: .2em .4em; }
${extraStyle}
`;
    return styleText;
  }

  useEffect(() => {
    if (rootData && d3svg.current && invisible.current) {

      const style = document.createElement('style');
      const containerClass = `${idRef.current}-container`;
      style.textContent = `
${getStyleContent()}
.${containerClass} {
  position: absolute;
  width: 0;
  height: 0;
  top: -100px;
  left: -100px;
  overflow: hidden;
  font: ${nodeFont};
}
.${containerClass} > div {
  display: inline-block;
}
`;
      document.body.append(style, invisible.current);

      let i = 0;
      const walkTreeCallback1 = (item, next) => {
        item.children = item.children?.map(child => ({ ...child }));
        i += 1;
        const el = document.createElement('div');
        el.innerHTML = item.value;
        invisible.current.append(el);
        // container.append(el);
        item.payload = {
          ...item.payload,
          i,
          // unique ID
          el,
        };

        // color(item); // preload colors
        next();
      }

      const nodeMinHeight = 18;
      const walkTreeCallback2 = (item, next, parent) => {
        const rect = item.payload.el.getBoundingClientRect();
        console.log("rect: ", rect)
        // item.outerHTML = item.payload.el.outerHTML;
        item.value = item.payload.el.innerHTML;
        item.payload.size = [Math.ceil(rect.width), Math.max(Math.ceil(rect.height), nodeMinHeight)];
        // TODO keep keys for unchanged objects
        // unique key, should be based on content
        item.payload.key = `${parent?.payload?.i || ''}.${item.payload.i}:${item.value}`;
        next();
      }

      walkTree(rootData.leftData, walkTreeCallback1);
      walkTree(rootData.rightData, walkTreeCallback1);

      walkTree(rootData.leftData, walkTreeCallback2);
      walkTree(rootData.rightData, walkTreeCallback2);

      let svg = select(d3svg.current)
      svg.append('style')
        .text(getStyleContent());
      let defs = svg.append("defs");

      svg.append("circle")
        .attr('stroke-width', '1.5')
        .attr('stroke', '#ff0000')
        .attr('cx', d => 400)
        .attr('cy', d => 200)
        .attr('r', 3)

      var lg = defs.append("linearGradient")
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

      // var element = document.createElement("link");
      // element.setAttribute("rel", "stylesheet");
      // element.setAttribute("type", "text/css");
      // element.setAttribute("href", "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css");
      // document.getElementsByTagName("head")[0].appendChild(element);
      // Render both trees
      drawTree(svg, rootData.rightData, "right")
      drawTree(svg, rootData.leftData, "left")
    }
  }, [rootData])

  return (
    <div>
      <div ref={invisible} className={`${idRef.current}-container ${idRef.current}-fo`}>
      </div>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
        className="mindmap-container"
        role="img"
        ref={d3svg}
      ></svg>
    </div>
  )
}


AnotherMindMap.propTypes = {
  data: PropTypes.array|PropTypes.object,
  color: PropTypes.func
};
AnotherMindMap.defaultProps = {
  color: (node) => scaleOrdinal(schemeCategory10)(node.payload.i),
};


export default AnotherMindMap 

// style={{ pointerEvents: 'all', width: '100%', height: '100%' }}
