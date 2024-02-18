import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Home.module.css';
import { toggleTheme } from '../../store/ThemeSlice';
import VerifyEmail from '../AuthForm/VerifyEmail';
import Card from '../UI/Card';

const Home = () => {
    const isPremium = useSelector(state =>state.premium.isPremium);
    const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
    const dispatch = useDispatch();

    const toggleThemeHandler = () => {
        dispatch(toggleTheme());
    };

  return (
    <Card>
    <div className={classes.home}>
      <h1>Welcome to Expense Tracker</h1>
      <div>
      <p>This is a simple expense tracker application.
        You can manage your expenses by adding, editing, and deleting them.</p>
      </div>
     
      {isPremium && (
                <div> 
                    <p>Would you light to change the mode?</p>
                    <button onClick={toggleThemeHandler}>{isDarkTheme?'Light Mode':'Dark Mode'}</button>
                </div>
        )} 
        {isPremium && 
        <div>
          <p>Verify your email</p>
          <VerifyEmail/>
        </div>}
        
    </div>
    </Card>
  );
};

export default Home;
