import { useRef } from 'react'


function Form({formData, setFormData}){

    const form = useRef()

    function handleSubmit(e){
        e.preventDefault()
        //send to db
        console.log(formData)
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
        <h2>Patient Information</h2>
        <form ref={form} onSubmit={handleSubmit} className='grid-container-form'>
            
                <label className='grid-item-form'>
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
                <label className='grid-item-form'>
                    Last Name: <input 
                    type="text"
                    name="lastName"
                    className="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    />                
                </label>
            
                <label className='grid-item-form'>
                    DOB: <input 
                    type="date"
                    name="dob"
                    className="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    />                
                </label>
                <label className='grid-item-form'>
                    EDD: <input 
                    type="date"
                    name="edd"
                    className="edd"
                    value={formData.edd}
                    onChange={handleChange}
                    required
                    />                
                </label>
            
                <label className='grid-item-form'>
                    Choose insurance:
                    <select                
                        name='insurance'
                        className='insurance'
                        value={formData.insurance}
                        onChange={handleChange}
                    >
                        <option value="--">--</option>
                        <option value="bcbsHMO">BCBS HMO</option>
                        <option value="bcbsBO">BCBS BO</option>
                        <option value="bcbsPPO">BCBS PPO</option>
                        <option value="aetna">Aetna</option>
                        <option value="cigna">Cigna</option>
                    </select>
                </label>            
                <label className='grid-item-form'>
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
            
                <label className='grid-item-form'>
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
                <label className='grid-item-form'>
                    Deductible: 
                    <input 
                        type="number"
                        name="deductible"
                        className="deductible"
                        value={formData.deductible}
                        onChange={handleChange}
                        required
                    />                
                </label>
            
                <label className='grid-item-form'>
                    Co-Insurance: 
                    <input 
                        type="text"
                        name="coinsurance"
                        className="coinsurance"
                        value={formData.coinsurance}
                        onChange={handleChange}
                        required
                    />                
                </label>
                <label className='grid-item-form'>
                    Co-Pay: 
                    <input 
                        type="text"
                        name="copay"
                        className="copay"
                        value={formData.copay}
                        onChange={handleChange}
                        required
                    />                
                </label>
            
            {/* <button id='button'>Create Contract</button>           */}
        </form>
        </>
    )
}

export default Form