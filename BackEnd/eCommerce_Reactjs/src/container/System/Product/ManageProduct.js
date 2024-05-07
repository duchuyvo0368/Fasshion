import React from 'react';
import { useEffect, useState } from 'react';
import { getAllProductAdmin, handleBanProductService, handleActiveProductService } from '../../../services/userService';
import moment from 'moment';
import { toast } from 'react-toastify';
import { PAGINATION } from '../../../utils/constant';
import ReactPaginate from 'react-paginate';
import CommonUtils from '../../../utils/CommonUtils';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import FormSearch from '../../../component/Search/FormSearch';
const ManageProduct = () => {

    const [dataProduct, setdataProduct] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [keyword, setkeyword] = useState('')
    useEffect(() => {

        let fetchProduct = async () => {
            await loadProduct(keyword)
        }
        fetchProduct()
    }, [])
    let loadProduct = async (keyword) => {
        let arrData = await getAllProductAdmin({

            sortName: '',
            sortPrice: '',
            categoryId: 'ALL',
            brandId: 'ALL',
            limit: PAGINATION.pagerow,
            offset: 0,
            keyword:keyword

        })
        if (arrData && arrData.errCode === 0) {
            setdataProduct(arrData.data)
            setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
        }
    }
    let handleBanProduct = async (id) => {

        let data = await handleBanProductService({
            id: id
        })
        if (data && data.errCode === 0) {
            toast.success("Ẩn sản phẩm thành công!")
            let arrData = await getAllProductAdmin({

                sortName: '',
                sortPrice: '',
                categoryId: 'ALL',
                brandId: 'ALL',
                keyword:'',
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow

            })
            if (arrData && arrData.errCode === 0) {
                setdataProduct(arrData.data)
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }
        } else {
            toast.error("Ẩn sản phẩm thất bại!")
        }
    }
    let handleActiveProduct = async (id) => {

        let data = await handleActiveProductService({
            id: id
        })
        if (data && data.errCode === 0) {
            toast.success("Hiện sản phẩm thành công!")
            loadProduct('');
        } else {
            toast.error("Hiện sản phẩm thất bại!")
        }
    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllProductAdmin({
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            sortName: '',
            sortPrice: '',
            categoryId: 'ALL',
            brandId: 'ALL',
            keyword:keyword
        })
        if (arrData && arrData.errCode === 0) {
            setdataProduct(arrData.data)

        }
    }
    let handleSearchProduct = (keyword) =>{
        loadProduct(keyword)
        setkeyword(keyword)
    }
    let handleOnchangeSearch = (keyword) =>{
        if(keyword === ''){
            loadProduct(keyword)
            setkeyword(keyword)
         }
        
    }
    let handleOnClickExport =async () =>{
        let res = await getAllProductAdmin({
            sortName: '',
            sortPrice: '',
            categoryId: 'ALL',
            brandId: 'ALL',
            keyword:'',
            limit: '',
            offset: ''
        })
        if(res && res.errCode == 0){
            await CommonUtils.exportExcel(res.data,"Danh sách sản phẩm","ListProduct")
        }
       
    }
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý sản phẩm</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    Danh sách sản phẩm

                </div>
             
                   
              
                <div className="card-body">
                  
                    <div className='row'>
                    <div  className='col-4'>
                    <FormSearch title={"tên sản phẩm"} handleOnchange={handleOnchangeSearch} handleSearch={handleSearchProduct} />                    </div>
                    <div className='col-8'>
                    <button  style={{float:'right'}} onClick={() => handleOnClickExport()} className="btn btn-success" >Xuất excel <i class="fa-solid fa-file-excel"></i></button>
                    </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered" style={{ border: '1' }} width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Danh mục</th>
                                    <th>Nhãn hàng</th>
                                    <th>Chất liệu</th>
                                    <th>Được làm bởi</th>
                                    <th>Lượt xem</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataProduct && dataProduct.length > 0 &&
                                    dataProduct.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.categoryData.value}</td>
                                                <td>{item.brandData.value}</td>
                                                <td>{item.material}</td>
                                                <td>{item.madeby}</td>
                                                <td>{item.view ? item.view : 0}</td>
                                                <td>{item.statusData.value}</td>
                                                <td style={{ width: '12%' }}>
                                                    <Link to={`/admin/list-product-detail/${item.id}`}>View</Link>
                                                    &nbsp; &nbsp;
                                                    <Link to={`/admin/edit-product/${item.id}`}>Edit</Link>
                                                    &nbsp; &nbsp;
                                                    {item.statusData.code === 'S1' ?
                                                        <span onClick={() => handleBanProduct(item.id)} style={{ color: '#0E6DFE', cursor: 'pointer' }} >Ban</span>
                                                        : <span onClick={() => handleActiveProduct(item.id)} style={{ color: '#0E6DFE', cursor: 'pointer' }}   >Active</span>
                                                    }



                                                </td>
                                            </tr>
                                        )
                                    })
                                }




                            </tbody>
                        </table>
                    </div>
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
    )
}
export default ManageProduct;