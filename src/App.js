import React from 'react';
import BarChartData from './components/BarChartData'
import MindMapData from './components/MindMapData'

function App() {
  return (
    <div style={{overflow: 'scroll'}}>
      <MindMapData />
      <BarChartData />
    </div>
  )
}

export default App;
