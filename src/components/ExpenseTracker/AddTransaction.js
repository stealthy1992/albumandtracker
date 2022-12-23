import React, { useContext } from 'react'
import { useState } from 'react'
import { GlobalContext } from '../../context/GlobalState'

const AddTransaction = () => {

  const [text, setText] = useState('') 
  const [amount, setAmount] = useState(0)  
  const { addTransaction } = useContext(GlobalContext) 

  const submitFunction = (e) => {

    e.preventDefault()

    const newTransation = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
      date: new Date().toDateString()
    }

    addTransaction(newTransation)

  }

  return (
    <>
    <h3>Add new transaction</h3>
      <form id="form" onSubmit={submitFunction}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" placeholder="Enter text..." value={text} onChange={(e) => setText(e.target.value)}/>
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)</label
          >
          <input type="number" placeholder="Enter amount..." value={amount} onChange={(e) => setAmount(e.target.value)}/>
        </div>
        <button class="btn">Add transaction</button>
      </form>
      
    </>
  )
}

export default AddTransaction
