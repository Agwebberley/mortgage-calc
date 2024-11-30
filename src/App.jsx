import { useState } from 'react'
import 'tailwindcss/tailwind.css'

function App() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [term, setTerm] = useState('')
  const [monthlyPayment, setMonthlyPayment] = useState(null)
  const [totalPayment, setTotalPayment] = useState(null)
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!amount) newErrors.amount = 'Mortgage amount is required'
    if (!rate) newErrors.rate = 'Interest rate is required'
    if (!term) newErrors.term = 'Loan term is required'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const principal = parseFloat(amount)
    const monthlyRate = parseFloat(rate) / 100 / 12
    const numberOfPayments = parseInt(term) * 12
    const monthly = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments))
    const total = monthly * numberOfPayments

    setMonthlyPayment(monthly.toFixed(2))
    setTotalPayment(total.toFixed(2))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl text-slate-900 font-bold">Mortgage Calculator</h1>
          <div>
            <button
              type="button"
              onClick={() => {
                setAmount('')
                setRate('')
                setTerm('')
                setMonthlyPayment(null)
                setTotalPayment(null)
                setErrors({})
              }}
              className="text-slate-700 hover:underline focus:outline-none"
            >
              Clear All
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-slate-700">Mortgage Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded mt-1 focus:outline-none focus:ring-1 focus:ring-lime"
          />
          {errors.amount && <p className="text-red text-sm">{errors.amount}</p>}
        </div>
        <div className="mb-4 flex justify-between">
          <div className="w-1/2 pr-2">
            <label className="block text-slate-700">Loan Term</label>
            <div className="flex mt-1 relative">
              <input
                type="number"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-l focus:outline-none focus:ring-1 focus:ring-lime focus:border-lime"
              />
              <span className="flex items-center px-3 text-slate-500 bg-slate-200 border border-slate-300 border-l-0 rounded-r focus:ring-1 focus:ring-lime">
                Years
              </span>
            </div>
            {errors.term && <p className="text-red text-sm">{errors.term}</p>}
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-slate-700">Interest Rate</label>
            <div className="flex mt-1 relative">
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-l focus:outline-none focus:ring-1 focus:ring-lime focus:border-lime"
              />
              <span className="flex items-center px-3 text-slate-500 bg-slate-200 border border-slate-300 border-l-0 rounded-r focus:ring-1 focus:ring-lime">
                %
              </span>
            </div>
            {errors.rate && <p className="text-red text-sm">{errors.rate}</p>}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-lime text-slate-900 font-bold p-2 rounded focus:outline-none focus:ring-1 focus:ring-lime"
        >
          Calculate Repayments
        </button>
        {monthlyPayment && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Results</h2>
            <p>Monthly Payment: ${monthlyPayment}</p>
            <p>Total Payment: ${totalPayment}</p>
          </div>
        )}
      </form>
    </div>
  )
}

export default App