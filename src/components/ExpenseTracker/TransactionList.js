import React, { useContext} from 'react'
import { GlobalContext } from '../../context/GlobalState'
import Transaction from './Transaction'

const TransactionList = () => {

  const { transactions } = useContext(GlobalContext)

  

  // console.log(context)
  return (
    <>
    <h3>History</h3>
      <ul className="list">
        {transactions.map((data) => (<Transaction key={data.id} trans={data}/>))}
        
      </ul>
      
    </>
  )
}

export default TransactionList
