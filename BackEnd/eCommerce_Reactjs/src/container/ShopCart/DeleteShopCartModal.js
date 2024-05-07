import React from 'react';
import { useEffect, useState } from 'react';

import moment from 'moment';
import { toast } from 'react-toastify';

import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from "react-router-dom";



const DeleteShopCartModal = (props) => {

    let handleCloseModal = () => {
        props.closeModal()
    }
    let handleDelete = () => {
        props.handleDeleteShopCart()
    }
    return (
        <div className="">
            <Modal isOpen={props.isOpenModal} className={'booking-modal-container'}
                size="md" centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Bạn chắc chắn muốn bỏ sản phẩm này?</h5>
                    <button onClick={handleCloseModal} type="button" className="btn btn-time" aria-label="Close">X</button>
                </div>
                <ModalBody>
                    <div style={{ padding: '10px 20px', fontSize: '20px' }} className="row">
                        {props.name}

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={handleDelete}
                    >
                        Thực hiện
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
export default DeleteShopCartModal;