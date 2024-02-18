import React, { useRef } from "react";
import classes from "./ExpenseForm.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Card from '../UI/Card'

const ExpenseForm = ({ onSubmit,editedExpense }) => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  console.log('edited ',editedExpense)
  const handleSubmit = (event) => {
    event.preventDefault();

    const expense = {
      amount: amountInputRef.current.value,
      description:descriptionInputRef.current.value,
      category:categoryInputRef.current.value,
    };
    
    onSubmit(expense);

    // Clear input fields after adding expense
    amountInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "";
  };

  return (
    
    <section className={classes.formbox}>
   
    <form onSubmit={handleSubmit}>
    <div className="container">
    <div className="row">
        <div className="col">
        <label htmlFor="">Amount</label>
        </div>
        <div className="col">
        <label htmlFor="">Description</label>
        </div>
        <div className="col">
        <label htmlFor="">Category</label>
        </div>
    </div>

    <div className="row">
        <div className="col">
        <input type="number" ref={amountInputRef} defaultValue={editedExpense!== undefined?editedExpense.amount:''}/>
        </div>
        <div className="col">
        <input type="text" ref={descriptionInputRef} defaultValue={editedExpense!== undefined?editedExpense.description:''}/>
        </div>
        <div className="col">
        <select name="category" id="" ref={categoryInputRef}>
          <option value="">{editedExpense!== undefined?editedExpense.category:''}</option>
          <option value="food">Food</option>
          <option value="petrol">Petrol</option>
          <option value="salary">Salary</option>
          <option value="other">Other</option>
        </select>
        </div>
    </div>
      </div>
      <div>
        <button type="submit">Add Expense</button>
      </div>
    </form>   
    </section>

  );
};

export default ExpenseForm;
