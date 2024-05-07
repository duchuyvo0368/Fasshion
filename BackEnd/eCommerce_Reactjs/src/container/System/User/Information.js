import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from '../../../component/input/DatePicker';
import moment from 'moment'
import { getDetailUserById, UpdateUserService, handleSendVerifyEmail } from '../../../services/userService';
import { useFetchAllcode } from '../../customize/fetch';
import CommonUtils from '../../../utils/CommonUtils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
const Information = () => {


    const { id } = useParams();

    const [birthday, setbirthday] = useState('');
    const [isChangeDate, setisChangeDate] = useState(false)
    const [inputValues, setInputValues] = useState({
        firstName: '', lastName: '', address: '', phonenumber: '', genderId: '', dob: '', roleId: '', email: '', image: '', isActiveEmail: '', imageReview: ''
    });
    const { data: dataGender } = useFetchAllcode('GENDER');
    useEffect(() => {

        let fetchUser = async () => {
            let res = await getDetailUserById(id)
            if (res && res.errCode === 0) {
                setStateUser(res.data)

            }
        }
        fetchUser();
    }, [])
    let setStateUser = (data) => {

        setInputValues({
            ...inputValues,
            ["firstName"]: data.firstName,
            ["lastName"]: data.lastName,
            ["address"]: data.address,
            ["phonenumber"]: data.phonenumber,
            ["genderId"]: data.genderId,
            ["roleId"]: data.roleId,
            ["email"]: data.email,
            ["id"]: data.id,
            ["dob"]: data.dob,
            ["image"]: data.image ? data.image : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
            ["isActiveEmail"]: data.isActiveEmail
        })
        setbirthday(moment.unix(+data.dob / 1000).locale('vi').format('DD/MM/YYYY'))
    }
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleOnChangeDatePicker = (date) => {
        setbirthday(date[0])
        setisChangeDate(true)
    }
    let handleSaveInfor = async () => {
        console.log(inputValues.image)
        let res = await UpdateUserService({
            id: id,
            firstName: inputValues.firstName,
            lastName: inputValues.lastName,
            address: inputValues.address,
            roleId: inputValues.roleId,
            genderId: inputValues.genderId,
            phonenumber: inputValues.phonenumber,
            dob: isChangeDate === false ? inputValues.dob : new Date(birthday).getTime(),
            image: inputValues.image
        })
        if (res && res.errCode === 0) {
            toast.success("Cập nhật người dùng thành công")

        } else {
            toast.error(res.errMessage)
        }
    }
    let handleSendEmail = async () => {
        let res = await handleSendVerifyEmail({
            id: id
        })
        if (res && res.errCode === 0) {
            toast.success("Vui lòng kiểm tra email !")
        } else {
            toast.error(res.errMessage)
        }
    }
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
    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" height="170px" style={{ objectFit: "cover" }} width="150px" src={inputValues.image} />
                        <span className="font-weight-bold">{inputValues.lastName}</span>
                        <div className="box-email-verify">
                            <span className="text-black-50">{inputValues.email}
                            </span>
                            {inputValues.isActiveEmail === 0 &&
                                <i style={{ color: '#dc0707' }} className="fas fa-times-circle"></i>
                            }
                            {inputValues.isActiveEmail === 1 &&
                                <i style={{ color: 'green' }} className="fas fa-check-circle"></i>
                            }
                        </div>

                        {inputValues.isActiveEmail === 0 &&
                            <span onClick={() => handleSendEmail()} className="text-verify">xác thực</span>
                        }

                    </div>
                </div>
                <div className="col-md-6 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Thông tin cá nhân</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6"><label className="labels">Họ</label><input name="firstName" onChange={(event) => handleOnChange(event)} value={inputValues.firstName} type="text" className="form-control" /></div>
                            <div className="col-md-6"><label className="labels">Tên</label><input name="lastName" onChange={(event) => handleOnChange(event)} value={inputValues.lastName} type="text" className="form-control" /></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Số điện thoại</label><input name="phonenumber" onChange={(event) => handleOnChange(event)} type="text" className="form-control" value={inputValues.phonenumber} /></div>
                            <div className="col-md-12"><label className="labels">Địa chỉ</label><input name="address" onChange={(event) => handleOnChange(event)} type="text" className="form-control" value={inputValues.address} /></div>

                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><label className="labels">Giới tính</label><select value={inputValues.genderId} name="genderId" onChange={(event) => handleOnChange(event)} id="inputState" className="form-control">
                                {dataGender && dataGender.length > 0 &&
                                    dataGender.map((item, index) => {
                                        return (
                                            <option key={index} value={item.code}>{item.value}</option>
                                        )
                                    })
                                }
                            </select></div>
                            <div className="col-md-6"><label className="labels">Ngày sinh</label> <DatePicker className="form-control" onChange={handleOnChangeDatePicker}
                                value={birthday}

                            /></div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-3">
                                <label className="labels">Chọn ảnh</label>
                                <input type="file" id="previewImg" accept=".jpg,.png"
                                    hidden onChange={(event) => handleOnChangeImage(event)}
                                />
                                <label style={{ backgroundColor: '#eee', borderRadius: '5px', padding: '6px', cursor: 'pointer' }} className="label-upload" htmlFor="previewImg"

                                >Tải ảnh <i className="fas fa-upload"></i></label>

                            </div>
                        </div>
                        <div onClick={() => handleSaveInfor()} className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Lưu thông tin</button></div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Information;