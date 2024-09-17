import React from 'react'
import "../css/page.css"
import MultiLineChart from '../components/MultiLineChart'
export default function HomePage() {
  return (
    <div className=''>
        <div className="chart-container component">
            <MultiLineChart/>
        </div>
      
      {/* <MultiLineChart/> */}
    </div>
  )
}
