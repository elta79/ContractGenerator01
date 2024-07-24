import { useMemo, Fragment  } from "react"
function PaymentField({totalBalanceDue, numberOfPayments}){

  console.log('totalBalanceDue',totalBalanceDue)
  console.log('numberOfPayments', numberOfPayments)
  //CALCULATE RUNNING BALANCE AND PAYMENT AMOUNTS
  const { paymentArray, balanceArray} = useMemo(() => {
    const paymentArray = []
    const balanceArray = []
    const numPay = numberOfPayments
    let totalBal = totalBalanceDue
    let newBalance
    
    const eachPayment =(Math.round(((totalBal/numPay)+Number.EPSILON)*100)/100).toFixed(2)
    
    while (totalBal > eachPayment){
        newBalance = totalBal -= eachPayment
        balanceArray.push(Math.round((newBalance+Number.EPSILON)*100)/100).toFixed(2) 
        paymentArray.push(eachPayment)  
        if(newBalance < eachPayment){
            paymentArray.push(Math.round((newBalance+Number.EPSILON)*100)/100).toFixed(2)
            balanceArray.push(0)
            break 
        } 
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