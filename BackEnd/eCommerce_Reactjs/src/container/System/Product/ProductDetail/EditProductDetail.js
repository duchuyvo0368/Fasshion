import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import CommonUtils from '../../../../utils/CommonUtils';
import '../AddProduct.scss';
import { getProductDetailByIdService, UpdateProductDetailService } from '../../../../services/userService';
const EditProductDetail = (props) => {

    const [inputValues, setInputValues] = useState({

        originalPrice: '', discountPrice: '',
        image: '', imageReview: '', isOpen: false, nameDetail: '', description: ''
    });
    const { id } = useParams()

    useEffect(() => {
        let fetchProductDetail = async () => {
            let res = await getProductDetailByIdService(id)
            if (res && res.errCode === 0) {
                setStateProductdetail(res.data)
            }
        }
        fetchProductDetail();
    }, [])
    let setStateProductdetail = (data) => {
        setInputValues({
            ...inputValues,
            ["originalPrice"]: data.originalPrice,
            ["stock"]: data.stock,
            ["discountPrice"]: data.discountPrice,
            ["nameDetail"]: data.nameDetail,
            ["description"]: data.description,
        })

    }
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };

    let handleSaveProductDetail = async () => {

        let res = await UpdateProductDetailService({
            id: id,

            description: inputValues.description,


            originalPrice: inputValues.originalPrice,
            discountPrice: inputValues.discountPrice,
            nameDetail: inputValues.nameDetail
        })
        if (res && res.errCode === 0) {
            toast.success("Cập nhật loại sản phẩm thành công!")
        } else {
            toast.error(res.errMessage)
        }
    }
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý chi tiết sản phẩm</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    Cập nhật chi tiết sản phẩm
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Tên loại sản phẩm</label>
                                <input type="text" value={inputValues.nameDetail} name="nameDetail" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Giá gốc</label>
                                <input type="number" value={inputValues.originalPrice} name="originalPrice" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputPassword4">Giá khuyến mãi</label>
                                <input type="number" value={inputValues.discountPrice} name="discountPrice" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>

                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress">Mô tả chi tiết</label>
                            <textarea rows="4" value={inputValues.description} name="description" onChange={(event) => handleOnChange(event)} className="form-control"></textarea>
                        </div>

                        <button onClick={() => handleSaveProductDetail()} type="button" className="btn btn-primary">Lưu thông tin</button>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default EditProductDetail;