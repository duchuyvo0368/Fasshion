import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import CommonUtils from '../../../../utils/CommonUtils';
import '../AddProduct.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useFetchAllcode } from '../../../customize/fetch';
import { CreateNewProductDetailService, } from '../../../../services/userService';
const AddProductDetail = (props) => {
    const { data: dataSize } = useFetchAllcode('SIZE')
    const { id } = useParams()
    const [inputValues, setInputValues] = useState({

        width: '', height: '', sizeId: '', originalPrice: '', discountPrice: '',
        image: '', imageReview: '', isOpen: false, nameDetail: '', description: '', weight: ''
    });

    if (dataSize && dataSize.length > 0 && inputValues.sizeId === '') {

        setInputValues({ ...inputValues, ["sizeId"]: dataSize[0].code })
    }
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };

    let handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file.size > 31312281){
            toast.error("Dung lượng file bé hơn 30mb")
        }
        else{
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            setInputValues({ ...inputValues, ["image"]: base64, ["imageReview"]: objectUrl })

        }
    }
    let openPreviewImage = () => {
        if (!inputValues.imageReview) return;

        setInputValues({ ...inputValues, ["isOpen"]: true })
    }
    let handleSaveProductDetail = async () => {

        let res = await CreateNewProductDetailService({
            id: id,
            width: inputValues.width,
            height: inputValues.height,
            description: inputValues.description,
            sizeId: inputValues.sizeId,
           
            originalPrice: inputValues.originalPrice,
            discountPrice: inputValues.discountPrice,
            image: inputValues.image,
            nameDetail: inputValues.nameDetail,
            weight: inputValues.weight
        })
        if (res && res.errCode === 0) {
            toast.success("Tạo mới loại sản phẩm thành công!")
            setInputValues({
                ...inputValues,

                ["width"]: '',
                ["height"]: '',
                ["description"]: '',
                ["sizeId"]: '',
               
                ["originalPrice"]: '',
                ["discountPrice"]: '',
                ["image"]: '',
                ["imageReview"]: '',
                ["nameDetail"]: '',
                ["weight"]: '',
            })
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
                    Thêm mới chi tiết sản phẩm
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Tên loại sản phẩm</label>
                                <input type="text" value={inputValues.nameDetail} name="nameDetail" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Chiều rộng</label>
                                <input type="text" value={inputValues.width} name="width" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputPassword4">chiều dài</label>
                                <input type="text" value={inputValues.height} name="height" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputEmail4">Giá gốc</label>
                                <input type="number" value={inputValues.originalPrice} name="originalPrice" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputPassword4">Giá khuyến mãi</label>
                                <input type="number" value={inputValues.discountPrice} name="discountPrice" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputPassword4">Khối lượng</label>
                                <input type="text" value={inputValues.weight} name="weight" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>
                          
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress">Mô tả chi tiết</label>
                            <textarea rows="4" value={inputValues.description} name="description" onChange={(event) => handleOnChange(event)} className="form-control"></textarea>
                        </div>
                        <div className="form-row">
                            
                        <div className="form-group col-md-4">
                                <label htmlFor="inputPassword4">Kích thước</label>
                                <select value={inputValues.sizeId} name="sizeId" onChange={(event) => handleOnChange(event)} id="inputState" className="form-control">
                                    {dataSize && dataSize.length > 0 &&
                                        dataSize.map((item, index) => {
                                            return (
                                                <option key={index} value={item.code}>{item.value}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputPassword4">Chọn hình ảnh</label>
                                <input type="file" id="previewImg" accept=".jpg,.png"
                                    hidden onChange={(event) => handleOnChangeImage(event)}
                                />
                                <br></br>
                                <label style={{ backgroundColor: '#eee', borderRadius: '5px', padding: '6px', cursor: 'pointer' }} className="label-upload" htmlFor="previewImg"

                                >Tải ảnh <i className="fas fa-upload"></i></label>
                                <div style={{ backgroundImage: `url(${inputValues.imageReview})` }} onClick={() => openPreviewImage()} className="box-image"></div>
                            </div>
                        </div>

                        <button onClick={() => handleSaveProductDetail()} type="button" className="btn btn-primary">Lưu thông tin</button>
                    </form>
                </div>
            </div>
            {inputValues.isOpen === true &&
                <Lightbox mainSrc={inputValues.imageReview}
                    onCloseRequest={() => setInputValues({ ...inputValues, ["isOpen"]: false })}
                />
            }
        </div>
    )
}
export default AddProductDetail;