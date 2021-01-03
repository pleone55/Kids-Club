import React from 'react';
import { connect } from 'react-redux';
import { setCurrent } from '../../actions/kidActions';

const KidItem = ({ kid, setCurrent }) => {

    return (
        <li className='collection-item'>
            <div>
                {kid.checked_in === 0 ? <div></div> : (
                    <a href='#view-kid-modal' 
                        className='modal-trigger' 
                        onClick={() => setCurrent(kid)}>
                            <li>{kid.first_name}{' '}{kid.last_name}</li>
                    </a>)}
            </div>
        </li>
    ) 
}

export default connect(null, { setCurrent })(KidItem);
