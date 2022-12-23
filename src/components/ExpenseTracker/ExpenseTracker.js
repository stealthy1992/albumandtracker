import React from 'react'
import Dashboard from '../Dashboard'
import Balance from './Balance'
import IncomeExpenses from './IncomeExpenses'
import TransactionList from './TransactionList'
import AddTransaction from './AddTransaction'
import { GlobalProvider, GlobalContext } from '../../context/GlobalState'
import { useContext} from 'react'

const ExpenseTracker = () => {

  const { transactions } = useContext(GlobalContext)

  const amount = transactions.map((trans) => trans.amount)

  return (
    // <GlobalProvider>
    <>
    {console.log(amount)}
        {/* <Dashboard /> */}

        <div className='container'>
            <Balance />
            <IncomeExpenses />
            <TransactionList />
            <AddTransaction />

        </div>
      
    </>
  //  </GlobalProvider>
  )
}

export default ExpenseTracker
