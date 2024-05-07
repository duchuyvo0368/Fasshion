const { Op } = require("sequelize");
import db from "../models/index";
import moment from 'moment'
function compareDates(d1, d2) {
    //  lon hon la false
    //  be hon la true

    var parts = d1.split('/');
    var d1 = Number(parts[2] + parts[1] + parts[0]);
    parts = d2.split('/');
    var d2 = Number(parts[2] + parts[1] + parts[0]);

    if (d1 <= d2) return true
    if (d1 >= d2) return false

}
let getCountCardStatistic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let countUser = await db.User.count({ where: { statusId: 'S1' } })
            let countProduct = await db.Product.count()
            let countReview = await db.Comment.count({
                where: {
                    star: { [Op.gt]: 0, }
                }
            })
            let countOrder = await db.OrderProduct.count({
                where: {
                    statusId: { [Op.ne]: 'S7', }
                }
            })
            let data = {
                countUser, countProduct, countReview, countOrder
            }
            resolve({
                errCode: 0,
                data: data
            })

        } catch (error) {
            reject(error)
        }
    })
}
let getCountStatusOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.oneDate && !data.twoDate) {
                resolve({
                    errCode: 1,
                    data: 'Missing required paramenter !'
                })

            } else {
                let statusOrder = await db.Allcode.findAll({
                    where: { type: 'STATUS-ORDER' }
                })
                let objectCount = {}
                let arrayLable = []
                let arrayValue = []
                if (statusOrder) {
                    let orderProduct = await db.OrderProduct.findAll()
                    orderProduct = orderProduct.filter(item => {

                        if (data.type == "day") {
                            let updatedAt = moment.utc(item.updatedAt).local().format('DD/MM/YYYY').split('/')
                            updatedAt = Number(updatedAt[2] + updatedAt[1] + updatedAt[0])

                            let twoDate = moment(data.twoDate).format("DD/MM/YYYY").split('/')
                            twoDate = Number(twoDate[2] + twoDate[1] + twoDate[0])
                            let oneDate = moment(data.oneDate).format("DD/MM/YYYY").split('/')
                            oneDate = Number(oneDate[2] + oneDate[1] + oneDate[0])

                            if ((updatedAt >= oneDate) && (updatedAt <= twoDate)) {

                                return true
                            }

                        }
                        else if (data.type == "month") {
                            let updatedAtMonth = moment.utc(item.updatedAt).local().format('M')
                            let updatedAtYear = moment.utc(item.updatedAt).local().format('YYYY')
                            if (moment(data.oneDate).format('M') == updatedAtMonth && moment(data.oneDate).format('YYYY') == updatedAtYear) {

                                return true
                            }

                        } else {
                            let updatedAtYear = moment.utc(item.updatedAt).local().format('YYYY')
                            if (moment(data.oneDate).format('YYYY') == updatedAtYear) {

                                return true
                            }
                        }
                    })

                    for (let i = 0; i < statusOrder.length; i++) {
                        arrayLable.push(statusOrder[i].value)

                        arrayValue.push(orderProduct.filter(item => { return item.statusId == statusOrder[i].code }).length)

                    }

                    objectCount = {
                        arrayLable,
                        arrayValue
                    }
                    resolve({
                        errCode: 0,
                        data: objectCount
                    })
                }


            }



        } catch (error) {
            reject(error)
        }
    })
}
let totalPriceDiscount = (price, discount) => {

    if (discount.voucherData.typeVoucherOfVoucherData.typeVoucher === "percent") {

        if (((price * discount.voucherData.typeVoucherOfVoucherData.value) / 100) > discount.voucherData.typeVoucherOfVoucherData.maxValue) {

            return price - discount.voucherData.typeVoucherOfVoucherData.maxValue
        } else {
            return price - ((price * discount.voucherData.typeVoucherOfVoucherData.value) / 100)
        }
    } else {
        return price - discount.voucherData.typeVoucherOfVoucherData.maxValue
    }

}
function DaysOfMonth(thang, nam) {
    var mon = parseInt(thang, 10);
    var yar = parseInt(nam, 10);
    switch (mon) {
        case 2:
            if ((yar % 4 == 0) && (yar % 400 != 0))
                return 29;
            else
                return 28;
            break;
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
            break;
        default:
            return 30;
    }
}
let getStatisticByMonth = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.year) {
                resolve({
                    errCode: 1,
                    data: 'Missing required paramenter !'
                })

            } else {
                let orderProduct = await db.OrderProduct.findAll(
                    {
                        where: { statusId: 'S6' },
                        include: [
                            { model: db.TypeShip, as: 'typeShipData' },
                            { model: db.Voucher, as: 'voucherData' },
                            { model: db.Allcode, as: 'statusOrderData' },

                        ],
                        raw: true,
                        nest: true
                    }
                )
                for (let i = 0; i < orderProduct.length; i++) {
                    orderProduct[i].orderDetail = await db.OrderDetail.findAll({ where: { orderId: orderProduct[i].id } })
                    orderProduct[i].voucherData.typeVoucherOfVoucherData = await db.TypeVoucher.findOne({
                        where: { id: orderProduct[i].voucherData.typeVoucherId }
                    })
                    let totalprice = 0
                    for (let j = 0; j < orderProduct[i].orderDetail.length; j++) {
                        totalprice = totalprice + (orderProduct[i].orderDetail[j].realPrice * orderProduct[i].orderDetail[j].quantity)
                    }
                    if (orderProduct[i].voucherId) {
                        orderProduct[i].totalpriceProduct = totalPriceDiscount(totalprice, orderProduct[i]) + orderProduct[i].typeShipData.price
                    } else {
                        orderProduct[i].totalpriceProduct = totalprice + orderProduct[i].typeShipData.price
                    }

                }


                let arrayMonthLable = []
                let arrayMonthValue = []
                for (let i = 1; i <= 12; i++) {
                    arrayMonthLable.push("Th " + i)
                    let price = 0
                    for (let j = 0; j < orderProduct.length; j++) {

                        if (moment(orderProduct[j].updatedAt).format('YYYY') === data.year && +moment(orderProduct[j].updatedAt).format('MM') === i) {
                            price = price + orderProduct[j].totalpriceProduct
                        }
                    }
                    arrayMonthValue.push(price)


                }
                resolve({
                    errCode: 0,
                    data: {
                        arrayMonthLable,
                        arrayMonthValue
                    }

                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let getStatisticByDay = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.month && !data.year) {
                resolve({
                    errCode: 1,
                    data: 'Missing required paramenter !'
                })

            } else {
                let day = DaysOfMonth(data.month, data.year)
                let orderProduct = await db.OrderProduct.findAll(
                    {
                        where: { statusId: 'S6' },
                        include: [
                            { model: db.TypeShip, as: 'typeShipData' },
                            { model: db.Voucher, as: 'voucherData' },
                            { model: db.Allcode, as: 'statusOrderData' },

                        ],
                        raw: true,
                        nest: true
                    }
                )
                for (let i = 0; i < orderProduct.length; i++) {
                    orderProduct[i].orderDetail = await db.OrderDetail.findAll({ where: { orderId: orderProduct[i].id } })
                    orderProduct[i].voucherData.typeVoucherOfVoucherData = await db.TypeVoucher.findOne({
                        where: { id: orderProduct[i].voucherData.typeVoucherId }
                    })
                    let totalprice = 0
                    for (let j = 0; j < orderProduct[i].orderDetail.length; j++) {
                        totalprice = totalprice + (orderProduct[i].orderDetail[j].realPrice * orderProduct[i].orderDetail[j].quantity)
                    }

                    if (orderProduct[i].voucherId) {
                        orderProduct[i].totalpriceProduct = totalPriceDiscount(totalprice, orderProduct[i]) + orderProduct[i].typeShipData.price
                    } else {
                        orderProduct[i].totalpriceProduct = totalprice + orderProduct[i].typeShipData.price
                    }
                }


                let arrayDayLable = []
                let arrayDayValue = []

                for (let i = 1; i <= day; i++) {
                    if (+moment(new Date()).format("DD") == i && data.year === moment(new Date()).format("YYYY")
                        && data.month === moment(new Date()).format("M")
                    ) {
                        arrayDayLable.push("Today")
                    }
                    else {
                        arrayDayLable.push(i)
                    }

                    let price = 0
                    for (let j = 0; j < orderProduct.length; j++) {

                        if (moment(orderProduct[j].updatedAt).format('YYYY') === data.year && moment(orderProduct[j].updatedAt).format('M') === data.month &&
                            +moment(orderProduct[j].updatedAt).format('DD') === i
                        ) {

                            price = price + orderProduct[j].totalpriceProduct
                        }
                    }
                    arrayDayValue.push(price)


                }
                resolve({
                    errCode: 0,
                    data: {
                        arrayDayLable,
                        arrayDayValue
                    }

                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let getStatisticProfit = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.oneDate && !data.twoDate) {
                resolve({
                    errCode: 1,
                    data: 'Missing required paramenter !'
                })

            } else {

                let orderProduct = await db.OrderProduct.findAll(
                    {
                        where: { statusId: 'S6' },
                        include: [
                            { model: db.TypeShip, as: 'typeShipData' },
                            { model: db.Voucher, as: 'voucherData' },
                            { model: db.Allcode, as: 'statusOrderData' },

                        ],
                        raw: true,
                        nest: true
                    }
                )

                for (let i = 0; i < orderProduct.length; i++) {
                    orderProduct[i].orderDetail = await db.OrderDetail.findAll({ where: { orderId: orderProduct[i].id } })
                    orderProduct[i].voucherData.typeVoucherOfVoucherData = await db.TypeVoucher.findOne({
                        where: { id: orderProduct[i].voucherData.typeVoucherId }
                    })
                    let totalprice = 0
                    let importPrice = 0
                    for (let j = 0; j < orderProduct[i].orderDetail.length; j++) {
                        let receiptDetail = await db.ReceiptDetail.findAll({ where: { productDetailSizeId: orderProduct[i].orderDetail[j].productId } })
                        let avgPrice = 0
                        let avgQuantity = 0
                        for (let k = 0; k < receiptDetail.length; k++) {
                            avgPrice = avgPrice + (receiptDetail[k].quantity * receiptDetail[k].price)
                            avgQuantity = avgQuantity + receiptDetail[k].quantity
                        }
                        orderProduct[i].orderDetail[j].importPrice = Math.round((avgPrice / avgQuantity))
                        importPrice = importPrice + (Math.round((avgPrice / avgQuantity)) * orderProduct[i].orderDetail[j].quantity)
                        totalprice = totalprice + (orderProduct[i].orderDetail[j].realPrice * orderProduct[i].orderDetail[j].quantity)
                    }
                    orderProduct[i].importPrice = importPrice
                    if (orderProduct[i].voucherId) {
                        orderProduct[i].totalpriceProduct = totalPriceDiscount(totalprice, orderProduct[i]) + orderProduct[i].typeShipData.price
                        orderProduct[i].profitPrice = totalPriceDiscount(totalprice, orderProduct[i]) + orderProduct[i].typeShipData.price - importPrice

                    } else {
                        orderProduct[i].totalpriceProduct = totalprice + orderProduct[i].typeShipData.price
                        orderProduct[i].profitPrice = (totalprice + orderProduct[i].typeShipData.price) - importPrice
                    }

                }

                orderProduct = orderProduct.filter(item => {

                    if (data.type == "day") {
                        let updatedAt = moment.utc(item.updatedAt).local().format('DD/MM/YYYY').split('/')
                        updatedAt = Number(updatedAt[2] + updatedAt[1] + updatedAt[0])

                        let twoDate = moment(data.twoDate).format("DD/MM/YYYY").split('/')
                        twoDate = Number(twoDate[2] + twoDate[1] + twoDate[0])
                        let oneDate = moment(data.oneDate).format("DD/MM/YYYY").split('/')
                        oneDate = Number(oneDate[2] + oneDate[1] + oneDate[0])

                        if ((updatedAt >= oneDate) && (updatedAt <= twoDate)) {

                            return true
                        }
                    }
                    else if (data.type == "month") {
                        let updatedAtMonth = moment.utc(item.updatedAt).local().format('M')
                        let updatedAtYear = moment.utc(item.updatedAt).local().format('YYYY')
                        if (moment(data.oneDate).format('M') == updatedAtMonth && moment(data.oneDate).format('YYYY') == updatedAtYear) {

                            return true
                        }

                    } else {
                        let updatedAtYear = moment.utc(item.updatedAt).local().format('YYYY')
                        if (moment(data.oneDate).format('YYYY') == updatedAtYear) {

                            return true
                        }
                    }

                })

                resolve({
                    errCode: 0,
                    data: orderProduct

                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let getStatisticOverturn = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.oneDate && !data.twoDate) {
                resolve({
                    errCode: 1,
                    data: 'Missing required paramenter !'
                })

            } else {

                let orderProduct = await db.OrderProduct.findAll(
                    {
                        where: { statusId: 'S6' },
                        include: [
                            { model: db.TypeShip, as: 'typeShipData' },
                            { model: db.Voucher, as: 'voucherData' },
                            { model: db.Allcode, as: 'statusOrderData' },

                        ],
                        raw: true,
                        nest: true
                    }
                )
                for (let i = 0; i < orderProduct.length; i++) {
                    orderProduct[i].orderDetail = await db.OrderDetail.findAll({ where: { orderId: orderProduct[i].id } })
                    orderProduct[i].voucherData.typeVoucherOfVoucherData = await db.TypeVoucher.findOne({
                        where: { id: orderProduct[i].voucherData.typeVoucherId }
                    })
                    let totalprice = 0
                    for (let j = 0; j < orderProduct[i].orderDetail.length; j++) {
                        totalprice = totalprice + (orderProduct[i].orderDetail[j].realPrice * orderProduct[i].orderDetail[j].quantity)
                    }

                    if (orderProduct[i].voucherId) {
                        orderProduct[i].totalpriceProduct = totalPriceDiscount(totalprice, orderProduct[i]) + orderProduct[i].typeShipData.price
                    } else {
                        orderProduct[i].totalpriceProduct = totalprice + orderProduct[i].typeShipData.price
                    }
                }
                orderProduct = orderProduct.filter(item => {

                    if (data.type == "day") {
                        let updatedAt = moment.utc(item.updatedAt).local().format('DD/MM/YYYY').split('/')
                        updatedAt = Number(updatedAt[2] + updatedAt[1] + updatedAt[0])

                        let twoDate = moment(data.twoDate).format("DD/MM/YYYY").split('/')
                        twoDate = Number(twoDate[2] + twoDate[1] + twoDate[0])
                        let oneDate = moment(data.oneDate).format("DD/MM/YYYY").split('/')
                        oneDate = Number(oneDate[2] + oneDate[1] + oneDate[0])

                        if ((updatedAt >= oneDate) && (updatedAt <= twoDate)) {

                            return true
                        }
                    }
                    else if (data.type == "month") {
                        let updatedAtMonth = moment.utc(item.updatedAt).local().format('M')
                        let updatedAtYear = moment.utc(item.updatedAt).local().format('YYYY')
                        if (moment(data.oneDate).format('M') == updatedAtMonth && moment(data.oneDate).format('YYYY') == updatedAtYear) {

                            return true
                        }

                    } else {
                        let updatedAtYear = moment.utc(item.updatedAt).local().format('YYYY')
                        if (moment(data.oneDate).format('YYYY') == updatedAtYear) {

                            return true
                        }
                    }

                })

                resolve({
                    errCode: 0,
                    data: orderProduct,

                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let getStatisticStockProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let objectFilter = {

                include: [
                    { model: db.Allcode, as: 'sizeData', attributes: ['value', 'code'] },

                ],
                raw: true,
                nest: true
            }
            if (data.limit && data.offset) {
                objectFilter.limit = +data.limit
                objectFilter.offset = +data.offset
            }


            let res = await db.ProductDetailSize.findAndCountAll(objectFilter)
            for (let i = 0; i < res.rows.length; i++) {
                let receiptDetail = await db.ReceiptDetail.findAll({ where: { productDetailSizeId: res.rows[i].id } })
                let orderDetail = await db.OrderDetail.findAll({ where: { productId: res.rows[i].id } })
                let quantity = 0
                res.rows[i].productDetaildData = await db.ProductDetail.findOne({
                    where: { id: res.rows[i].productdetailId }
                })
                res.rows[i].productdData = await db.Product.findOne({
                    where: { id: res.rows[i].productDetaildData.productId },
                    include: [
                        { model: db.Allcode, as: 'brandData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'categoryData', attributes: ['value', 'code'] },
                        { model: db.Allcode, as: 'statusData', attributes: ['value', 'code'] },
                    ],
                    raw: true,
                    nest: true
                })
                for (let j = 0; j < receiptDetail.length; j++) {
                    quantity = quantity + receiptDetail[j].quantity
                }
                for (let k = 0; k < orderDetail.length; k++) {
                    let order = await db.OrderProduct.findOne({ where: { id: orderDetail[k].orderId } })
                    if (order.statusId != 'S7') {

                        quantity = quantity - orderDetail[k].quantity
                    }

                }



                res.rows[i].stock = quantity


            }

            resolve({
                errCode: 0,
                data: res.rows,
                count: res.count

            })


        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getCountCardStatistic: getCountCardStatistic,
    getCountStatusOrder: getCountStatusOrder,
    getStatisticByMonth: getStatisticByMonth,
    getStatisticByDay: getStatisticByDay,
    getStatisticOverturn: getStatisticOverturn,
    getStatisticProfit: getStatisticProfit,
    getStatisticStockProduct: getStatisticStockProduct
}