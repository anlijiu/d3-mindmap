import React, { useState, useEffect } from 'react'
import { json } from 'd3-fetch'
import { ascending } from 'd3-array'
import MindMap from './MindMap';

const parseNA = string => (string === 'NA' ? undefined : string)

function type(d) {
  return {
    genre: parseNA(d.genre),
    revenue: +d.revenue,
  }
}

function filterData(data) {
  return data.filter(d => {
    return d.revenue > 0
  })
}

function prepareBarChartData(data) {
  // usually more wrangling is required but the example data is simple
  return data
}

const MindMapData = () => {
  const [mindMapData, setMindMapData] = useState(null)

  useEffect(() => {
    json('/static/data/tree.json', type).then(data => {
      setMindMapData(data)
    })
  }, [])

  if (mindMapData === null) {
    return <p>Loading...</p>
  }

  return <MindMap data={mindMapData} />
}

export default MindMapData
