import React from 'react';
import { useEffect, useState } from 'react';
import {
    getAllProductDetailImageByIdService, createNewProductImageService, UpdateProductDetailImageService,
    DeleteProductDetailImageService, getAllProductDetailSizeByIdService, createNewProductSizeService,
    UpdateProductDetailSizeService, DeleteProductDetailSizeService
} from '../../../../services/userService';
import moment from 'moment';
import { toast } from 'react-toastify';
import './ManageProductImage.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { PAGINATION } from '../../../../utils/constant';
import ReactPaginate from 'react-paginate';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from "react-router-dom";
import AddImageModal from './AddImageModal';
import AddSizeModal from './AddSizeModal';
const ManageProductImage = () => {

    const { id } = useParams()
    const [dataProductDetailImage, setdataProductDetailImage] = useState([])
    const [dataProductDetailSize, setdataProductDetailSize] = useState([])
    const [isOpen, setisOpen] = useState(false)
    const [isOpenModal, setisOpenModal] = useState(false)
    const [isOpenModalSize, setisOpenModalSize] = useState(false)
    const [imgPreview, setimgPreview] = useState('')
    const [productImageId, setproductImageId] = useState('')
    const [productSizeId, setproductSizeId] = useState('')
    const [count, setCount] = useState('')
    const [countSize, setcountSizes] = useState('')
    const [numberPage, setnumberPage] = useState('')
    useEffect(() => {

        let fetchProductDetailImage = async () => {
            await loadProductDetailImage()
        }
        let fetchProductSize = async () => {
            await loadProductDetailSize()
        }
        fetchProductDetailImage()
        fetchProductSize()

    }, [])
    let loadProductDetailImage = async () => {

        let arrData = await getAllProductDetailImageByIdService({

            id: id,
            limit: PAGINATION.pagerow,
            offset: 0

        })
        if (arrData && arrData.errCode === 0) {
            setdataProductDetailImage(arrData.data)
            setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
        }
    }
    let loadProductDetailSize = async () => {
        let arrSize = await getAllProductDetailSizeByIdService({
            id: id,
            limit: PAGINATION.pagerow,
            offset: 0
        })
        if (arrSize && arrSize.errCode === 0) {
            setdataProductDetailSize(arrSize.data)
            setcountSizes(Math.ceil(arrSize.count / PAGINATION.pagerow))
        }
    }
    let openPreviewImage = (url) => {


        setimgPreview(url);
        setisOpen(true);

    }
    let closeModal = () => {
        setisOpenModal(false)
        setproductImageId('')
    }
    let handleOpenModal = () => {
        setisOpenModal(true)
    }
    let closeModalSize = () => {
        setisOpenModalSize(false)
        setproductSizeId('')
    }
    let handleOpenModalSize = () => {
        setisOpenModalSize(true)
    }
    let sendDataFromModal = async (data) => {
        if (data.isActionUpdate === false) {
            let response = await createNewProductImageService({
                caption: data.caption,
                image: data.image,
                id: id
            })
            if (response && response.errCode === 0) {
                toast.success("Thêm hình ảnh thành công !")
                setisOpenModal(false)
                await loadProductDetailImage()
            } else {
                toast.error("Thêm hình ảnh thất bại !")
            }
        } else {
            let response = await UpdateProductDetailImageService({
                caption: data.caption,
                image: data.image,
                id: data.id
            })
            if (response && response.errCode === 0) {
                setproductImageId('')
                toast.success("Cập nhật hình ảnh thành công !")
                setisOpenModal(false)
                await loadProductDetailImage()

            } else {
                toast.error("Cập nhật ảnh thất bại !")
            }
        }

    }
    let sendDataFromModalSize = async (data) => {
        if (data.isActionUpdate === false) {
            let response = await createNewProductSizeService({
                productdetailId: id,
                sizeId: data.sizeId,
                width: data.width,
                height: data.height,
                stock: data.stock,
                weight: data.weight
            })
            if (response && response.errCode === 0) {
                toast.success("Thêm kích thước thành công !")
                setisOpenModalSize(false)
                await loadProductDetailSize()

            } else {
                toast.error("Thêm kích thước thất bại")
            }
        } else {
            let response = await UpdateProductDetailSizeService({
                sizeId: data.sizeId,
                width: data.width,
                height: data.height,
                stock: data.stock,
                id: data.id,
                weight: data.weight
            })
            if (response && response.errCode === 0) {
                setproductSizeId('')
                toast.success("Cập nhật kích thước thành công !")
                setisOpenModalSize(false)
                await loadProductDetailSize()

            } else {
                toast.error("Cập nhật kích thước thất bại !")
            }
        }
    }
    let handleEditProductImage = (id) => {
        setproductImageId(id)
        setisOpenModal(true)
    }
    let handleEditProductSize = (id) => {
        setproductSizeId(id)
        setisOpenModalSize(true)
    }
    let handleDeleteProductImage = async (productdetailImageId) => {

        let response = await DeleteProductDetailImageService({
            data: {
                id: productdetailImageId
            }
        })
        if (response && response.errCode === 0) {
            toast.success("Xóa hình ảnh thành công !")
            let arrData = await getAllProductDetailImageByIdService({

                id: id,
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow

            })
            if (arrData && arrData.errCode === 0) {
                setdataProductDetailImage(arrData.data)
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }
        } else {
            toast.error("Xóa hình ảnh thất bại !")
        }
    }
    let handleDeleteProductSize = async (productdetailsizeId) => {
        let response = await DeleteProductDetailSizeService({
            data: {
                id: productdetailsizeId
            }
        })
        if (response && response.errCode === 0) {
            toast.success("Xóa kích thước thành công !")
            let arrData = await getAllProductDetailSizeByIdService({

                id: id,
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow

            })
            if (arrData && arrData.errCode === 0) {
                setdataProductDetailSize(arrData.data)
                setcountSizes(Math.ceil(arrData.count / PAGINATION.pagerow))
            }
        } else {
            toast.error("Xóa hình ảnh thất bại !")
        }
    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllProductDetailImageByIdService({

            id: id,
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow

        })
        if (arrData && arrData.errCode === 0) {
            setdataProductDetailImage(arrData.data)

        }
    }
    let handleChangePageProductSize = async (number) => {
        setnumberPage(number.selected)
        let arrSize = await getAllProductDetailSizeByIdService({
            id: id,
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow
        })
        if (arrSize && arrSize.errCode === 0) {
            setdataProductDetailSize(arrSize.data)

        }
    }
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Thông tin chi tiết sản phẩm</h1>

            <div>
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1" />
                        Danh sách hình ảnh chi tiết sản phẩm
                        <div onClick={() => handleOpenModal()} className="float-right"><i style={{ fontSize: '35px', cursor: 'pointer', color: '#0D6EFD' }} className="fas fa-plus-square"></i></div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" style={{ border: '1' }} width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên hình ảnh</th>
                                        <th>Hình ảnh</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {dataProductDetailImage && dataProductDetailImage.length > 0 &&
                                        dataProductDetailImage.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.caption}</td>
                                                    <td ><div onClick={() => openPreviewImage(item.image)} className="box-image" style={{ backgroundImage: `url(${item.image})` }}></div></td>
                                                    <td>

                                                        <span onClick={() => handleEditProductImage(item.id)} style={{ color: '#0E6DFE', cursor: 'pointer' }}   >Edit</span>
                                                        &nbsp; &nbsp;
                                                        <span onClick={() => handleDeleteProductImage(item.id)} style={{ color: '#0E6DFE', cursor: 'pointer' }}   >Delete</span>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }




                                </tbody>
                            </table>
                        </div>
                    </div>
                    <AddImageModal
                        isOpenModal={isOpenModal}
                        closeModal={closeModal}
                        sendDataFromModal={sendDataFromModal}
                        productImageId={productImageId}
                    />
                </div>

                {
                    isOpen === true &&
                    <Lightbox mainSrc={imgPreview}
                        onCloseRequest={() => setisOpen(false)}
                    />
                }
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

            <div>
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1" />
                        Danh sách kích thước chi tiết sản phẩm
                        <div onClick={() => handleOpenModalSize()} className="float-right"><i style={{ fontSize: '35px', cursor: 'pointer', color: '#0D6EFD' }} className="fas fa-plus-square"></i></div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" style={{ border: '1' }} width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Kích thước</th>
                                        <th>Chiều rộng</th>
                                        <th>Chiều dài</th>
                                        <th>Khối lượng</th>
                                        <th>Số lượng tồn</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {dataProductDetailSize && dataProductDetailSize.length > 0 &&
                                        dataProductDetailSize.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.sizeData.value}</td>
                                                    <td>{item.width}</td>
                                                    <td>{item.height}</td>
                                                    <td>{item.weight}</td>
                                                    <td>{item.stock}</td>
                                                    <td>

                                                        <span onClick={() => handleEditProductSize(item.id)} style={{ color: '#0E6DFE', cursor: 'pointer' }}   >Edit</span>
                                                        &nbsp; &nbsp;
                                                        <span onClick={() => handleDeleteProductSize(item.id)} style={{ color: '#0E6DFE', cursor: 'pointer' }}   >Delete</span>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <AddSizeModal
                        isOpenModal={isOpenModalSize}
                        closeModal={closeModalSize}
                        sendDataFromModalSize={sendDataFromModalSize}
                        productSizeId={productSizeId}
                    />
                </div>

                {
                    isOpen === true &&
                    <Lightbox mainSrc={imgPreview}
                        onCloseRequest={() => setisOpen(false)}
                    />
                }
                <ReactPaginate
                    previousLabel={'Quay lại'}
                    nextLabel={'Tiếp'}
                    breakLabel={'...'}
                    pageCount={countSize}
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
                    onPageChange={handleChangePageProductSize}
                />
            </div>
        </div >
    )
}
export default ManageProductImage;