import React, { useState, useEffect } from 'react';
import VoucherItem from '../Voucher/VoucherItem';
import logoVoucher from '../../../src/resources/img/logoVoucher.png'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import './VoucherItemSmall.scss';
import { useDispatch } from 'react-redux';
import { ChooseVoucherStart } from '../../action/ShopCartAction';
function VoucherItemSmall(props) {
    const dispatch = useDispatch()
    let handleClickApplyVoucher = () => {
        try {
            dispatch(ChooseVoucherStart(props.data))
            props.closeModalFromVoucherItem()
        } catch (error) {

        }

    }

    return (

        <div className="box-voucher-small">
            <div className="content-left">
                <img src={logoVoucher}></img>
                <span>{props.name}</span>
            </div>
            <div className="border-center">

            </div>
            <div className="content-right">
                <div className="box-content-right">
                    <span className="name-voucher">Giảm {props.typeVoucher}</span>
                    <a style={{ cursor: 'pointer' }} onClick={() => handleClickApplyVoucher()} className="use-voucher">Dùng ngay</a>
                    <span className="max-value-voucher">Giảm tối đa {props.maxValue}</span>
                    <div className="box-percent">
                        <div className="wrap-percent">
                            <div style={{ width: `${props.usedAmount}%` }} className="percent"></div>
                        </div>
                        <span className="used-percent">Đã dùng {props.usedAmount}%</span>
                    </div>

                </div>

            </div>
        </div>

    );
}

export default VoucherItemSmall;

