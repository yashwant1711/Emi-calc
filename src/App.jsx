import './App.css'
import { useEffect, useState } from 'react'
import { tenureData } from './utils/constant';

function App() {
  const [cost, setCost] = useState(0);
  const [intrest, setIntrest] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [fees, setFees] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [emi, setEmi] = useState(0);

  const calculateEmi = (downPayment) => {
    if (!cost) return;

    // formula EMI amount = [p * r * (1+r)^n]/[(1+R)^n-1]

    const loanAmount = cost - downPayment;
    const rateofIntrest = intrest/100;
    const numbersOfyears = tenure/12;

    const EMI = (loanAmount * rateofIntrest * (1 + rateofIntrest) ** numbersOfyears) / ((1+ rateofIntrest)** numbersOfyears - 1)

    return Number(EMI/12).toFixed(0)
   }

   const calculateDp = (Emi)=> {
    if (!cost) return;

    const downPaymentPercant = 100 - (Emi / calculateEmi(0)) * 100;
    return Number((downPaymentPercant /100) * cost).toFixed(0)
   }

  const updateEMI = (e) => { 
    if (!cost) return;
    const db = Number(e.target.value)   // coverting it into number
    setDownPayment(db.toFixed(0))   // to handling decimanl number

    // calculate emi and update it
    const emi = calculateEmi(db);
    setEmi(emi);
  }

  const upadteDownPayment = (e) => { 
    if (!cost) return
    const Emi = Number(e.target.value)   // coverting it into number
    setEmi(Emi.toFixed(0))   // to handling decimanl number

    const db = calculateDp(Emi)
    setDownPayment(db)

  }

  useEffect(() => {
    if (!(cost>0)){
      setDownPayment(0)
      setEmi(0)
    }
    const Emi = calculateEmi(downPayment)
    setEmi(Emi)

  }, [tenure])
  return (
    <div className='App'>
      <span className='main-heading'>EMI CALCULATOR</span>

      <span className='Title'>Total cost of Asset</span>
      <input type="number"
        value={cost}
        onChange={(e) => { setCost(e.target.value) }}
        placeholder='Cost of an Asset'
      />
      <span className='Title'>Total Intrest %</span>
      <input type="number"
        value={intrest}
        onChange={(e) => { setIntrest(e.target.value) }}
        placeholder='Total %'
      />
      <span className='Title'>Processing Fees</span>
      <input type="number"
        value={fees}
        onChange={(e) => { setFees(e.target.value) }}
        placeholder='Processing fees(in %)'
      />
      <span className='Title'>Down Payment</span>
      <span className='Title' style={{textDecoration : "underline"}}>Total Down Payment -
       {(Number(downPayment)+(cost - downPayment) * (fees/100).toFixed(0))}
       </span>
      <input type="range"
        min={0}
        max={cost}
        className='Slider'
        value={downPayment}
        onChange={updateEMI}
      />
      <div className='lables'>
        <label>0%</label>
        <b>{downPayment}</b>
        <label>100%</label>
      </div>
      <span>Loan per Month</span>
      <span className='Title' style={{textDecoration : "underline"}}>Total Loan Amount -
       {(emi * tenure).toFixed(0)}
       </span>
      <input type="range"
        min={calculateEmi(cost)}
        max={calculateEmi(0)}
        className='slider'
        value={emi}
        onChange={upadteDownPayment}
      />
      <div className='lables'>
        <label>{calculateEmi(cost)}</label>
        <b>{emi}</b>
        <label>{calculateEmi(0)}</label>
      </div>

      <span className='title'>Tenure</span>
      <div className='tenureContainer'>
      {tenureData.map((t)=>{
        return(
          <button className={`tenure ${t === tenure ? "selected": ""}`}
          onClick={()=>{setTenure(t)}}
          >
            {t}
          </button>
        )
      })}
      </div>
    </div>
  )
}

export default App
