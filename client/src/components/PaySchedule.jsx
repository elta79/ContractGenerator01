import { useEffect, useState, useMemo } from "react"

function PaySchedule({ edd, insurance, eligibilityDate, firstVisitDate, deductible, coinsurance, copay }){
    const registrationFee = 500.00
    const childbirthClass = 200.00
    const breastfeedingClass = 50.00
    const birthRehearsal = 90.00
    const doulaFee = 495.00
    const consultObFee = 150.00
    const bcHmoNonCoveredVisit = 129.62
    const initDeposit = 50.00
    const regBalance = registrationFee - initDeposit
    const nonCoveredFees = insurance === "bcbsHMO" ?  (bcHmoNonCoveredVisit*2) : 0
    
       
    const [ numberOfPayments, setNumberOfPayments ] = useState(0)
    const [ totalBalanceDue, setTotalBalanceDue ] =useState(0)
    const [ progress, setProgress] = useState([])
        
  
    
    const insuranceRates = [
        // {ins: "--", allowable: 0},
        {ins: "bcbsHMO", allowable: 3250.68},
        {ins: "bcbsBO", allowable: 3279.31},
        {ins: "bcbsPPO", allowable: 3948.68},
        {ins: "aetna", allowable: 4993.60},
        {ins: "cigna", allowable: 4222.00},
    ]

    //key-val dictionary of operations and values
    const operationsMap = {
        subtractDed: (value, number) => value - number,
        multiplyCoIns: (value, number) => value * (number/100),
        addDed: (value, number) => value + number,
        addCopay: (value, number) => value + number, 
        addRegFee: (value, number) => value + number, 
        addConsultFee: (value, number) => value + number, 
        addChildbirthClass: (value, number) => value + number, 
        addBreastfeedingClass: (value, number) => value + number, 
        addBirthRehearsal: (value, number) => value + number, 
        addDoulaFee: (value, number) => value + number, 
        addNonCovered: (value, number) => value + number, 
        subtractInitDeposit: (value, number) => value - number,
        subtractRegBalance: (value, number) => value - number
    }


    //CALCULATE TOTAL BALANCE
    useEffect (()=>{
        const selectedInsurance = insuranceRates.find(rate => rate.ins === insurance)
        const allowableAmt = selectedInsurance ? selectedInsurance.allowable : 'Not Available'

        const operations = [ 
            ['subtractDed', deductible], 
            ['multiplyCoIns', coinsurance], 
            ['addDed', deductible], 
            ['addCopay', copay],
            ['addRegFee', registrationFee],
            ['addConsultFee', consultObFee],
            ['addChildbirthClass', childbirthClass],
            ['addBreastfeedingClass', breastfeedingClass],
            ['addBirthRehearsal', birthRehearsal],
            ['addDoulaFee', doulaFee],
            ['addNonCovered', nonCoveredFees],
            ['subtractInitDeposit', initDeposit],
            ['subtractRegBalance', regBalance]
        ]

        function calculateBalance(allowableAmt, operations){
            let value = allowableAmt
            let prog = []
    
            operations.forEach(([operation, number]) => {
                number = Number(number) //make sure each number is a number type
    
                if(operationsMap[operation]){
                    value = operationsMap[operation](value, number)
                    prog.push(value)
                }else{
                    throw new Error('Invalid operation')
                }
            });
            setProgress(prog)
            setTotalBalanceDue(prog[12] ? prog[12] : 0)
            
            return value;    
        }

        calculateBalance(allowableAmt, operations)

    },[insurance, deductible, coinsurance, copay])

//CALCULATE THE DEADLINE
const deadlineCalc = (edd) => {
    const eddDate = new Date(edd) //convert string to date obj
    const day = eddDate.getUTCDate()
    const month = eddDate.getUTCMonth()
    const year = eddDate.getUTCFullYear()
    const eddDateInMilliSeconds = Date.UTC(year, month, day+1)
    const OneWeekMilliSeconds = 604800000
    //edd is 40wk, deadline is 32 weeks = 40 wk - 8 wk
    const deadlineInMilliSeconds = eddDateInMilliSeconds - (8 * OneWeekMilliSeconds)
    
    const deadlineDate = new Date(deadlineInMilliSeconds)
    // console.log('deadlineDate', deadlineDate)
    return deadlineDate
}
//CALCULATE THE DEADLINE MONTH
const deadlineMonth = (deadlineDate) => {
    if(!deadlineDate) return null
    
    return (deadlineDate.getMonth()+1)
}


//Deadline string 
const deadline = useMemo(()=>{
    if(!edd) return 'Not entered yet'
    const deadlineDate = deadlineCalc(edd)
    return deadlineDate.toLocaleDateString()
}, [edd])


//CALCULATE NUMBER PAYMENTS    numberOfPayments
const calculatedNumberOfPayments = useMemo(()=>{
    if (!deadline)return null;

    const deadlineDate = new Date(deadline)
    const deadlineMonthValue = deadlineMonth(deadlineDate)
    console.log('DL MONTH VAL',deadlineMonthValue)
    
    const numberOfPaymentsCalc = (deadlineMonthValue) =>{
        //calc how many days left in month to determine pmt start month         
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        const currentMonth = currentDate.getMonth() //0-based month
        const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
        const currentDayOfMonth = currentDate.getDate()
        const percentCompleted = (currentDayOfMonth / totalDaysInMonth )
        console.log('percent complete:',percentCompleted)
        
        const firstPayment = percentCompleted > 0.75 ? (currentMonth + 2) : (currentMonth +1)
        console.log('first payment', firstPayment)
        return deadlineMonthValue - firstPayment +1
       
    }
    // console.log("numberOfPayments",numberOfPayments)
    return numberOfPaymentsCalc(deadlineMonthValue)
    
},[deadline])


useEffect(()=>{
    if (calculatedNumberOfPayments !== null){
        setNumberOfPayments(calculatedNumberOfPayments)
    }
}, [calculatedNumberOfPayments])

console.log("numberOfPayments",numberOfPayments)

const amountEachPayment = useMemo(() => {
    const numPay = numberOfPayments
    const totalBal = totalBalanceDue
    const balanceArray = []
    //divide total balance by numPay, if this num<total balance, add num to array, if num > total balance then add balance to array
},[totalBalanceDue, numberOfPayments])


    
    return(
        <>
        <h2>Payment Schedule:</h2>
        <p>
            This is your payment plan. You will receive an emailed invoice each month to have the balance paid in full by 32 weeks gestation. Monthly payments are expected to be completed by the last day of the month.
            Failure to pay the balance in full by 32 weeks gestation may result in discharge from care and your account will be turned over to a collection agency.
        </p>
        <p>Family Birth Services, Inc. accepts cash, checks and all major credit cards.</p>
        <p>I will be 32 weeks on: {deadline} </p>
        <div className='wrapper'>
            <div className='schedule-title  underline'>Billable to Insurance</div>
            <div className='col-1'>Insurance Allowable for Care</div>
            <div className='col-2 shade-background'></div>
            <div className='col-3 shade-background'></div>
            <div className='col-4'>$ </div>
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
            <div className='col-4'>$ {progress[4]}</div>
            <div className='col-1'>Consulting Ob Fee</div>
            <div className='col-2'>+</div>
            <div className='col-3'>$ {consultObFee}</div>
            <div className='col-4'>$ {progress[5]}</div>
            <div className='col-1'>Childbirth Class</div>
            <div className='col-2'>+</div>
            <div className='col-3'>$ {childbirthClass}</div>
            <div className='col-4'>$ {progress[6]}</div>
            <div className='col-1'>Breastfeeding Class</div>
            <div className='col-2'>+</div>
            <div className='col-3'>$ {breastfeedingClass}</div>
            <div className='col-4'>$ {progress[7]}</div>
            <div className='col-1'>Birth Rehearsal</div>
            <div className='col-2'>+</div>
            <div className='col-3'>$ {birthRehearsal}</div>
            <div className='col-4'>$ {progress[8]}</div>
            <div className='col-1'>Doula Fee</div>
            <div className='col-2'>+</div>
            <div className='col-3'>$ {doulaFee}</div>
            <div className='col-4'>$ {progress[9]}</div>
            <div className='col-1'>Non-Covered Mom & Baby Visits (one each)</div>
            <div className='col-2'>+</div>
            <div className='col-3'>$ {nonCoveredFees}</div>
            <div className='col-4'>$ {progress[10]}</div>
            
            <div className='schedule-title'>Monthly Payment Schedule</div>
            <div className='col-1 bold'>Payment Number</div>
            <div className='col-2 bold'>Date</div>
            <div className='col-3 bold'>Payment Amount</div>
            <div className='col-4 bold'>Balance</div>
            <div className='col-1 shade-background'></div>
            <div className='col-2 shade-background'></div>
            <div className='col-3'>Total Due</div>
            <div className='col-4 bold'>$ {progress[10]}</div>
            <div className='col-1'>Registration Deposit</div>
            <div className='col-2'></div>
            <div className='col-3'>$ {initDeposit}</div>
            <div className='col-4'>$ {progress[11]}</div>
            <div className='col-1'>Registration Balance</div>
            <div className='col-2'></div>
            <div className='col-3'>$ {regBalance}</div>
            <div className='col-4'>$ {progress[12]}</div>

            {/* dynamically add rows based on time left before deadline Function Call*/}

        </div>
        </>
    )
}

export default PaySchedule