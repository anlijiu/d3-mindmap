import React from 'react';
import BarChartData from './components/BarChartData'
import MindMapData from './components/MindMapData'
import AnotherMindMapData from './components/AnotherMindMapData'

function App() {
  return (
    <div style={{overflow: 'scroll'}}>
      <AnotherMindMapData />
      <MindMapData />
      <BarChartData />
    </div>
  )
}

export default App;
