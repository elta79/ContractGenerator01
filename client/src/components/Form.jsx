
import { useState, useRef } from 'react'


function Form(){

    const form = useRef()

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

    function handleSubmit(e){
        e.preventDefault()
        //send to db
    }

    function handleChange(e){
        const { name, value } = e.target;
        setFormData(prevFormData =>{
            return{
                ...prevFormData,
                [name]: value
            }
        })
    }

    return(
        <>
        <h2>Form</h2>
        <form ref={form} onSubmit={handleSubmit}>
            <div>
                <label>
                    First Name: 
                    <input 
                        type="text"
                        name="firstName"
                        className="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />                
                </label>
                <label>
                    Last Name: <input 
                    type="text"
                    name="lastName"
                    className="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    />                
                </label>
            </div>
            <div>
                <label>
                    DOB: <input 
                    type="date"
                    name="dob"
                    className="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    />                
                </label>
                <label>
                    EDD: <input 
                    type="date"
                    name="edd"
                    className="edd"
                    value={formData.edd}
                    onChange={handleChange}
                    required
                    />                
                </label>
            </div>
            <div>
                <label>
                    Choose insurance:
                    <select                
                        name='insurance'
                        className='insurance'
                        value={formData.insurance}
                        onChange={handleChange}
                    >
                        <option value="bcbsHMO">BCBS HMO</option>
                        <option value="bcbsBO">BCBS BO</option>
                        <option value="bcbsPPO">BCBS PPO</option>
                        <option value="aetna">Aetna</option>
                        <option value="cigna">Cigna</option>
                        </select>
                </label>            
                <label>
                    Eligibility Date: 
                    <input 
                        type="date"
                        name="eligibilityDate"
                        className="eligibilityDate"
                        value={formData.eligibilityDate}
                        onChange={handleChange}
                        required
                    />                
                </label>
            </div>
            <div>
                <label>
                    First Visit Date: 
                    <input 
                        type="date"
                        name="firstVisitDate"
                        className="firstVisitDate"
                        value={formData.firstVisitDate}
                        onChange={handleChange}
                        required
                    />                
                </label>
                <label>
                    Deductible: 
                    <input 
                        type="text"
                        name="deductible"
                        className="deductible"
                        value={formData.deductible}
                        onChange={handleChange}
                        required
                    />                
                </label>
            </div>
            <div>
                <label>
                    CoInsurance: 
                    <input 
                        type="text"
                        name="coinsurance"
                        className="coinsurance"
                        value={formData.coinsurance}
                        onChange={handleChange}
                        required
                    />                
                </label>
                <label>
                    Copay: 
                    <input 
                        type="text"
                        name="copay"
                        className="copay"
                        value={formData.copay}
                        onChange={handleChange}
                        required
                    />                
                </label>
            </div>  
            <button id='button'>Create Contract</button>          
        </form>
        </>
    )
}

export default Form