import React from 'react';
import ItemProduct from '../Product/ItemProduct';
import HeaderContent from '../Content/HeaderContent';
function NewProductFeature(props) {

    return (
        <section className="new_product_area section_gap_top section_gap_bottom_custom">
            <div className="container">
                <HeaderContent mainContent={props.title}
                    infoContent={props.description}> </HeaderContent>
                <div className="row">

                    <div className="col-lg-12 mt-5 mt-lg-0">
                        <div className="row">
                            {props.data && props.data.length > 0 &&
                                props.data.map((item, index) => {
                                    return (
                                        <ItemProduct id={item.id} type="col-lg-3 col-md-3" name={item.name} img={item.productDetail[0].productImage[0].image}
                                            price={item.productDetail[0].originalPrice} discountPrice={item.productDetail[0].discountPrice}>
                                        </ItemProduct>
                                    )
                                })
                            }


                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default NewProductFeature;