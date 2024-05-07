import React from 'react';
import { useEffect, useState } from 'react';
import DatePicker from '../../../component/input/DatePicker';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { getSelectTypeVoucher, createNewVoucherService, getDetailVoucherByIdService, updateVoucherService } from '../../../services/userService';
import moment from 'moment';
const AddVoucher = (props) => {




    const [dataTypeVoucher, setdataTypeVoucher] = useState([])

    const { id } = useParams();
    const [inputValues, setInputValues] = useState({
        fromDate: '', toDate: '', typeVoucherId: '', amount: '', codeVoucher: '', isChangeFromDate: false, isChangeToDate: false, isActionADD: true,
        fromDateUpdate: '', toDateUpdate: ''
    });
    if (dataTypeVoucher && dataTypeVoucher.length > 0 && inputValues.typeVoucherId === '') {

        setInputValues({ ...inputValues, ["typeVoucherId"]: dataTypeVoucher[0].id })
    }
    useEffect(() => {
        let fetchTypeVoucher = async () => {
            let typevoucher = await getSelectTypeVoucher()
            if (typevoucher && typevoucher.errCode === 0) {
                setdataTypeVoucher(typevoucher.data)
            }
        }
        fetchTypeVoucher()
        if (id) {
            let fetchVoucher = async () => {
                let voucher = await getDetailVoucherByIdService(id)
                if (voucher && voucher.errCode === 0) {
                    setStateVoucher(voucher.data)
                }
            }
            fetchVoucher()
        }
    }, [])
    let setStateVoucher = (data) => {
        console.log(data.toDate)
        setInputValues({
            ...inputValues,
            ["fromDate"]: moment.unix(+data.fromDate / 1000).locale('vi').format('DD/MM/YYYY'),
            ["toDate"]: moment.unix(+data.toDate / 1000).locale('vi').format('DD/MM/YYYY'),
            ["typeVoucherId"]: data.typeVoucherId,
            ["amount"]: data.amount,
            ["codeVoucher"]: data.codeVoucher,
            ["isActionADD"]: false,
            ["fromDateUpdate"]: data.fromDate,
            ["toDateUpdate"]: data.toDate
        })
    }
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleOnChangeDatePickerFromDate = (date) => {
        setInputValues({
            ...inputValues,
            ["fromDate"]: date[0],
            ["isChangeFromDate"]: true
        })

    }
    let handleOnChangeDatePickerToDate = (date) => {
        setInputValues({
            ...inputValues,
            ["toDate"]: date[0],
            ["isChangeToDate"]: true
        })

    }
    let handleSaveInforVoucher = async () => {
        if (inputValues.isActionADD === true) {
            let response = await createNewVoucherService({
                fromDate: new Date(inputValues.fromDate).getTime(),
                toDate: new Date(inputValues.toDate).getTime(),
                typeVoucherId: inputValues.typeVoucherId,
                amount: inputValues.amount,
                codeVoucher: inputValues.codeVoucher
            })
            if (response && response.errCode === 0) {
                toast.success("Tạo mã voucher thành công !")
                setInputValues({
                    ...inputValues,
                    ["fromDate"]: '',
                    ["toDate"]: '',
                    ["typeVoucherId"]: '',
                    ["amount"]: '',
                    ["codeVoucher"]: '',
                })
            } else {
                toast.error(response.errMessage)
            }
        } else {

            let response = await updateVoucherService({
                toDate: inputValues.isChangeToDate === false ? inputValues.toDateUpdate : new Date(inputValues.toDate).getTime(),
                fromDate: inputValues.isChangeFromDate === false ? inputValues.fromDateUpdate : new Date(inputValues.fromDate).getTime(),

                typeVoucherId: inputValues.typeVoucherId,
                amount: inputValues.amount,
                codeVoucher: inputValues.codeVoucher,
                id: id
            })
            if (response && response.errCode === 0) {
                toast.success("Cập nhật voucher thành công !")

            } else toast.error(response.errMessage)
        }
    }
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý mã voucher</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    {inputValues.isActionADD === true ? 'Thêm mới mã voucherr' : 'Cập nhật thông tin mã voucher'}
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Ngày bắt đầu</label>
                                <DatePicker className="form-control" onChange={handleOnChangeDatePickerFromDate}
                                    value={inputValues.fromDate}

                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Ngày kết thúc</label>
                                <DatePicker className="form-control" onChange={handleOnChangeDatePickerToDate}
                                    value={inputValues.toDate}

                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Loại voucher</label>
                                <select value={inputValues.typeVoucherId} name="typeVoucherId" onChange={(event) => handleOnChange(event)} id="inputState" className="form-control">
                                    {dataTypeVoucher && dataTypeVoucher.length > 0 &&
                                        dataTypeVoucher.map((item, index) => {
                                            let name = `${item.value} ${item.typeVoucherData.value}`
                                            return (
                                                <option key={index} value={item.id}>{name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputPassword4">Số lượng mã</label>
                                <input type="number" value={inputValues.amount} name="amount" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputPassword4">Mã voucher</label>
                                <input type="text" value={inputValues.codeVoucher} name="codeVoucher" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>
                        </div>
                        <button onClick={() => handleSaveInforVoucher()} type="button" className="btn btn-primary">Lưu thông tin</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddVoucher;