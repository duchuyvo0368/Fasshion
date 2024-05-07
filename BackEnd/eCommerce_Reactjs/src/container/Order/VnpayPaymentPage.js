import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useParams,useLocation  } from 'react-router-dom';

import {
    paymentOrderVnpayService
} from '../../services/userService';
import './OrderHomePage.scss';

import { toast } from 'react-toastify';

import CommonUtils from '../../utils/CommonUtils';

function VnpayPaymentPage(props) {
    const [inputValues, setInputValues] = useState({
        orderType: 'billpayment', orderDescription: '', bankCode: '', language: 'vn', amount: ''
    });
    const location = useLocation();
    const handleOnChange = event => {
        const { name, value } = event.target;
        if(name =="amount"){
            return;
        }
        setInputValues({ ...inputValues, [name]: value });

    };
    useEffect(()=>{
        if(location && location.orderData){
            setInputValues({ ...inputValues, ["amount"]: location.orderData.total });
        }
      
       
       
    },[location])
    let handleOnclick = async () =>{
        let res = await paymentOrderVnpayService({
            orderType: inputValues.orderType,
            orderDescription: inputValues.orderDescription,
            bankCode: inputValues.bankCode,
            language: inputValues.language,
            amount: inputValues.amount
        })
        if(res && res.errCode ==200){
            console.log("orderData",location.orderData)
            localStorage.setItem("orderData", JSON.stringify(location.orderData))
        
            window.location.href = res.link
        }
        
    }
    return (

        <>

            <div className="wrap-order">
                <div className="wrap-heading-order">
                    <NavLink to="/" className="navbar-brand logo_h">
                        <img src="/resources/img/logo.png" alt="" />
                    </NavLink>
                    <span>Thanh Toán VNPAY</span>
                </div>
               
                <div className="wrap-order-item">
                    <section className="cart_area">
                        <div className="container">
                            <div className="cart_inner">
                            <div className="col-md-12">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Thông tin thanh toán</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12"><label className="labels">Loại hàng hóa</label><select value={inputValues.orderType} onChange={(event) => handleOnChange(event)} name="orderType"  id="inputState" className="form-control">
                                
                                <option value='billpayment'>Thanh toán hóa đơn</option>
                                </select></div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12"><label className="labels">Số tiền</label><input name="amount" disabled={true} value={inputValues.amount} onChange={(event) => handleOnChange(event)}  type="text" className="form-control" /></div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12"><label className="labels">Nội dung thanh toán</label><input value={inputValues.orderDescription} onChange={(event) => handleOnChange(event)} name="orderDescription"   type="text" className="form-control" /></div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12"><label className="labels">Ngân hàng</label><select value={inputValues.bankCode}  onChange={(event) => handleOnChange(event)} name="bankCode"  id="inputState" className="form-control">
                                
                            <option value=''>  Không chọn </option>
                            <option value='VNPAYQR'>  Ngân hàng VNPAYQR</option>
                            <option value='NCB'>  Ngân hàng NCB</option>
                            <option value='SCB'>  Ngân hàng SCB</option>
                            <option value='SACOMBANK'>  Ngân hàng SACOMBANK</option>
                            <option value='EXIMBANK'>  Ngân hàng EXIMBANK</option>
                            <option value='MSBANK'>  Ngân hàng MSBANK</option>
                            <option value='NAMABANK'>  Ngân hàng NAMABANK</option>
                            <option value='VISA'>  Ngân hàng VISA</option>
                            <option value='VNMART'>  Ngân hàng VNMART</option>
                            <option value='VIETINBANK'>  Ngân hàng VIETINBANK</option>
                            <option value='VIETCOMBANK'>  Ngân hàng VIETCOMBANK</option>
                            <option value='HDBANK'>  Ngân hàng HDBANK</option>
                            <option value='DONGABANK'>  Ngân hàng Dong A</option>
                            <option value='TPBANK'>  Ngân hàng Tp Bank</option>
                            <option value='OJB'>  Ngân hàng OceanBank</option>
                            <option value='BIDV'>  Ngân hàng BIDV</option>
                            <option value='TECHCOMBANK'>  Ngân hàng Techcombank</option>
                            <option value='VPBANK'>  Ngân hàng VPBank</option>
                            <option value='AGRIBANK'>  Ngân hàng AGRIBANK</option>
                            <option value='MBBANK'>  Ngân hàng MBBank</option>
                            <option value='ACB'>  Ngân hàng ACB</option>
                            <option value='OCB'>  Ngân hàng OCB</option>
                            <option value='SHB'>  Ngân hàng SHB</option>
                            <option value='IVB'>  Ngân hàng IVB</option>
                                
                            </select></div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12"><label className="labels">Ngôn ngữ</label><select value={inputValues.language} onChange={(event) => handleOnChange(event)} name="language"  id="inputState" className="form-control">
                                
                                <option value='vn'>Tiếng Việt</option>
                                <option value='en'>English</option>
                             
                                    
                                </select></div>
                        </div>
                       
                        <div  className="mt-3"><button onClick={() => handleOnclick()} className="btn btn-primary profile-button" type="button">Thanh Toán</button></div>
                    </div>
                </div>
                            </div>

                            

                        </div>


                    </section>
                </div>
               
             
            </div>
            <div style={{ width: '100%', height: '100px', backgroundColor: '#f5f5f5' }}></div>
        </>

    );
}

export default VnpayPaymentPage;