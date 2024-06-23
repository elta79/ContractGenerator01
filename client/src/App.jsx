import './App.css'
import Form from './components/Form'
import Contract from './components/Contract'
import { useState } from 'react'

function App() {
  
  // lift up state to common ancestor
  const [ formData, setFormData ] = useState({
    firstName:'',
    lastName:'',
    dob:'',
    edd:'',
    insurance:'',
    eligibilityDate:'',
    firstVisitDate:'',
    deductible:'',
    coinsurance:'',
    copay:'',
})

  return (
    <>
      <div className='form-section'>        
        {/* pass form data as props */}
        <Form formData={formData} setFormData={setFormData}/>
      </div>

      <div className='contract-section'>   
        {/* spread operator ... spreads props to component     */}
        <Contract formData={formData}/>
      </div>
      

    </>
  )
}

export default App
