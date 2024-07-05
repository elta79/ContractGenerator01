function PaySchedule({ edd, insurance, eligibilityDate, firstVisitDate, deductible, coinsurance, copay }){
    const registrationFee = 500.00
    const childbirthClass = 200.00
    const breastfeedingClass = 50.00
    const birthRehearsal = 90.00
    const doulaFee = 495.00
    const consultObFee = 150.00
    const bcbsHmoNonCoveredFee = 129.62
    let progress = []  

    const insuranceRates = [
        {ins: "bcbsHMO", allowable: 3250.68},
        {ins: "bcbsBO", allowable: 3279.31},
        {ins: "bcbsPPO", allowable: 3948.68},
        {ins: "aetna", allowable: 4993.60},
        {ins: "cigna", allowable: 4222.00},
    ]

    const selectedInsurance = insuranceRates.find(rate => rate.ins === insurance)
    const allowableAmt = selectedInsurance ? selectedInsurance.allowable : 'Not Available'
   

    const operations = [ 
        ['subtractDed', deductible], 
        ['multiplyCoIns', coinsurance], 
        ['addDed', deductible], 
        ['addCopay', copay] 
    ]
    const result = calculateBalance(allowableAmt, operations)
    

// **Calculate balance and record calculation progress ??TODO- put into useEffect fxn? TODO: use mapping instead of switch fxn
    function calculateBalance(allowableAmt, operations){
            
        let value = allowableAmt        
        // let progress = [value]        

        operations.forEach(([operation, number])=>{
            switch (operation){
                case 'subtractDed':                
                    value -= number
                    break
                case 'multiplyCoIns':
                    value *= (number/100)
                    break
                case 'addDed':
                    value += Number(number)
                    break
                case 'addCopay':
                    value += Number(number)
                    break
                default:
                    throw new Error("Invalid operation")
            }
            progress.push(value)
        })
        return {finalVal: value, progress}
    }
    

    console.log("final val: ", result.finalVal)
    console.log("prog", result.progress)
    // const selectedInsurance = insuranceRates.filter(rate => rate.ins === insurance)
    // console.log(selectedInsurance[0].allowable)
    
    const deadlineCalc = (edd) => {
        // TEST
        // //RegEx to check "YYYY-MM-DD" format
        // const dateFormat = /^\d{4}-\d{2}-\d{2}$/  
        // //check if edd matches the format
        // if(!dateFormat.test(edd)){
        //     return 'Not right format for date'
        // }
        const eddDate = new Date(edd) //convert string to date obj
        const day = eddDate.getUTCDate()
        const month = eddDate.getUTCMonth()
        const year = eddDate.getUTCFullYear()
        const eddDateInMilliSeconds = Date.UTC(year, month, day+1)
        const OneWeekMilliSeconds = 604800000
        //edd is 40wk, deadline is 32 weeks = 40 wk - 8 wk
        const deadlineInMilliSeconds = eddDateInMilliSeconds - (8 * OneWeekMilliSeconds)
        const deadlineDate = new Date(deadlineInMilliSeconds).toLocaleDateString()

        return (!edd ? 'Not entered yet' : deadlineDate)   
    }

   
    
    
    return(
        <>
        <h2>Payment Schedule:</h2>
        <p>
            This is your payment plan. You will receive an emailed invoice each month to have the balance paid in full by 32 weeks gestation. Monthly payments are expected to be completed by the last day of the month.
            Failure to pay the balance in full by 32 weeks gestation may result in discharge from care and your account will be turned over to a collection agency.
        </p>
        <p>Family Birth Services, Inc. accepts cash, checks and all major credit cards.</p>
        <p>I will be 32 weeks on: {deadlineCalc(edd)}</p>
        <div className='wrapper'>
            <div className='schedule-title  underline'>Billable to Insurance</div>
            <div className='col-1'>Insurance Allowable for Care</div>
            <div className='col-2 shade-background'></div>
            <div className='col-3 shade-background'></div>
            <div className='col-4'>$ {allowableAmt}</div>
            <div className='col-1'>My Deductible</div>
            <div className='col-2'>-</div>
            <div className='col-3'>$ {deductible}</div>
            <div className='col-4'>$ {progress[0]}</div>
            <div className='col-1'>My Co-Insurance</div>
            <div className='col-2'>x</div>
            <div className='col-3'>{coinsurance} %</div>
            <div className='col-4'>$ {progress[1]}</div>
            <div className='col-1'>My Deductible</div>
            <div className='col-2'>+</div>
            <div className='col-3'>$ {deductible}</div>
            <div className='col-4'>$ {progress[2]}</div>
            <div className='col-1'>My Co-Pay</div>
            <div className='col-2'>+</div>
            <div className='col-3'>$ {copay}</div>
            <div className='col-4'>$ {progress[3]}</div>

            <div className='schedule-title'>Not Billable to Insurance</div>
            <div className='col-1'>Registration Fee (Non-Refundable)</div>
            <div className='col-2'>+</div>
            <div className='col-3'>$ {registrationFee}</div>
            <div className='col-4'>$ balance</div>
            <div className='col-1'>Consulting Ob Fee</div>
            <div className='col-2'>+</div>
            <div className='col-3'>$ {consultObFee}</div>
            <div className='col-4'>$ balance</div>
            <div className='col-1'>Childbirth Class</div>
            <div className='col-2'>+</div>
            <div className='col-3'>$ {childbirthClass}</div>
            <div className='col-4'>$ balance</div>
            <div className='col-1'>Breastfeeding Class</div>
            <div className='col-2'>+</div>
            <div className='col-3'>$ {breastfeedingClass}</div>
            <div className='col-4'>$ balance</div>
            <div className='col-1'>Birth Rehearsal</div>
            <div className='col-2'>+</div>
            <div className='col-3'>$ {birthRehearsal}</div>
            <div className='col-4'>$ balance</div>
            <div className='col-1'>Doula Fee</div>
            <div className='col-2'>+</div>
            <div className='col-3'>$ {doulaFee}</div>
            <div className='col-4'>$ balance</div>
            <div className='col-1'>Non-Covered Mom & Baby Visits</div>
            <div className='col-2'>+</div>
            <div className='col-3'>$ {bcbsHmoNonCoveredFee}</div>
            <div className='col-4'>$ balance</div>
            
            <div className='schedule-title'>Monthly Payment Schedule</div>
            <div className='col-1 bold'>Payment Number</div>
            <div className='col-2 bold'>Date</div>
            <div className='col-3 bold'>Payment Amount</div>
            <div className='col-4 bold'>Balance</div>
            <div className='col-1 shade-background'></div>
            <div className='col-2 shade-background'></div>
            <div className='col-3'>Total Due</div>
            <div className='col-4 bold'>$ total</div>
            <div className='col-1'>Registration Deposit</div>
            <div className='col-2'></div>
            <div className='col-3'>$ {registrationFee -450}</div>
            <div className='col-4'>$ new balance</div>
            <div className='col-1'>Registration Balance</div>
            <div className='col-2'></div>
            <div className='col-3'>$ {registrationFee - 50}</div>
            <div className='col-4'>$ new balance</div>

            {/* dynamically add rows based on time left before deadline */}

        </div>
        </>
    )
}

export default PaySchedule