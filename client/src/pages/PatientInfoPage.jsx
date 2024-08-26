
import PatientForm from '../components/PatientForm'
import { useParams } from 'react-router-dom'

import React from 'react'

export default function PatientInfoPage() {
  return (
    <div>
      Patient Info
      <PatientForm/>
    </div>
  )
}
