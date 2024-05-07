import React from 'react';
import { useEffect, useState } from 'react';
import { getDetailAddressUserByIdService } from '../../services/userService';

import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';

const AddressUsersModal = (props) => {
    const [inputValues, setInputValues] = useState({
        shipName: '', shipAdress: '', shipEmail: '', shipPhonenumber: '', isActionUpdate: false
    });
    useEffect(() => {
        let id = props.addressUserId
        if (id) {
            let fetchDetailAddress = async () => {
                let res = await getDetailAddressUserByIdService(id)
                if (res && res.errCode === 0) {
                    setInputValues({
                        ...inputValues, ["isActionUpdate"]: true, ["shipName"]: res.data.shipName, ["shipAdress"]: res.data.shipAdress
                        , ["shipEmail"]: res.data.shipEmail, ["shipPhonenumber"]: res.data.shipPhonenumber
                    })
                }
            }
            fetchDetailAddress()
        }


    }, [props.isOpenModal])
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleCloseModal = () => {

        props.closeModaAddressUser()
        setInputValues({
            ...inputValues, ["isActionUpdate"]: false, ["shipName"]: '', ["shipAdress"]: ''
            , ["shipEmail"]: '', ["shipPhonenumber"]: ''
        })
    }
    let handleSaveInfor = () => {
        props.sendDataFromModalAddress({
            shipName: inputValues.shipName,
            shipAdress: inputValues.shipAdress,
            shipEmail: inputValues.shipEmail,
            shipPhonenumber: inputValues.shipPhonenumber,
            id: props.addressUserId,
            isActionUpdate: inputValues.isActionUpdate,
        })
        setInputValues({
            ...inputValues,
            ["shipName"]: '',
            ["shipAdress"]: '',
            ["shipEmail"]: '',
            ["shipPhonenumber"]: '',
            ["isActionUpdate"]: false
        })
    }



    return (
        <div className="">
            <Modal isOpen={props.isOpenModal} className={'booking-modal-container'}
                size="md" centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Địa chỉ mới</h5>
                    <button onClick={handleCloseModal} type="button" className="btn btn-time" aria-label="Close">X</button>
                </div>
                <ModalBody>
                    <div className="row">

                        <div className="col-6 form-group">
                            <label>Họ và tên</label>
                            <input value={inputValues.shipName} name="shipName" onChange={(event) => handleOnChange(event)} type="text" className="form-control"
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Số điện thoại</label>
                            <input value={inputValues.shipPhonenumber} name="shipPhonenumber" onChange={(event) => handleOnChange(event)} type="text" className="form-control"
                            />
                        </div>
                        <div className="col-12 form-group">
                            <label>Email</label>
                            <input value={inputValues.shipEmail} name="shipEmail" onChange={(event) => handleOnChange(event)} type="text" className="form-control"
                            />
                        </div>
                        <div className="col-12 form-group">
                            <label>Địa chỉ cụ thể</label>
                            <input value={inputValues.shipAdress} name="shipAdress" onChange={(event) => handleOnChange(event)} type="text" className="form-control"
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
export default AddressUsersModal;