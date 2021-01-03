import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getKid } from '../../actions/kidActions';

const ViewKid = ({ current, getKid }) => {
    const [eyeColor, setEyeColor] = useState('');
    const [hairColor, setHairColor] = useState('');
    const [age, setAge] = useState('');
    const [checkedIn, setCheckedIn] = useState('');
    const [checkedInTime, setCheckedInTime] = useState('');

    useEffect(() => {
        if(current) {
            setEyeColor(current.eye_color);
            setHairColor(current.hair_color);
            setAge(current.age);
            setCheckedIn(current.checked_in);
            setCheckedInTime(current.checked_in_time);
            getKid(current.kid_id)
        }
    }, [current, getKid]);

    return (
        <div id="view-kid-modal" className="modal" style={modalStyle}>
            <div className='modal-content'>
                <div className='row'>
                    <div>{eyeColor}</div>
                    <div>{hairColor}</div>
                    <div>{age}</div>
                    <div>{checkedIn === 0 ? checkedIn === 'No' : 'Yes'}</div>
                    <div>{checkedInTime}</div>
                </div>
            </div>
        </div>
    )
}

const modalStyle = {
    width: "75%",
    height: "75%"
};

const mapStateToProps = state => ({
    current: state.kid.current
});

export default connect(mapStateToProps, { getKid })(ViewKid);
