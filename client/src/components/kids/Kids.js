import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getKids } from '../../actions/kidActions';
import KidItem from './KidItem';

const Kids = ({ kid: { kids, loading }, getKids }) => {

    useEffect(() => {
        getKids();
        //eslint-disable-next-line
    }, []);

    if(loading || kids === null) {
        return <h4>Loading...</h4>
    }

    return (
        <ul className="collection with-header">
            <li className="collection-header">
                <h4 className="center">Kids</h4>
            </li>
            {!loading && kids.length === 0 ? (<p className="center">No kids to show...</p>) : (
                kids.map(kid => <KidItem kid={kid} key={kid.kid_id} />))
            }
        </ul>
    )
}

const mapStateToProps = state => ({
    kid: state.kid
})

export default connect(mapStateToProps, { getKids })(Kids);
