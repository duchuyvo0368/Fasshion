import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from "react-router-dom";
import orderLogo from '../../../src/resources/img/orderLogo.png'
import storeVoucherLogo from '../../../src/resources/img/storeVoucher.png'
function CategoryUser(props) {

    return (

        <div className="col-md-3">
            <ul className="list-category">
                <li className="header">Danh mục</li>
                <li><i style={{ color: '#1e5bb8' }} className="far fa-user"></i> <Link to={`/user/detail/${props.id}`}>Tài khoản của tôi</Link>
                    <ul>
                        <li><Link to={`/user/detail/${props.id}`}>Hồ sơ</Link></li>
                        <li><Link to={`/user/address/${props.id}`}>Địa chỉ</Link></li>
                        <li><Link to={`/user/changepassword/${props.id}`}>Đổi mật khẩu</Link></li>
                    </ul>
                </li>
                <li><img width="20px" height="20px" style={{ marginLeft: "-3px" }} src={orderLogo}></img> <Link to={`/user/order/${props.id}`}>Đơn mua</Link></li>
                <li><img width="20px" height="20px" style={{ marginLeft: "-3px" }} src={storeVoucherLogo}></img> <Link to={`/user/store-voucher/${props.id}`}>Kho voucher</Link></li>
            </ul>
        </div>

    );
}

export default CategoryUser;

