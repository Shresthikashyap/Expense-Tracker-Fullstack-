import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
//import Card from '../UI/Card';
import classes from './Expense.module.css';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList'
import { setExpenses, setTotal, addExpense, deleteExpense, updateExpense } from '../../store/ExpenseSlice';
import Card from '../UI/Card';

// function parseJwt (token) {
//   var base64Url = token.split('.')[1];
//   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//   }).join(''));

//   return JSON.parse(jsonPayload);
// }

const Expense = () => {
  const [editedExpense,setEditedExpense] = useState({});
  //const [showForm,setShowForm] = useState(false);
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses.expenses);
  const token = useSelector(state => state.auth.token);
  const [expenseForm,setExpenseForm] = useState(false);
  // const Token = parseJwt(idToken);
  // delete Token.photo;
  // const token = JSON.stringify(Token)

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        console.log('*******************',token)
        const response = await axios.get('https://expense-tracker-fullstack-lb10.onrender.com/expense/get-expenses', {                 
          headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
      } });
        console.log('total ',response.data.total)
        dispatch(setExpenses(response.data.expenses));
        dispatch(setTotal(response.data.total));
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [token, dispatch]);

  const deleteExpenseHandler = async id => {
    try {
      const response = await axios.delete(`https://expense-tracker-fullstack-lb10.onrender.com/expense/delete-expense/${id.toString()}`, { 
        headers: { 
          'Authorization': token,
          'Content-Type': 'application/json' } });
      dispatch(deleteExpense(id));
      dispatch(setTotal(response.data.total))
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEdit = id => {
    try {
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== id)
      );

      const editExpense = expenses.find((expense) => expense._id === id);
      console.log(editExpense)
      const total = expenses
      .filter(expense => expense._id !== id)
      .reduce((total, expense) => total + expense.amount, 0);
      console.log(total)
      dispatch(setTotal(total))

      // Populate the form fields with the expense values
      setEditedExpense(editExpense);
    } catch (error) {
      console.error("Error editing expense:", error);
    }
  };

  const handleSubmitExpense = async (expense) => {
    try {
      let response = null;
      if (Object.keys(editedExpense).length !== 0) {
        response = await axios.post(`https://expense-tracker-fullstack-lb10.onrender.com/expense/update-expense/${editedExpense._id}`, expense, { 
          headers: { 
            'Authorization': token,
            'Content-Type': 'application/json'
          } });
        dispatch(updateExpense({ id: editedExpense._id, updatedExpense: response.data.expense }));
      } else {
        response = await axios.post('https://expense-tracker-fullstack-lb10.onrender.com/expense/add-expense', expense, { 
          headers: { 
            'Authorization': token,
            'Content-Type': 'application/json'
          } });
        dispatch(addExpense(response.data.expense));
      }
      dispatch(setTotal(response.data.total));
      console.log('Expense added successfully:', response.data.expense);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };  

  return (
    <Card>
    <section className={classes.form_box}>
      <h1>Expenses</h1>
      
      {expenseForm ? 
      (<button onClick={() => setExpenseForm(false)}>Close Form</button>) 
      : (<button onClick={() => setExpenseForm(true)}>Add Expenses</button>)
      }
      <span >
      {expenseForm && <ExpenseForm onSubmit={handleSubmitExpense} editedExpense={editedExpense} />}
      
        {<ExpenseList expenses={expenses} onDelete={deleteExpenseHandler} onEdit={handleEdit} />}

      </span>
    </section>
  </Card>
  );
};

export default Expense;
