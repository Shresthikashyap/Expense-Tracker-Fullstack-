import React from "react";
import { useSelector } from "react-redux";
import classes from './ExpenseList.module.css';
import Premium from "../Premium/Premium";
import Card from "../UI/Card";

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  
  const Total = useSelector(state => state.expenses.total);
  const isPremium = useSelector(state => state.premium.isPremium);
  //const navigate = useNavigate();

  const handlePremiumNavigation = () => {
      <Premium/>
  };

  return (
    <Card>
    <section className={classes.expenselist}>
      <ul>
        {(Total >= 1000 && !isPremium) && (
          <button onClick={handlePremiumNavigation}>Buy Premium</button>
          
        )}
        {isPremium && <Premium/>}
        <span>Total: {Total}</span>
        {expenses.map((expense, index) => (
          <li key={index}>
            Amount: {expense.amount}, Description: {expense.description},{" "}
            Category: {expense.category}
            <button onClick={() => onEdit(expense._id)}>Edit</button>
            <button onClick={() => onDelete(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
    </Card>
  );
};

export default ExpenseList;
