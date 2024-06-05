import PaySchedule from "./PaySchedule"

function Contract({firstName, lastName, edd, insurance, eligibilityDate, firstVisitDate, deductible, coinsurance, copay}){
    return(
        <>
            <div>
                <h2>Financial Contract</h2>
                <p>Family Birth Services, Inc</p>
                <p>Logo</p>
            </div>
            <div className='grid-container'>
                <div className='grid-item'>Name: {firstName} {lastName}</div>
                <div className='grid-item'>Insurance: {insurance}</div>
                <div className='grid-item'>Eligibility Date: {eligibilityDate}</div>
                <div className='grid-item'>Deductible: ${deductible}</div>
                <div className='grid-item'>Co-Insurance: ${coinsurance}</div>
                <div className='grid-item'>Co-Pay: ${copay}</div>
            </div>
            <div className='contract-container'>
                <h3>Please carefully read the following and initial at the bottom.  By initialing, you are confirming that you have read and understand the following.  If you do not understand, please ask FBC staff for more information.</h3>
                <h3>Description of Fees:</h3>
                <ul>
                    <li>FBC (via Express Claims LLC) has contacted your insurance company to verify benefits.  The benefits above reflect what your insurance company has verified. If your insurance company does not pay based on the agreed upon deductible, co-insurance percentage, or co-pay amounts, you will be billed for the difference, which will be calculated using the contracted allowable amounts. If your insurance has provided incorrect information, it is still your responsibility to pay the corrected amount due.</li>
                    <li>Your financial responsibility (PAGE 3) is calculated using the contracted allowable amount for Global OB care, and your benefits (as quoted by your insurance company). Global OB includes prenatal care, labor & delivery, immediate postpartum care, and a 6-8-week postpartum visit.  Separate charges for the Newborn visit w/PKU and the Mom 24-48 visit are included in the deposit. This deposit amount is due to FBC by 32-weeks gestation.  </li>
                    <li>Not included in Global OB care are any problem visits, or office visits that occur outside of pregnancy (except 6-8 week postpartum), labs and ultrasounds. This means office visits and newborn visits will be billed separately, outside of the Global OB, and you may be responsible for an additional copay, coinsurance, or fees that insurance doesn’t pay. Any additional fees will be billed to you after FBC has received a final explanation of benefits from your insurance company.</li>
                    <li>Claims for labs and Ultrasound will be submitted by an outside facility. FBC is not involved in billing for lab or ultrasounds. If you have any issues, please contact the billing facility for help.</li>
                </ul>
                <h3>Fees that are not billable to insurance:</h3>
                <ul>
                    <li>Registration Fee (non-negotiable, non-refundable)—$500.00, due at the Initial Visit. This fee is required of all our patients regardless of financial category, and it covers administrative expenses related to setting up your episode of care. $50 of this fee is due at the time of scheduling the initial appointment and you will be emailed an invoice for the remaining amount prior to your initial appointment. If the invoice is not paid, you will not be seen.</li>
                    <li>Doula Services Fee—$475.00, All first-time moms are required to have doula services. It is optional for those that have had at least 1 baby previously. This fee includes doula support from a certified professional doula once you have been admitted to the birth center IN ACTIVE LABOR and the doula will stay up to 1 hour postpartum. This fee is refundable if you need to transfer care PRIOR TO LABOR.</li>
                    <li>Consulting OB/Chart Review Fee—$150, paid to an OB (required by the State of Florida) to conduct a chart review as needed & prescribe medications needed during the pregnancy, labor, postpartum and breastfeeding. Chart review (as needed) is a requirement to verify low-risk status for birth center care.</li>
                    <li>Classes: $200 Childbirth Education; $50 Breastfeeding Class; $90 Birth Rehearsal. **we will submit a claim for the Breastfeeding class fee to Aetna and Cigna. If they pay, you will receive a credit on your account for the self-pay breastfeeding class.</li>
                    <li>Extended postpartum stay—if you stay more than 6 hours postpartum, the fee is $100/hour, rounding up to the nearest hour and you will be invoiced after being discharged.</li>
                </ul>
                <h3>Patient Responsibilities:</h3>
                <ul>
                    <li>It is your responsibility to report any changes to your insurance policy. If you fail to report any changes to your policy, you may be subject to Self-Pay fees for non-eligible services.</li>
                    <li>You are responsible for adding your newborn to your insurance policy after the baby is born. Failure to do so may result in Self pay fees for newborn care/visits.</li>
                    <li>You are responsible for checking your email for invoices sent from FBC.</li>
                    <li>You understand that failure to make payments will result in discontinuation of care and submission of your account to a collections agency within 90 days of the first attempt to collect your balance due. You must make arrangements with another care provider as services will no longer be provided by FBC.</li>
                </ul>
                <h3>Refund Information:</h3>
                <ul>
                    <li>Failure to attend a scheduled class will not result in a refund of that class. Please be sure that you are scheduled appropriately.</li>
                    <li>Absolutely no refunds will be provided on any service (including add-on services) for a minimum of 30 days from the date of transfer/birth.</li>
                    <li>If there is a balance due, and if there are outstanding insurance claims, no refund will be given until the claims have settled.</li>
                </ul>
                <p>Signature</p>
                <p>Date</p>             
            </div>
            
            <PaySchedule />
        </>
    )
}

export default Contract