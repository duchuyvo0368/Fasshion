import React from 'react';
import { useEffect, useState } from 'react';
import bannerPhoto from '../../../src/resources/img/banner-voucher.jfif'
import voucherTodayPhoto from '../../../src/resources/img/voucher-today.png'
import voucherAllPhoto from '../../../src/resources/img/voucher-all.jfif';
import applyVoucherPhoto from '../../../src/resources/img/applyVoucher.jfif';
import logoVoucher from '../../../src/resources/img/logoVoucher.png'
import './VoucherHomePage.scss';
import VoucherItem from './VoucherItem';
import { getAllVoucher } from '../../services/userService';
import moment, { now } from 'moment';
import { toast } from 'react-toastify';
import { PAGINATION } from '../../utils/constant';
import ReactPaginate from 'react-paginate';
import { saveUserVoucherService } from '../../services/userService';
import CommonUtils from '../../utils/CommonUtils';
function VoucherHomePage(props) {
    const [dataVoucher, setdataVoucher] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [user, setUser] = useState({})
    function compareDates(d1, d2) {
        var parts = d1.split('/');
        var d1 = Number(parts[2] + parts[1] + parts[0]);
        parts = d2.split('/');
        var d2 = Number(parts[2] + parts[1] + parts[0]);
        if (d1 <= d2) return true
        if (d1 >= d2) return false

    }

    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            setUser(userData)
            fetchData();
        } catch (error) {
            console.log(error)
        }

    }, [])
    let fetchData = async () => {
        let arrData = await getAllVoucher({

            limit: PAGINATION.pagerow,
            offset: 0

        })
        let arrTemp = []
        if (arrData && arrData.errCode === 0) {
            let nowDate = moment.unix(Date.now() / 1000).format('DD/MM/YYYY')

            for (let i = 0; i < arrData.data.length; i++) {
                let fromDate = moment.unix(arrData.data[i].fromDate / 1000).format('DD/MM/YYYY')
                let toDate = moment.unix(arrData.data[i].toDate / 1000).format('DD/MM/YYYY')
                let amount = arrData.data[i].amount
                let usedAmount = arrData.data[i].usedAmount
                if (amount !== usedAmount && compareDates(toDate, nowDate) === false && compareDates(fromDate, nowDate) === true) {
                    arrTemp[i] = arrData.data[i]

                }
            }
            setdataVoucher(arrTemp)
            setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
        }
    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllVoucher({
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow

        })
        if (arrData && arrData.errCode === 0) {
            setdataVoucher(arrData.data)

        }
    }
    let sendDataFromVoucherItem = async (id) => {
        if (user && user.id) {
            let res = await saveUserVoucherService({
                userId: user.id,
                voucherId: id
            })
            if (res && res.errCode === 0) {
                toast.success("Lưu mã voucher thành công !")
                await fetchData()
            } else {
                toast.error(res.errMessage)
            }
        } else {
            toast.error("Đăng nhập để lưu mã giảm giá")
        }

    }
    return (
        <div className="voucher-container">
            <div className="voucher-banner">
                <img className="photo-banner" src={bannerPhoto}></img>
                <img src={voucherTodayPhoto}></img>
                <img src={voucherAllPhoto}></img>
                <img src={applyVoucherPhoto}></img>
            </div>
            <div className="voucher-list">
                {dataVoucher && dataVoucher.length > 0 &&
                    dataVoucher.map((item, index) => {
                        let percent = ""
                        if (item.typeVoucherOfVoucherData.typeVoucher === "percent") {
                            percent = item.typeVoucherOfVoucherData.value + "%"
                        }
                        if (item.typeVoucherOfVoucherData.typeVoucher === "money") {
                            percent = CommonUtils.formatter.format(item.typeVoucherOfVoucherData.value)

                        }
                        let MaxValue = item.typeVoucherOfVoucherData.maxValue

                        return (
                            <VoucherItem sendDataFromVoucherItem={sendDataFromVoucherItem} id={item.id} width="550px" height="330px" key={index} name={item.codeVoucher} widthPercent={item.usedAmount * 100 / item.amount} maxValue={MaxValue} usedAmount={Math.round((item.usedAmount * 100 / item.amount) * 10) / 10} typeVoucher={percent} />
                        )
                    })
                }


            </div>
            <div className="box-pagination">
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

        </div>
    );
}

export default VoucherHomePage;