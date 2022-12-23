import React, {useContext }from 'react'
import { GlobalContext } from '../../context/GlobalState'
const Transaction = ({trans, key}) => {

  const { deleteTransaction } = useContext(GlobalContext)  

  const sign = trans.amount<0 ? '-' : '+'
  const check = trans.amount<0 ? 'minus' : 'plus'
  // const dateOnly = trans.date
  return (
    // <div>

    <li className={check}>
          {trans.date} <span>{trans.text} </span><span>{sign}${trans.amount}</span><button onClick={() => deleteTransaction(trans.id)} className="delete-btn">x</button>
    </li>
      
    // </div>
  )
}

export default Transaction
