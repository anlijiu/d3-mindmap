import React, { useEffect, useRef, useState, useMemo } from 'react'
import PropTypes from 'prop-types';
import { Remarkable } from 'remarkable';
import rkatex from 'remarkable-katex';
import Prism from 'prismjs';
import {zoom} from 'd3-zoom';
import { select } from 'd3-selection'
import transition from 'd3-transition';
import { scaleOrdinal, scaleLinear, scaleBand } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import * as chromatic from 'd3-scale-chromatic';
import { axisLeft, axisBottom } from 'd3-axis';
import { linkHorizontal } from 'd3-shape';
import { tree, hierarchy } from 'd3-hierarchy';
import usePrevious from './hooks/usePrevious';
import loadLanguages from 'prismjs/components/index.js';
import flextree from './flextree';
import BezierModule from '../bezier';
import { buildTree, cleanNode } from './markmap/lib';
import { getId, walkTree, childSelector } from './markmap/utils';
const { Bezier } = BezierModule;
// const { Bezier } = bezier

// margin convention often used with D3
const margin = { top: 80, right: 60, bottom: 80, left: 60 }
const width = 1200 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

const color = ['#f05440', '#d5433d', '#b33535', '#283250']

const AnotherMindMap = ({ data, color, layout, fontsLoaded }) => {
  const spacingHorizontal = 30;
  const spacingVertical = 5;
  const paddingX = 8;
  // const diameter = 6;
  const radius = 4;
  const previousFontLoaded = usePrevious(fontsLoaded);

  const idRef = useRef(getId());
  const d3svg = useRef(null);
  const globalG = useRef(null);
  const leftG = useRef(null);
  const rightG = useRef(null);
  const invisible = useRef(null);
  const [colors, ] = useState (() => {
    //https://stackoverflow.com/questions/42973502/understanding-d3-domain-and-ranges
    
    const sequentialSingleHueNames = ["Blues", "Greens", "Greys", "Oranges", "Purples", "Reds"];
    const sequentialMultiHueNames1 = ["BuGn", "BuPu", "GnBu", "OrRd", "PuBuGn", "PuBu", "PuRd", "RdPu", "YlGnBu", "YlGn", "YlOrBr", "YlOrRd"];
    const sequentialMultiHueNames2 = ["Cividis", "Viridis", "Inferno", "Magma", "Plasma", "Warm", "Cool", "CubehelixDefault", "Turbo"];
    const DivergingNames = ["BrBG", "PRGn", "PiYG", "PuOr", "RdBu", "RdGy", "RdYlBu", "RdYlGn", "Spectral"];
    const cyclicalNames = ["Rainbow", "Sinebow"];
    const colors = sequentialSingleHueNames.map(name => chromatic[`scheme${name}`][9]);

    return colors;
  })
  const getColor = (node) => {
    const ci = node.payload.ci % colors.length;
    const di = node.depth % 10;
    return colors[ci][di]
  }
  const [md, ] = useState (() => {
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
    if(layout === 'right') {
      return {
        leftData: { children: []},
        rightData: root
      }
    }
    const { children , ...rootProps } = root;
    const split_index = Math.round(children.length / 2)
    // Right data
    const rightData = {
      ...rootProps,
      children: children.slice(0, split_index)
    };
      // Left data
    const leftData = {
      ...rootProps,
      children: children.slice(split_index)
    };

    return { leftData, rightData };
  }, [data, layout]);

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
  const linkShape = ({source, target, ratio = 1, staticWidth = true, outlineStartWidth = 3, outlineEndWidth = 0.01}) => {
    console.log("linkShape source:", source, " target:", target)
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
      const outline = origBezier.outline(outlineStartWidth, outlineStartWidth, outlineEndWidth, outlineEndWidth);
      p = outline.curves.reduce((total, item, index) => `${total} ${index ==0 ? item.toSVG() : item.toSVG().replace('M', 'L')}`, "")
      p += 'Z';
      console.log("pppppppppppppp is :", p, "  source:", source, " target:", target, " staticWidth")
      return p;
    }
  }

  const adjustSpacing = (tree, spacing, SWITCH_CONST) => {
    walkTree(tree, (d, next) => {
      d.ySizeInner = d.ySize - spacing;
      if(d.data.value && d.data.value.startsWith("Katex")) {
        console.log("katex ySizeInner: ", d.ySizeInner, d)
      }
      const leftw = SWITCH_CONST == 1 ? 0 : d.ySizeInner;
      d.y += spacing + leftw; //* SWITCH_CONST;
      next();
    }, 'children');
  }


  const linkWidth = (nodeData) => {
    const data = nodeData.data;
    return Math.max(6 - 2 * data.depth, 1.5);
  }

  const handleZoom = (e) => {
    const { transform } = e;
    globalG.current.attr('transform', transform);
  }

  const handleClick = (e, d) => {
    const { data } = d;
    data.payload = {
      ...data.payload,
      fold: !data.payload?.fold,
    };

    draw(data)
    // this.renderData(d.data);
  }

  const draw = (originData) => {
    if(layout === 'right') {
      drawTree(rootData.rightData, "right", originData)
    } else if(layout === 'right-left') {
      drawTree(rootData.rightData, "right", originData)
      drawTree(rootData.leftData, "left", originData)
    }
  }

  const drawTree = (root, pos, originData) => {
    let SWITCH_CONST = 1;

    if (pos === "left") {
      SWITCH_CONST = -1;
    }

    const treeLayout = flextree()
      .children((d) => !d.payload?.fold && d.children)
      .nodeSize(node => {
        const [width, height] = node.data.payload.size;
        return [height, width + (width ? paddingX * 2 : 0) + spacingHorizontal];
      })
      .spacing((a, b) => {
        return a.parent === b.parent ? spacingVertical : spacingVertical * 2;
      });

    const t = treeLayout.hierarchy(root);
    treeLayout(t);
    adjustSpacing(t, spacingHorizontal, SWITCH_CONST);

    const _transition = (sel) => {
      const duration = 2200;//ms
      return sel.transition().duration(duration);
    }


    var nodes = t.descendants().reverse();
    var links = t.links();
    // Set both root nodes to be dead center vertically
    // nodes.forEach(function (d) { d.y = d.depth * 130*SWITCH_CONST; if(d.depth==1) d.y+=50*SWITCH_CONST });
    nodes.forEach(function (d) { d.y = d.y * SWITCH_CONST; });
    // const origin = descendants && descendants.find(item => item.data === descendants) || t
    const origin = originData && nodes.find(item => item.data === originData) || t;
    const x0 = origin.data.payload.x0 ?? origin.x;
    const y0 = origin.data.payload.y0 ?? origin.y;

    const svg = select(d3svg.current);
    const box = svg.node().getBoundingClientRect();
    const width = box.width;
    const height = box.height;
    // var width  = +svg.attr("width"),
    //     height = +svg.attr("height")

    const treeYOffset = -t.y - t.ySizeInner/2;
    const treeXOffset = -t.xSize/2;
    // console.log("treeOffset: ", treeXOffset, ", ", treeYOffset)
    // Shift the entire tree by half it's width
    let g = globalG.current.selectChildren(`g[pos=${pos}]`)
    if(g.empty()) {
      g = globalG.current.append("g").attr("pos", pos);
    }

    if(layout === "right-left") {
      g.attr("transform", "translate(" + (width/2 + treeYOffset) + "," + (height / 2 + treeXOffset) + ")");
    } else {
      g.attr("transform", "translate(0," + (height / 2 + treeXOffset) + ")");
    }
    // var g = svg.append("g").attr("transform", "translate(" + (width/2 + treeYOffset) + "," + (height / 2 + treeXOffset) + ")");


    const node = g.selectAll(childSelector('g'))
      .data(nodes, d => d.data.payload.key);

    const nodeEnter = node.enter().append('g')
      // .attr('transform', d => `translate(${y0},${x0})`);
      .attr('transform', d => `translate(${y0 + origin.ySizeInner - d.ySizeInner},${x0 + origin.xSize / 2 - d.xSize})`);

    const nodeExit = _transition(node.exit());
    nodeExit.select('rect').attr('width', 0).attr('x', d => d.ySizeInner);
    nodeExit.select('foreignObject').style('opacity', 0);
    nodeExit.attr('transform', d => `translate(${origin.y + origin.ySizeInner - d.ySizeInner},${origin.x + origin.xSize / 2 - d.xSize/2})`).remove();

    const nodeMerge = node.merge(nodeEnter);

    // this.transition(nodeMerge).attr('transform', d => `translate(${d.y},${d.x - d.xSize / 2})`);
    _transition(nodeMerge).attr('transform', d => `translate(${d.y},${d.x})`);

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
      .data(d => (d.data.children && d.data.children.length > 0 ? [d] : []), d => d.data.payload.key)
      .join(
        enter => {
          return enter.append('circle')
            .attr('stroke-width', '1.5')
            .attr('cx', d => SWITCH_CONST == 1 ? d.ySizeInner : 0)
            .attr('cy', d => d.xSize )
            .attr('r', 0)
            .on('click', handleClick);
        },
        update => update,
        exit => exit.attr('r', 0).remove(),
      );
    _transition(circle)
      .attr('r', radius)
      .attr('stroke', d => getColor(d.data))
      .attr('cy', d => d.xSize/2)
      .attr('fill', d => (d.data.payload?.fold && d.data.children ? getColor(d.data) : '#fff'));


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

    // Create links
    const path = g.selectAll(childSelector('path'))
      .data(links, d => d.target.data.payload.key)
      .join(
        enter => {
          const source = [
            SWITCH_CONST == 1 ? y0 + origin.ySizeInner : y0,
            x0 + origin.xSize / 2,
          ];
          const target = [
            SWITCH_CONST + source[0],
            SWITCH_CONST + source[1]
          ]
          console.log("asdf", enter)
          return enter.insert('path', 'g')
            .style('opacity', 0)
            .attr('d', d => linkShape({ source, target: !!d.source.parent ? source : target, staticWidth: !!d.source.parent }));
        },
        update => update,
        exit => {
          const source = [
            SWITCH_CONST == 1 ? origin.y + origin.ySizeInner : origin.y,
            origin.x + origin.xSize / 2,
          ];
          const target = [
            SWITCH_CONST + source[0],
            SWITCH_CONST + source[1]
          ]
          return _transition(exit)
            .attr('d', d => linkShape({ source, target: !!d.source.parent ? source : target, staticWidth: !!d.source.parent }))
            .remove();
        },
      );
    _transition(path)
      .attr('stroke', d => getColor(d.target.data))
      .attr('stroke-width', d => linkWidth(d.target))
      .style('fill', d => d.source.parent ? 'none': getColor(d.target.data)  )
      .style('opacity', 1)
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


    nodes.forEach(d => {
      d.data.payload.x0 = d.x;
      d.data.payload.y0 = d.y;
    });

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
    let svg = select(d3svg.current);
    globalG.current = svg.append('g');
    const zoomHandler = zoom()
      .on('zoom', handleZoom)
      .scaleExtent([0.1, 1000]);
    svg.call(zoomHandler);
    
    svg.append('style')
      .text(getStyleContent());

    let defs = svg.append("defs");

    svg.append("circle")
      .attr('stroke-width', '1.5')
      .attr('stroke', '#ff0000')
      .attr('cx', d => (width + margin.left + margin.right)/2)
      .attr('cy', d => (height + margin.top + margin.bottom)/2)
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
  }, [])

  const measureNodeSize = () => {
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
    const walkTreeCallback1 = (item, next, parent, ci) => {
      item.children = item.children?.map(child => ({ ...child }));
      i += 1;
      const el = document.createElement('div');
      el.innerHTML = item.value;
      invisible.current.append(el);
      // container.append(el);
      item.payload = {
        ...item.payload,
        i,
        ci,
        // unique ID
        el,
      };

      // color(item); // preload colors
      next();
    }

    const nodeMinHeight = 18;
    const walkTreeCallback2 = (item, next, parent) => {
      const rect = item.payload.el.getBoundingClientRect();
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
  }

  useEffect(() => {
    if (rootData && d3svg.current && invisible.current) {
      measureNodeSize();
      globalG.current.selectAll('g').remove();
      draw();
    }
  }, [rootData, layout])

  useEffect(() => {
    if(fontsLoaded && previousFontLoaded != fontsLoaded){
      measureNodeSize();
      draw();
    }
  }, [fontsLoaded])

        // width={width + margin.left + margin.right}
        // height={height + margin.top + margin.bottom}
  return (
    <div>
      <div ref={invisible} className={`${idRef.current}-container ${idRef.current}-fo`}>
      </div>
      <svg
        width='100%'
        height='100%'
        className={`mindmap-container ${idRef.current}`}
        role="img"
        ref={d3svg}
      ></svg>
    </div>
  )
}


AnotherMindMap.propTypes = {
  data: PropTypes.array|PropTypes.object,
  layout: PropTypes.string,
  fontsLoaded: PropTypes.bool,
  color: PropTypes.func
};
AnotherMindMap.defaultProps = {
  layout: 'right-left',
  fontsLoaded: false,
  color: (node) => {
    const c = scaleOrdinal(schemeCategory10).domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])(node.payload.i-1)
    console.log("color : ", c, "   xxi: ", node.payload.i)
    return c;
  },
};


export default AnotherMindMap 

// style={{ pointerEvents: 'all', width: '100%', height: '100%' }}
