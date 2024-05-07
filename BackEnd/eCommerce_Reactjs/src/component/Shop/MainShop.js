import React, { useState, useEffect } from 'react';
import ItemProduct from '../Product/ItemProduct';
import { getAllProductUser } from '../../services/userService';
import { PAGINATION } from '../../utils/constant';
import ReactPaginate from 'react-paginate';
import FormSearch from '../Search/FormSearch';
function MainShop(props) {

    const [dataProduct, setdataProduct] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [limitPage, setlimitPage] = useState(PAGINATION.pagerow)
    const [sortPrice, setsortPrice] = useState('')
    const [sortName, setsortName] = useState('')
    const [offset, setoffset] = useState(0)
    const [categoryId, setcategoryId] = useState('')
    const [brandId, setbrandId] = useState('')
    const [keyword, setkeyword] = useState('')
    useEffect(() => {

      
         loadProduct(limitPage, sortName, sortPrice, offset, categoryId,keyword)
    
    }, [])
    useEffect(() => {
        setcategoryId(props.categoryId)
        setbrandId(props.brandId)
        let fetchCategory = async () => {

            let arrData = await getAllProductUser({

                sortPrice: sortPrice,
                sortName: sortName,
                limit: limitPage,
                offset: offset,
                categoryId: props.categoryId,
                brandId: props.brandId,
                 keyword:keyword
            })
            if (arrData && arrData.errCode === 0) {
                setdataProduct(arrData.data)
                setCount(Math.ceil(arrData.count / limitPage))
            }
        }
        fetchCategory()

    }, [props.categoryId, props.brandId])


    let loadProduct = async (limitPage, sortName, sortPrice, offset, categoryId,keyword) => {
        let arrData = await getAllProductUser({

            sortPrice: sortPrice,
            sortName: sortName,
            limit: limitPage,
            offset: offset,
            categoryId: categoryId,
            brandId: brandId,
            keyword:keyword

        })
        if (arrData && arrData.errCode === 0) {
            setdataProduct(arrData.data)
            setCount(Math.ceil(arrData.count / limitPage))
        }
    }
    let handleSelectLimitPage = async (event) => {

         setlimitPage(event.target.value)
         loadProduct(event.target.value, sortName, sortPrice, offset, categoryId,keyword)
    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        loadProduct(limitPage, sortName, sortPrice, number.selected * limitPage, categoryId,keyword)
        setoffset(number.selected * limitPage)
        props.myRef.current.scrollIntoView()

    }
    let handleSelectSort = async (event) => {
        let value = +event.target.value

        if (value === 1) {
            loadProduct(limitPage, '', '', offset, categoryId,keyword)

        }
        else if (value === 2) {
            loadProduct(limitPage, '', true, offset, categoryId,keyword)
            setsortPrice(true)
            setsortName('')
        }
        else if (value === 3) {
            loadProduct(limitPage, true, '', offset, categoryId,keyword)
            setsortPrice('')
            setsortName(true)
        }
    }
    let handleSearch = (keyword) =>{
       
        loadProduct(limitPage, sortName, sortPrice, offset, categoryId,keyword)
        setkeyword(keyword)
    }
    let handleOnchangeSearch = (keyword) =>{
        if(keyword === ''){
            loadProduct(limitPage, sortName, sortPrice, offset, categoryId,keyword)
            setkeyword(keyword)
        }
    }
    return (
        <div className="col-lg-9">
            <div className="product_top_bar">
                <div className="left_dorp">
                    <select style={{ outline: 'none' }} onChange={(event) => handleSelectSort(event)} className="sorting">
                        <option value={1}>Sắp xếp</option>
                        <option value={2}>Theo giá tiền</option>
                        <option value={3}>Theo tên</option>
                    </select>
                    <select style={{ outline: 'none' }} onChange={(event) => handleSelectLimitPage(event)} className="show">
                        <option value={6}>Hiển thị 6</option>
                        <option value={12}>Hiển thị 12</option>
                        <option value={18}>Hiển thị 18</option>
                    </select>
                    <div style={{display:'inline-block',marginLeft:'10px',width:'300px'}}>
                    <FormSearch title={"tên tên quần áo"} handleOnchange={handleOnchangeSearch} handleSearch={handleSearch} />
                    </div>
                    
                    
                   
                </div>
                
            </div>
            <div style={{ marginBottom: '10px' }} className="latest_product_inner">
                <div className="row">
                    {dataProduct && dataProduct.length > 0 &&
                        dataProduct.map((item, index) => {
                            return (
                                <ItemProduct id={item.id} width={"255px"} height={"254px"} type="col-lg-4 col-md-6" name={item.name} img={item.productDetail[0].productImage[0].image}
                                    discountPrice={item.productDetail[0].discountPrice} price={item.productDetail[0].originalPrice}></ItemProduct>
                            )
                        })
                    }


                </div>
            </div>
            <ReactPaginate
                previousLabel={'Quay lại'}
                nextLabel={'Tiếp'}
                breakLabel={'...'}
                pageCount={count}
                marginPagesDisplayed={3}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                breakClassName={"page-item"}
                activeClassName={"active"}
                onPageChange={handleChangePage}
            />
        </div>
    );
}

export default MainShop;