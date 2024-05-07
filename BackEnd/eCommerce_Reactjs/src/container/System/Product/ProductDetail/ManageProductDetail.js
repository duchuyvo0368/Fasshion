import React from 'react';
import { useEffect, useState } from 'react';
import { getAllProductDetailByIdService, DeleteProductDetailService } from '../../../../services/userService';
import moment from 'moment';
import { toast } from 'react-toastify';
import { PAGINATION } from '../../../../utils/constant';
import ReactPaginate from 'react-paginate';
import CommonUtils from '../../../../utils/CommonUtils';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from "react-router-dom";

const ManageProductDetail = () => {

    const { id } = useParams()
    const [dataProductDetail, setdataProductDetail] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    useEffect(() => {

        let fetchProductDetail = async () => {
            await loadProductDetail()
        }
        fetchProductDetail()
    }, [])
    let loadProductDetail = async () => {
        let arrData = await getAllProductDetailByIdService({

            id: id,
            limit: PAGINATION.pagerow,
            offset: 0

        })
        if (arrData && arrData.errCode === 0) {
            setdataProductDetail(arrData.data)
            setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
        }
    }
    let handleDeleteProductDetail = async (productdetailId) => {
        let response = await DeleteProductDetailService({
            data: {
                id: productdetailId
            }
        })
        if (response && response.errCode === 0) {
            toast.success("Xóa chi tiết sản phẩm thành công !")

            let arrData = await getAllProductDetailByIdService({

                id: id,
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow

            })
            if (arrData && arrData.errCode === 0) {
                setdataProductDetail(arrData.data)
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }

        } else {
            toast.error("Xóa sản phẩm thất bại")
        }
    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllProductDetailByIdService({

            id: id,
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow

        })
        if (arrData && arrData.errCode === 0) {
            setdataProductDetail(arrData.data)

        }
    }
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý chi tiết sản phẩm</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    Danh sách chi tiết sản phẩm
                    <div className="float-right"><Link to={`/admin/add-product-detail/${id}`}><i style={{ fontSize: '35px', cursor: 'pointer', color: '#0D6EFD' }} className="fas fa-plus-square"></i></Link></div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" style={{ border: '1' }} width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên loại sản phẩm</th>
                                    <th>Giá gốc</th>
                                    <th>Giá khuyến mãi</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataProductDetail && dataProductDetail.length > 0 &&
                                    dataProductDetail.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.nameDetail}</td>
                                                <td>{CommonUtils.formatter.format(item.originalPrice)}</td>
                                                <td>{CommonUtils.formatter.format(item.discountPrice)}</td>
                                                <td>
                                                    <Link to={`/admin/list-product-detail-image/${item.id}`}>View</Link>
                                                    &nbsp; &nbsp;
                                                    <Link to={`/admin/update-product-detail/${item.id}`}>Edit</Link>
                                                    &nbsp; &nbsp;
                                                    <span onClick={() => handleDeleteProductDetail(item.id)} style={{ color: '#0E6DFE', cursor: 'pointer' }}   >Delete</span>

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
export default ManageProductDetail;