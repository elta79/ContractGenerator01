import { useMemo, Fragment  } from "react"
function PaymentField({totalBalanceDue, numberOfPayments}){

  //console.log('totalBalanceDue',totalBalanceDue)
  //console.log('numberOfPayments', numberOfPayments)

  function roundUpToHundreths(num){
    return Math.ceil(num*100)/100
  }
  //CALCULATE RUNNING BALANCE AND PAYMENT AMOUNTS
  const { paymentArray, balanceArray} = useMemo(() => {
    const paymentArray = []
    const balanceArray = []
    let numPay = numberOfPayments
    let currentBal = totalBalanceDue
    
    while(numPay >0){
      const eachPayment = currentBal/numPay
      paymentArray.push(eachPayment.toFixed(2))
      numPay -= 1
      currentBal -= eachPayment
      balanceArray.push(currentBal.toFixed(2))
    }
    
    return { paymentArray, balanceArray}

},[totalBalanceDue, numberOfPayments])
console.log('balance array', balanceArray)
console.log('paymentArray',paymentArray)

  return(
    <>
      {paymentArray.map((payment,index) =>{
        return(
        < Fragment key={index} >
          <div className='col-1'>{index+1}</div>
          <div className='col-2'>Date</div>
          <div className='col-3'>{payment}</div>
          <div className='col-4'>{balanceArray[index]}</div>
        </Fragment>)
      })}
    </>
  )
}

export default PaymentField