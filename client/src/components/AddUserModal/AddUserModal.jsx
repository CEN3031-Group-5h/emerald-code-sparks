import React, { useState } from 'react';
import "./AddUserModal.less"

const AddUserModal = ({ isOpen, closeModal, submitUser }) => {
    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(userEmail){
            let status = await submitUser(userEmail);
            setUserEmail('');
            if (status === true) {
                closeModal();
            }
        }
    }

    if (!isOpen){
        return null;
    }

    return (
        <div className={"modal"}>
            <div className={"modal-content"}>
                <span className="close-button" onClick={closeModal}>x</span>
                <h2>Add User Form</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="email" value={userEmail} placeholder={"Please Enter User Email"} onChange={(e) => setUserEmail(e.target.value)} />
                    <input type="submit" onClick={handleSubmit}></input>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;