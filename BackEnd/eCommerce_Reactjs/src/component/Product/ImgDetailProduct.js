import React from 'react';

function ImgDetailProduct(props) {
    return (
        <div className="col-lg-6">
            <div className="s_product_img">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active">
                            <img className="w-100" src="https://technext.github.io/eiser/img/product/single-product/s-product-1.jpg" alt="" />
                        </li>
                        <li data-target="#carouselExampleIndicators" data-slide-to={1}>
                            <img className="w-100" src="https://technext.github.io/eiser/img/product/single-product/s-product-1.jpg" alt="" />
                        </li>
                        <li data-target="#carouselExampleIndicators" data-slide-to={2}>
                            <img className="w-100" src="https://technext.github.io/eiser/img/product/single-product/s-product-1.jpg" alt="" />
                        </li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100"
                                src="https://technext.github.io/eiser/img/product/single-product/s-product-1.jpg" alt="Ảnh bị lỗi" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100"
                                src="https://technext.github.io/eiser/img/product/single-product/s-product-1.jpg" alt="Ảnh bị lỗi" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100"
                                src="https://technext.github.io/eiser/img/product/single-product/s-product-1.jpg" alt="Ảnh bị lỗi" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImgDetailProduct;