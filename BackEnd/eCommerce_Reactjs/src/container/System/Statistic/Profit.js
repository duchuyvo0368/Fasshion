import React from 'react';
import { useEffect, useState } from 'react';
import { getStatisticProfit } from '../../../services/userService';
// import DatePicker from '../../../component/input/DatePicker';
import { toast } from 'react-toastify';
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import CommonUtils from '../../../utils/CommonUtils';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const Profit = (props) => {
    const [dataOrder, setdataOrder] = useState([])
    const [dataExport, setdataExport] = useState([])
    const [sumPrice, setsumPrice] = useState(0)
    const [type, settype] = useState('day')
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [DateTime, setDateTime] = useState(new Date());



    let handleOnclick = async () => {


        let res = await getStatisticProfit({
            oneDate: type == 'day' ? startDate : DateTime,
            twoDate: endDate,
            type: type
        })
        let sumPrice = 0;
        if (res && res.errCode == 0) {

            setdataOrder(res.data)
            let arrayObject = []
            res.data.forEach(item => {
                arrayObject.push({
                    id: item.id,
                    createdAt: moment.utc(item.createdAt).local().format('DD/MM/YYYY HH:mm:ss'),
                    updatedAt: moment.utc(item.updatedAt).local().format('DD/MM/YYYY HH:mm:ss'),
                    typeShip: item.typeShipData.type,
                    codeVoucher: item.voucherData.codeVoucher,
                    paymentType: item.isPaymentOnlien == 0 ? 'Thanh toán tiền mặt' : 'Thanh toán online',
                    statusOrder: item.statusOrderData.value,
                    totalpriceProduct: item.totalpriceProduct,
                    importPrice: item.importPrice,
                    profitPrice: item.profitPrice,
                })
                sumPrice = sumPrice + item.profitPrice
            });
            setdataExport(arrayObject)
            setsumPrice(sumPrice)
        }
    }
    let handleOnClickExport = async () => {

        await CommonUtils.exportExcel(dataExport, "Thống kê lợi nhuận", "Profit")
    }


    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Thống kê</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    Thống kê lợi nhuận
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label htmlFor="inputZip">Loại thống kê</label>
                                <select value={type} name="type" onChange={(event) => settype(event.target.value)} id="inputState" className="form-control">
                                    <option value="day">Ngày</option>
                                    <option value="month">Tháng</option>
                                    <option value="year">Năm</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            {type == "day" &&
                                <>

                                    <div className="form-group col-md-2">
                                        <DatePicker
                                            showMonthDropdown
                                            showYearDropdown
                                            selectsRange={true}
                                            startDate={startDate}
                                            endDate={endDate}
                                            onChange={(update) => {
                                                setDateRange(update);
                                            }}
                                            className="form-control"
                                            isClearable={true}
                                        />
                                    </div>


                                </>
                            }
                            {type == "month" &&
                                <>
                                    <div className="form-group col-md-2">
                                        <label htmlFor="inputCity">Chọn tháng</label>
                                        <DatePicker
                                            selected={DateTime}
                                            onChange={(date) => setDateTime(date)}
                                            dateFormat="MM/yyyy"
                                            showMonthYearPicker
                                            className='form-control'
                                        />
                                    </div>
                                </>
                            }
                            {type == "year" &&
                                <>
                                    <div className="form-group col-md-2">
                                        <label htmlFor="inputCity">Chọn năm</label>
                                        <DatePicker
                                            selected={DateTime}
                                            onChange={(date) => setDateTime(date)}
                                            dateFormat="yyyy"
                                            showYearPicker
                                            className='form-control'
                                        />
                                    </div>
                                </>
                            }


                        </div>
                        <button type="button" onClick={() => handleOnclick()} className="btn btn-primary">Lọc</button>
                    </form>
                </div>
                <div className="card-body">
                    <div className='row'>

                        <div className='col-12 mb-2'>
                            <button style={{ float: 'right' }} onClick={() => handleOnClickExport()} className="btn btn-success" >Xuất excel <i class="fa-solid fa-file-excel"></i></button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered" style={{ border: '1' }} width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Mã đơn</th>
                                    <th>Ngày đặt</th>
                                    <th>Ngày cập nhật</th>
                                    <th>Loại ship</th>
                                    <th>Mã voucher</th>
                                    <th>Hình thức</th>
                                    <th>Trạng thái</th>
                                    <th>Tổng tiền</th>
                                    <th>Tiền nhập hàng</th>
                                    <th>Lợi nhuận</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataOrder && dataOrder.length > 0 &&
                                    dataOrder.map((item, index) => {

                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{moment.utc(item.createdAt).local().format('DD/MM/YYYY HH:mm:ss')}</td>
                                                <td>{moment.utc(item.updatedAt).local().format('DD/MM/YYYY HH:mm:ss')}</td>
                                                <td>{item.typeShipData.type}</td>
                                                <td>{item.voucherData.codeVoucher}</td>
                                                <td>{item.isPaymentOnlien == 0 ? 'Thanh toán tiền mặt' : 'Thanh toán online'}</td>
                                                <td>{item.statusOrderData.value}</td>
                                                <td>{CommonUtils.formatter.format(item.totalpriceProduct)}</td>
                                                <td>{CommonUtils.formatter.format(item.importPrice)}</td>
                                                <td>{CommonUtils.formatter.format(item.profitPrice)}</td>
                                                <td>
                                                    <Link to={`/admin/order-detail/${item.id}`}>Xem chi tiết</Link>


                                                </td>
                                            </tr>
                                        )
                                    })
                                }


                            </tbody>
                        </table>

                    </div>
                    <span style={{ fontSize: '26px' }} className="text-total">Tổng lợi nhuận:  </span>
                    <span style={{ color: '#71cd14', fontSize: '26px' }} className="text-price">{CommonUtils.formatter.format(sumPrice)}</span>
                </div>
            </div>
        </div>
    )
}
export default Profit;