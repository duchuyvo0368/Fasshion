import React, { useEffect, useState } from 'react';


import './HomeBanner.scss';
import { Link } from 'react-router-dom';
function HomeBanner(props) {


    return (

        <section className="home_banner_area mb-40" >
            {/* class home_banner_area trong file style.css chứa background banner  */}
            <div className="box-banner" style={{ backgroundImage: `url(${props.image})`,backgroundPosition:'center' }}>
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content row">
                            <div className="col-lg-12">
                                <p className="sub text-uppercase">{props.name}</p>
                                <h3><span>Show</span> Your <br />Personal <span>Style</span></h3>
                                <h4>Hãy đến với cửa hàng chúng tôi</h4>
                                <Link className="main_btn mt-40" to={"/shop"}>Đến cửa hàng ngay</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>




    );

}

export default HomeBanner;