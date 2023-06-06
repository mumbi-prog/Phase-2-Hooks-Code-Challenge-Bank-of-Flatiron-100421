import React from "react";

function AddTransactionForm({ addTransaction }) {

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const { date, description, category, amount } = event.target;
  
    // step1: new transaction object
    const newTransaction = {
      date: date.value,
      description: description.value,
      category: category.value,
      amount: amount.value,
    };
  
    addTransaction(newTransaction);
  
    // reset form
    event.target.reset();
  
    try {
      // step2: to send transaction data to server
      const response = await fetch('http://localhost:8001/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });
  
      // to parse response
      const data = await response.json();
      console.log(data);
  
      addTransaction(newTransaction);
    } catch (error) {
      //console.log an error should any occur
      console.error('Error:', error);
    }
  };

  // Rendering the add transaction form
  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleFormSubmit}>
        <div className="inline fields">
          <input type="date" name="date" />
          <input type="text" name="description" placeholder="Description" />
          <input type="text" name="category" placeholder="Category" />
          <input type="number" name="amount" placeholder="Amount" step="0.01" />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;