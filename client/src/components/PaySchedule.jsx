function PaySchedule({ edd }){

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

        if(!edd){
            return('')
        }
        return deadlineDate
        
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
        
        </>
    )
}

export default PaySchedule