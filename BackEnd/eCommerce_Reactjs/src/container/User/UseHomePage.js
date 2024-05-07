import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import DetailUserPage from './DetailUserPage';
import CategoryUser from './CategoryUser';
import StoreVoucher from './StoreVoucher';
import AddressUser from './AddressUser';
import ChangePassword from '../System/User/ChangePassword';
import OrderUser from './OrderUser';
import MessagePage from '../Message/MessagePage';

function UserHomePage(props) {
    const [user, setUser] = useState({})
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)
    }, [])
    return (

        <Router>
         
            <Switch>
                <Route exact path="/user/messenger">
                 <MessagePage />
                </Route>
                <div style={{ display: 'flex' }} className="container rounded bg-white mt-5 mb-5">

                    <Route exact path="/user/detail/:id">
                        <DetailUserPage />
                    </Route>
                    <Route exact path="/user/store-voucher/:id">
                        <StoreVoucher id={user.id} />
                    </Route>
                    <Route exact path="/user/address/:id">
                        <AddressUser id={user.id} />
                    </Route>
                    <Route exact path="/user/order/:id">
                        <OrderUser id={user.id} />
                    </Route>
                    <Route exact path="/user/changepassword/:id">
                        <ChangePassword id={user.id} />
                    </Route>
                    <CategoryUser id={user.id} />
                   
                </div>

            </Switch>

        </Router>

    );
}

export default UserHomePage;