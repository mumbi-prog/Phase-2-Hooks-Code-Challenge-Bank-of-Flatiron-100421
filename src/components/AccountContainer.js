import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer () {
  // step1: to define the states
    const [transactionList, setTransactionsList] = useState([]);

  // step2: to fetch transactions
    const fetchTransactionList = async () => {

      try {
        const response = await fetch("http://localhost:8001/transactions");

        const data = await response.json();
  
      // to update the transaction list state 
        setTransactionsList(data);

        } 
        catch (error) 
        {
      // to console.log an error message should any error occur when fetching
           console.log("Error fetching transaction list:", error);
        }
    };
  
    useEffect(() => {
       fetchTransactionList();
    }, []);

  // step3: search function 
  // requirement: Only transactions with a DESCRIPTION matching the search term should be shown. 
    const searchTransaction = (search) => {

      // to filter a transaction based on the input
      const filteredTransactions = search
        ? transactionList.filter((transaction) =>
            transaction.description.toLowerCase().includes(search.toLowerCase())
          )
        : transactionList;
      
      // update list after meeting requirement to filter
      setTransactionsList(filteredTransactions);
    };

  // step4: to add new trnsaction
  // 
    const addTransaction = (transaction) => {
    
      const updatedTransactionList = [...transactionList, transaction];
  
    // new array after spreading current transactionList array and appending  new transaction
      setTransactionsList(updatedTransactionList);
    };

 
    return (
      <div>
        <Search searchTransaction={searchTransaction} />
        <AddTransactionForm addTransaction={addTransaction} />
        <TransactionsList transactions={transactionList}/>
      </div>
    );
};

export default AccountContainer;