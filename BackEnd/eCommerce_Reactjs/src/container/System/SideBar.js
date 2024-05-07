import React from 'react';
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
const SideBar = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)
    }, [])
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading"></div>
                        <Link to="/admin" className="nav-link">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt" /></div>
                            Trang chủ
                        </Link>

                        <div className="sb-sidenav-menu-heading">Quản lý</div>
                        {user && user.roleId === "R1" &&
                            <>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-users"></i></div>
                                    Quản lý người dùng
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-user'} className="nav-link" >Danh sách người dùng</Link>
                                        <Link to={'/admin/add-user'} className="nav-link" >Thêm người dùng</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseCategory" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-list-ol"></i></div>
                                    Quản lý danh mục
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseCategory" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-category'} className="nav-link" >Danh sách danh mục</Link>
                                        <Link to={'/admin/add-category'} className="nav-link" >Thêm danh mục</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseBrand" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="far fa-copyright"></i></div>
                                    Quản lý nhãn hàng
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseBrand" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-brand'} className="nav-link" >Danh sách nhãn hàng</Link>
                                        <Link to={'/admin/add-brand'} className="nav-link" >Thêm nhãn hàng</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-tshirt"></i></div>
                                    Quản lý sản phẩm
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-product'} className="nav-link" >Danh sách sản phẩm</Link>
                                        <Link to={'/admin/add-product'} className="nav-link" >Thêm sản phẩm</Link>
                                    </nav>
                                </div>

                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseBanner" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fab fa-adversal"></i></div>
                                    Quản lý băng rôn
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseBanner" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-banner'} className="nav-link" >Danh sách băng rôn</Link>
                                        <Link to={'/admin/add-banner'} className="nav-link" >Thêm băng rôn</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseSubject" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fab fa-blogger"></i></div>
                                    Quản lý chủ đề
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseSubject" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-subject'} className="nav-link" >Danh sách chủ đề</Link>
                                        <Link to={'/admin/add-subject'} className="nav-link" >Thêm chủ đề</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseBlog" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-feather-alt"></i></div>
                                    Quản lý bài đăng
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseBlog" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-blog'} className="nav-link" >Danh sách bài đăng</Link>
                                        <Link to={'/admin/add-blog'} className="nav-link" >Thêm bài đăng</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseShip" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-shipping-fast"></i></div>
                                    Quản lý loại ship
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseShip" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-typeship'} className="nav-link" >DS loại giao hàng</Link>
                                        <Link to={'/admin/add-typeship'} className="nav-link" >Thêm loại giao hàng</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseVoucher" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-percentage"></i></div>
                                    Quản lý voucher
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseVoucher" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-typevoucher'} className="nav-link" >DS loại khuyến mãi</Link>
                                        <Link to={'/admin/list-voucher'} className="nav-link" >DS mã khuyến mãi</Link>
                                        <Link to={'/admin/add-typevoucher'} className="nav-link" >Thêm loại khuyến mãi</Link>
                                        <Link to={'/admin/add-voucher'} className="nav-link" >Thêm mã khuyến mãi</Link>
                                    </nav>
                                </div>
                            </>
                        }

                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseSupplier" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-person-military-pointing"></i></div>
                            Quản lý NCC
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id="collapseSupplier" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to={'/admin/list-supplier'} className="nav-link" >Danh sách NCC</Link>
                                <Link to={'/admin/add-supplier'} className="nav-link" >Thêm nhà cung cấp</Link>
                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseReceipt" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-file-import"></i></div>
                            Quản lý nhập hàng
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id="collapseReceipt" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to={'/admin/list-receipt'} className="nav-link" >Danh sách nhập hàng</Link>
                                <Link to={'/admin/add-receipt'} className="nav-link" >Thêm nhập hàng</Link>
                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseOrder" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-cart-plus"></i></div>
                            Quản lý đơn hàng
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id="collapseOrder" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to={'/admin/list-order'} className="nav-link" >Danh sách đơn hàng</Link>

                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseOrder" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i class="fa-brands fa-facebook-messenger"></i></div>
                            Quản lý tin nhắn
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id="collapseOrder" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to={'/admin/chat'} className="nav-link" >Messenger</Link>

                            </nav>
                        </div>
                        {user && user.roleId === "R1" &&
                            <>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseStatistic" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i class="fa-solid fa-magnifying-glass-chart"></i></div>
                                    Thống kê
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>

                                <div className="collapse" id="collapseStatistic" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/turnover'} className="nav-link" >Thống kê doanh thu</Link>

                                        <Link to={'/admin/profit'} className="nav-link" >Thống kê lợi nhuận</Link>
                                        <Link to={'/admin/stock-product'} className="nav-link" >Thống kê tồn kho</Link>


                                    </nav>
                                </div>
                            </>

                        }


                    </div>
                </div >
                <div className="sb-sidenav-footer">
                   
                    Trang quản trị
                </div>
            </nav >
        </div >
    )
}
export default SideBar;