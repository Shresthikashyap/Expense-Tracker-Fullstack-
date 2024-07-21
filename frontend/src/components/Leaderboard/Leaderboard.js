import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./Leaderboard.module.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";

const Leaderboard = () => {


    const isPremium = useSelector(state=> state.premium.isPremium);
    const navigate = useNavigate()
    const [leaderBoard, setLeaderBoard] = useState([]);
    const [page, setPage] = useState(1); // Current page
    const [limit, setLimit] = useState(5); // Number of users per page
    const [totalPages, setTotalPages] = useState(1); // Total pages
    const token = useSelector(state => state.auth.token);


    useEffect(() => {
        const getLeaderBoard = async () => {
            try {

                const response = await axios.get(`https://expense-tracker-fullstack-lb10.onrender.com/premium/leadership?page=${page}&pageSize=${limit}`, { 
                    headers: { 
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }});
                console.log(response.data)
                setLeaderBoard(response.data.leaderboardofuser);
                setTotalPages(Math.ceil(response.data.totalUser));
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            }
        };

        //if(isPremium){
            getLeaderBoard();
        //}else{
        //     navigate('/premium')
        // }
        
    }, [isPremium,navigate, page, limit, token]);

    const handleChangeLimit = (e) => {
        if(e.target.value >0 && (page * e.target.value)<=totalPages){
           setLimit(e.target.value); 
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <Card>
        <section className={classes.leaderboard}>
        
        <h1>Leaderboard</h1>
        {isPremium ?
        (<span>
            <input type="number" value={limit} onChange={handleChangeLimit} />
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Total Expense</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderBoard.map((user, index) => (
                        <tr key={index}>
                            <td>{user.email}</td>
                            <td>{user.totalExpense}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>{'<'}</button>
                <span>{page}/{Math.ceil(totalPages/limit)}</span>
                <button disabled={((page * limit) >= totalPages)} onClick={() => handlePageChange(page + 1)}>{'>'}</button>
            </div>
            </span>)
            :
            <>
            <h5 style={{marginTop:'20%'}}> Would you like to Buy Premium</h5>
            <button onClick={ ()=> navigate('/premium')}>Buy Premium</button>
            </>
            
            }
        </section>
        </Card>
    );
};

export default Leaderboard;
