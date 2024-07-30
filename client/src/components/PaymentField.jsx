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
    const numPay = numberOfPayments
    let totalBal = totalBalanceDue
    
    //console.log('totalBal', totalBal)
    //console.log('numPay', numPay)
    const eachPayment = roundUpToHundreths(totalBal/numPay)
   
    // console.log('each payment', eachPayment)
    while (totalBal > eachPayment){
        totalBal -= eachPayment
        
        balanceArray.push(Math.round((totalBal+Number.EPSILON)*100)/100) 
        paymentArray.push(eachPayment.toFixed(2)) 

        if(totalBal < eachPayment){          
          paymentArray.push(Math.round((totalBal+Number.EPSILON)*100)/100)
          balanceArray.push(0)
          break 
        } 
    }    
    return { paymentArray, balanceArray}

},[totalBalanceDue, numberOfPayments])
//console.log('balance array', balanceArray)
//console.log('paymentArray',paymentArray)

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