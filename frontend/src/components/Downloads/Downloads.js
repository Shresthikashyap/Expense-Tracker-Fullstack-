import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import classes from './Downloads.module.css'
import Card from "../UI/Card";

const Downloads = () => {
    const [downloads, setDownloads] = useState([]);
    const token = useSelector(state => state.auth.token);
    const isPremium = useSelector(state => state.premium.isPremium);
    const navigate = useNavigate();
    //const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const getDownloads = async () => {
            try {
                
                const response = await axios.get(`https://expense-tracker-fullstack-backend.onrender.com/downloadedFiles/all`, {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('here')
                console.log(response)
                setDownloads(response.data);
                //setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching downloads:", error);
                //setLoading(false); // Set loading to false on error
            }
        };

        getDownloads();

    }, [token]);

    return (
        <Card>
        <section className={classes.downloads}>
            <h1>Downloads</h1>
            <span>
            {isPremium && 
                <ul>
                    {downloads.map((download, index) => (
                        <li key={index}>
                            <a href={download}>{download}</a>
                        </li>
                    ))}
                </ul>
            }
            </span>
            {isPremium && downloads.length===0 && <p>No Downloads</p>}
            {!isPremium && 
            <>
            <h5 style={{marginTop:'20%', fontSize:'larger', fontWeight:'700'}}>You are not a premium member</h5>
            <button onClick={ ()=> navigate('/premium')}>Buy Premium</button>
            </>
            }
        </section>
        </Card>
    );
}

export default Downloads;
