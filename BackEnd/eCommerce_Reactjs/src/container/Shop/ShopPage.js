import React, { useState, useRef, useEffect } from 'react';
import MainShop from '../../component/Shop/MainShop';
import Category from '../../component/Shop/Category';
import Brand from '../../component/Shop/Brand';
import Pagination from '../../component/Shop/Pagination';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
function ShopPage(props) {

    useEffect(async () => {
        window.scrollTo(0, 0);
    }, [])


    const [categoryId, setcategoryId] = useState('')
    const [brandId, setbrandId] = useState('')
    const myRef = useRef(null)
    let handleRecevieDataCategory = (code) => {
        setcategoryId(code)
    }
    let handleRecevieDataBrand = (code) => {

        setbrandId(code)
    }
    return (
        <div>
            <section ref={myRef} className="banner_area">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content d-md-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-md-0">
                                <h2>Danh mục cửa hàng</h2>
                                <p>Hãy lựa chọn sản phẩm phù hợp cho chính mình</p>
                            </div>
                            <div className="page_link">
                                <Link to={"/"}>Trang chủ</Link>
                                <Link to={"/shop"}>Cửa hàng</Link>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="cat_product_area section_gap">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <MainShop categoryId={categoryId} brandId={brandId} myRef={myRef} />
                        <div className="col-lg-3">
                            <div className="left_sidebar_area">
                                <Category handleRecevieDataCategory={handleRecevieDataCategory} />
                                <Brand handleRecevieDataBrand={handleRecevieDataBrand} />
                            </div>
                        </div>
                    </div>
                    {/* <Pagination amountPage={3}
                        myFunction={{ changePage: handleChangePage, changePerPage: handleChangePage }}></Pagination> */}
                </div>

            </section>
            {/* <Footer /> */}
        </div>



    );
}

export default ShopPage;