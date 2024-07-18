import { useSelector, useDispatch } from 'react-redux';
//import { toggleTheme } from '../../store/ThemeSlice';
import axios from 'axios';
import useRazorpay from "react-razorpay";
import { activatePremium } from '../../store/PremiumSlice';
import { useNavigate } from 'react-router-dom';
import classes from './Premium.module.css'

const Premium = () => {
    const isPremium = useSelector(state =>state.premium.isPremium);
    // const total = useSelector(state => state.expenses.total);
    // const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
    const token = useSelector(state=>state.auth.token);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Razorpay] = useRazorpay();

    // const toggleThemeHandler = () => {
    //     dispatch(toggleTheme());
    // };

    const handleDownload = async () => {
        try {
            
            const response = await axios.get('https://expense-tracker-fullstack-backend.onrender.com/user/download', { 
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                } })
           
            if(response.status === 200){
                alert('You successfully downloaded the file');
            }
                
            // if(response.status === 201){
            //         //the backend is essentially sending a download link
            //         //  which if we open in browser, the file would download
            //     var a = document.createElement("a");
            //     a.href = response.data.fileUrl;
            //     a.download = 'myexpense.csv';
            //     a.click();
            // } 
            else {
                alert(response.data.message)
                throw new Error(response.data.message)
            }
        } catch (error) {
            alert(error)
            console.error('Error downloading expenses:', error);
        }
    };

    const handleActivatePremium = async() => {
        try {
            console.log('here')
            const response = await axios.get('https://expense-tracker-fullstack-backend.onrender.com/purchase/premiummembership',{ 
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                } });
            
   console.log(response.data.key_id);
   console.log(response.data.order.id);
   var options={
    "key" : response.data.key_id,
    "order_id" :response.data.order.id,
    "handler" : async function(response){
      
        await axios.post('https://expense-tracker-fullstack-backend.onrender.com/purchase/updatetransactionstatus',{
            order_id : options.order_id,
            payment_id : response.razorpay_payment_id,
        },{ 
            headers: {
                "Authorization":token,
                'Content-Type': 'application/json'
        }});
        
        alert('You are a Premium User');
        navigate('/leaderboard')
    }
   }
   
   const rzp1 = new Razorpay(options);
   rzp1.open();

            dispatch(activatePremium())
        } catch (error) {
            console.error('Error activating premium membership:', error);
            alert('Failed to activate premium membership. Please try again later.');
        }
    };

    return (
        <div className={classes.premium}>
            {!isPremium &&<div>
                 <p>Would you like to activate the premium</p>
                 <button onClick={handleActivatePremium} >Activate Premium</button>
            </div>}
            {isPremium && 
                <button onClick={handleDownload}>Download Expenses</button>      
            }
        </div>
    );
};

export default Premium;
