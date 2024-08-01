import { useMemo, Fragment  } from "react"
function PaymentField({totalBalanceDue, numberOfPayments, firstPaymentMonth}){

  // console.log('totalBalanceDue',totalBalanceDue)
  // console.log('numberOfPayments', numberOfPayments)
  
  //CALCULATE RUNNING BALANCE AND PAYMENT AMOUNTS
  const { paymentArray, balanceArray, monthArray} = useMemo(() => {
    const paymentArray = []
    const balanceArray = []
    const monthArray = []
    
    
    let numPay = numberOfPayments
    let currentBal = totalBalanceDue
    let currentPaymentMonth = firstPaymentMonth
    // console.log("paymentArray",paymentArray)
    // console.log("balanceArray",balanceArray)
    // console.log("dateArray",dateArray)
    
    while(numPay > 0){
      const eachPayment = currentBal/numPay
      if(currentPaymentMonth > 12 ){
        currentPaymentMonth=1
      }
      paymentArray.push(eachPayment.toFixed(2))
      monthArray.push(currentPaymentMonth)
      numPay -= 1
      currentBal -= eachPayment      
      currentPaymentMonth += 1
      balanceArray.push(currentBal.toFixed(2))
    }
    return { paymentArray, balanceArray,monthArray}

  },[totalBalanceDue, numberOfPayments])

  // console.log("paymentArray",paymentArray)
  // console.log("balanceArray",balanceArray)
  // console.log("dateArray",dateArray)

  const { yearArray }= useMemo(()=>{
    //if month is less than current month, then current year + 1
    const yearArray = []
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()+1 //0-based month
    

    for(let i=0; i < monthArray.length; i++){

      if( currentMonth < monthArray[i] || currentMonth === monthArray[i]){
        yearArray.push(currentYear)
                
      }else{
        yearArray.push(currentYear + 1)                
      }
    }

    return {yearArray}
    
  },[monthArray])

  // console.log('balance array', balanceArray)
  // console.log('paymentArray',paymentArray)
  // console.log('date Array', dateArray)
  // console.log('year array', yearArray)

  return(
    <>
      {paymentArray.map((payment,index) =>{
        return(
          < Fragment key={index} >
            <div className='col-1 payment-number'>{index+1}</div>
            <div className='col-2'>{monthArray[index]}/{yearArray[index]} </div>
            <div className='col-3'>$ {payment}</div>
            <div className='col-4'>$ {balanceArray[index]}</div>
          </Fragment> 
        )
      })}
    </>
  )
}

export default PaymentField