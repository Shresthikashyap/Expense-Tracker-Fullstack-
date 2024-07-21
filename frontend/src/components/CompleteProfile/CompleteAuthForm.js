import React, { useRef, useState } from 'react';
import classes from './CompleteAuthForm.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/AuthSlice';
import { useSelector } from 'react-redux';
import Card from '../UI/Card';

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
}

const CompleteAuthForm = () => {

    const idToken = useSelector(state => state.auth.token);
    const dispatch = useDispatch()
    const user = parseJwt(idToken);
    const fullnameInputRef = useRef();
    const photoInputRef = useRef();
    const defaultPic = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png';

    console.log('user.photo',user.photo)
    const photo = user.photo;
    const [photoUrl, setPhotoUrl] = useState(!photo?defaultPic:photo); // State to store the photo URL   

    const onSubmitFormHandler = async(event) => {
        event.preventDefault();
        try {
            const enteredFullname = fullnameInputRef.current ? fullnameInputRef.current.value : '';
            const enteredPhoto = photoInputRef.current ? photoInputRef.current.files[0] : null;

            console.log(enteredFullname,enteredPhoto)
            const formData = new FormData();
            formData.append('photo', enteredPhoto);
            formData.append('name', enteredFullname);

            const response = await axios.post('https://expense-tracker-fullstack-backend.onrender.com/users/update-user', formData, {
                headers: {
                    'Authorization': idToken,
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            const token = response.data.token;
            dispatch(loginSuccess({ token }));
            alert('you successfully updated your profile')
        } catch (err) {
            console.log(err);
            alert('Something went wrong');
        }
    }

    // Function to handle photo input change
    const handlePhotoInputChange = (event) => {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file); // Create a URL for the selected photo
        console.log('image url**********',imageUrl)
        setPhotoUrl(imageUrl); // Set the photo URL in state
    }

    return(
        <Card>
        <section className={classes.auth}>
            <h1>Update Profile</h1>
            <form onSubmit={onSubmitFormHandler}>
             
                <div className={classes.control}>
                    <label htmlFor="photo">Profile Photo:</label>
                    <img src={photoUrl} alt="Profile" className={classes.profileImage} />
                    <input type="file" id="photo" ref={photoInputRef} accept="image/*" onChange={handlePhotoInputChange} />
                </div>

                <div className={classes.control}>
                    <label htmlFor="fullname">FullName</label>
                    <input type="text" id="fullname" ref={fullnameInputRef} defaultValue={user.name ? user.name : ''} />
                </div>

                <div className={classes.actions}>
                    <button type='submit' className={classes.toggle}>
                        Complete Profile
                    </button>
                </div>
            
            </form>
        </section>
        </Card>
    )
}

export default CompleteAuthForm;
