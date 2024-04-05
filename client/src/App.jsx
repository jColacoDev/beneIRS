/* eslint-disable no-unused-vars */
import React from 'react'
import LandingPage from './LandingPage'
import UploadEntitiesExcel from './UploadEntitiesExcel'
import Accordion from './Accordion/Accordion'

export default function App() {
  return (
    <div>
        {/* <UploadEntitiesExcel/> */}
        <Accordion />
        <LandingPage />    
    </div>
  )
}
