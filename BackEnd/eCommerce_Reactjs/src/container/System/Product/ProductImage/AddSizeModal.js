import React from 'react';
import { useEffect, useState } from 'react';
import CommonUtils from '../../../../utils/CommonUtils';
import moment from 'moment';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useFetchAllcode } from '../../../customize/fetch';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import { getProductDetailSizeByIdService } from '../../../../services/userService';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from "react-router-dom";



const AddSizeModal = (props) => {
    const { data: dataSize } = useFetchAllcode('SIZE')
    const [inputValues, setInputValues] = useState({
        sizeId: '', width: '', height: '', isActionUpdate: false, id: '', weight: ''
    });
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    if (dataSize && dataSize.length > 0 && inputValues.sizeId === '') {

        setInputValues({ ...inputValues, ["sizeId"]: dataSize[0].code })
    }
    useEffect(() => {
        let id = props.productSizeId

        if (id) {
            let fetchDetailProductSize = async () => {
                let res = await getProductDetailSizeByIdService(id)
                if (res && res.errCode === 0) {
                    setInputValues({
                        ...inputValues, ["isActionUpdate"]: true, ["sizeId"]: res.data.sizeId, ["width"]: res.data.width,
                        ["height"]: res.data.height,  ["weight"]: res.data.weight
                    })

                }
            }
            fetchDetailProductSize()
        }
    }, [props.isOpenModal])
    let handleSaveInfor = () => {
        props.sendDataFromModalSize({
            sizeId: inputValues.sizeId,
         
            width: inputValues.width,
            height: inputValues.height,
            isActionUpdate: inputValues.isActionUpdate,
            id: props.productSizeId,
            weight: inputValues.weight
        })
        setInputValues({ ...inputValues, ["sizeId"]: '',  ["width"]: '', ["height"]: '', ["weight"]: '', ["isActionUpdate"]: false })
    }
    let handleCloseModal = () => {
        props.closeModal()
        setInputValues({ ...inputValues, ["sizeId"]: '', ["width"]: '', ["height"]: '', ["weight"]: '', ["isActionUpdate"]: false })

    }
    return (
        <div className="">
            <Modal isOpen={props.isOpenModal} className={'booking-modal-container'}
                size="md" centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Thêm kích thước chi tiết sản phẩm</h5>
                    <button onClick={handleCloseModal} type="button" className="btn btn-time" aria-label="Close">X</button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-12 form-group">
                            <label>Kích thước</label>
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
                        <div className="col-12 form-group">
                            <label>Chiều rộng</label>
                            <input value={inputValues.width} name="width" onChange={(event) => handleOnChange(event)} type="text" className="form-control"
                            />
                        </div>
                        <div className="col-12 form-group">
                            <label>Chiều dài</label>
                            <input value={inputValues.height} name="height" onChange={(event) => handleOnChange(event)} type="text" className="form-control"
                            />
                        </div>
                        <div className="col-12 form-group">
                            <label>Khối lượng</label>
                            <input value={inputValues.weight} name="weight" onChange={(event) => handleOnChange(event)} type="text" className="form-control"
                            />
                        </div>
                        
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={handleSaveInfor}
                    >
                        Lưu thông tin
                    </Button>
                    {' '}
                    <Button onClick={handleCloseModal}>
                        Hủy
                    </Button>
                </ModalFooter>
            </Modal>

        </div >
    )
}
export default AddSizeModal;