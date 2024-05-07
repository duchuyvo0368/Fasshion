import { v4 as uuidv4 } from 'uuid';
import db from "../models/index";
import paypal from 'paypal-rest-sdk'
const { Op } = require("sequelize");
var querystring = require('qs');
var crypto = require("crypto");
var dateFormat = require('dateformat')
require('dotenv').config()
import moment from 'moment';
import localization from 'moment/locale/vi';
import { EXCHANGE_RATES } from '../utils/constants'
moment.updateLocale('vi', localization);
paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AaeuRt8WCq9SBliEVfEyXXQMosfJD-U9emlCflqe8Blz_KWZ3lnXh1piEMcXuo78MvWj0hBKgLN-FamT',
    'client_secret': 'ENWZDMzk17X3mHFJli7sFlS9RT1Vi_aocaLsrftWZ2tjHtBVFMzr4kPf5_9iIcsbFWsHf95vXVi6EADv'
});

let createNewOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.addressUserId || !data.typeShipId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {

                let product = await db.OrderProduct.create({

                    addressUserId: data.addressUserId,
                    isPaymentOnlien: data.isPaymentOnlien,
                    statusId: 'S3',
                    typeShipId: data.typeShipId,
                    voucherId: data.voucherId,
                    note: data.note

                })

                data.arrDataShopCart = data.arrDataShopCart.map((item, index) => {
                    item.orderId = product.dataValues.id
                    return item;
                })

                await db.OrderDetail.bulkCreate(data.arrDataShopCart)
                let res = await db.ShopCart.findOne({ where: { userId: data.userId, statusId: 0 } })
                if (res) {
                    await db.ShopCart.destroy({
                        where: { userId: data.userId }
                    })
                    for (let i = 0; i < data.arrDataShopCart.length; i++) {
                        let productDetailSize = await db.ProductDetailSize.findOne({
                            where: { id: data.arrDataShopCart[i].productId },
                            raw: false
                        })
                        //  productDetailSize.stock = productDetailSize.stock - data.arrDataShopCart[i].quantity
                        await productDetailSize.save()

                    }

                }
                if (data.voucherId && data.userId) {
                    let voucherUses = await db.VoucherUsed.findOne({
                        where: {
                            voucherId: data.voucherId,
                            userId: data.userId
                        },
                        raw: false
                    })
                    voucherUses.status = 1;
                    await voucherUses.save()
                }
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllOrders = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let objectFilter = {
                include: [
                    { model: db.TypeShip, as: 'typeShipData' },
                    { model: db.Voucher, as: 'voucherData' },
                    { model: db.Allcode, as: 'statusOrderData' },

                ],
                order: [['createdAt', 'DESC']],
                raw: true,
                nest: true
            }
            if (data.limit && data.offset) {
                objectFilter.limit = +data.limit
                objectFilter.offset = +data.offset
            }
            if (data.statusId && data.statusId !== 'ALL') objectFilter.where = { statusId: data.statusId }
            let res = await db.OrderProduct.findAndCountAll(objectFilter)
            for (let i = 0; i < res.rows.length; i++) {
                let addressUser = await db.AddressUser.findOne({ where: { id: res.rows[i].addressUserId } })
                let shipper = await db.User.findOne({ where: { id: res.rows[i].shipperId } })

                if (addressUser) {
                    let user = await db.User.findOne({
                        where: {
                            id: addressUser.userId
                        }
                    })

                    res.rows[i].userData = user
                    res.rows[i].addressUser = addressUser
                    res.rows[i].shipperData = shipper
                }

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
let getDetailOrderById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let order = await db.OrderProduct.findOne({
                    where: { id: id },
                    include: [
                        { model: db.TypeShip, as: 'typeShipData' },
                        { model: db.Voucher, as: 'voucherData' },
                        { model: db.Allcode, as: 'statusOrderData' },

                    ],
                    raw: true,
                    nest: true
                })
                if (order.image) {
                    order.image = new Buffer(order.image, 'base64').toString('binary')
                }
                order.voucherData.typeVoucherOfVoucherData = await db.TypeVoucher.findOne({
                    where: { id: order.voucherData.typeVoucherId }
                })
                let orderDetail = await db.OrderDetail.findAll({
                    where: { orderId: id }
                })
                let addressUser = await db.AddressUser.findOne({
                    where: { id: order.addressUserId }
                })
                order.addressUser = addressUser
                let user = await db.User.findOne({
                    where: { id: addressUser.userId },
                    attributes: {
                        exclude: ['password', 'image']
                    },
                    raw: true,
                    nest: true
                })
                order.userData = user
                for (let i = 0; i < orderDetail.length; i++) {
                    orderDetail[i].productDetailSize = await db.ProductDetailSize.findOne({
                        where: { id: orderDetail[i].productId },
                        include: [
                            { model: db.Allcode, as: 'sizeData' },
                        ],
                        raw: true,
                        nest: true
                    })
                    orderDetail[i].productDetail = await db.ProductDetail.findOne({
                        where: { id: orderDetail[i].productDetailSize.productdetailId }
                    })
                    orderDetail[i].product = await db.Product.findOne({
                        where: { id: orderDetail[i].productDetail.productId }
                    })
                    orderDetail[i].productImage = await db.ProductImage.findAll({
                        where: { productdetailId: orderDetail[i].productDetail.id }
                    })
                    for (let j = 0; j < orderDetail[i].productImage.length; j++) {
                        orderDetail[i].productImage[j].image = new Buffer(orderDetail[i].productImage[j].image, 'base64').toString('binary')
                    }
                }

                order.orderDetail = orderDetail;

                resolve({
                    errCode: 0,
                    data: order
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let updateStatusOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.statusId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let order = await db.OrderProduct.findOne({
                    where: { id: data.id },
                    raw: false
                })
                order.statusId = data.statusId
                await order.save()
                // cong lai stock khi huy don
                if (data.statusId == 'S7' && data.dataOrder.orderDetail && data.dataOrder.orderDetail.length > 0) {
                    for (let i = 0; i < data.dataOrder.orderDetail.length; i++) {
                        let productDetailSize = await db.ProductDetailSize.findOne({
                            where: { id: data.dataOrder.orderDetail[i].productDetailSize.id },
                            raw: false
                        })
                        productDetailSize.stock = productDetailSize.stock + data.dataOrder.orderDetail[i].quantity
                        await productDetailSize.save()
                    }
                }


                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllOrdersByUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let addressUser = await db.AddressUser.findAll({
                    where: { userId: userId }
                })
                for (let i = 0; i < addressUser.length; i++) {
                    addressUser[i].order = await db.OrderProduct.findAll({
                        where: { addressUserId: addressUser[i].id },
                        include: [
                            { model: db.TypeShip, as: 'typeShipData' },
                            { model: db.Voucher, as: 'voucherData' },
                            { model: db.Allcode, as: 'statusOrderData' },

                        ],
                        raw: true,
                        nest: true
                    })
                    for (let j = 0; j < addressUser[i].order.length; j++) {
                        addressUser[i].order[j].voucherData.typeVoucherOfVoucherData = await db.TypeVoucher.findOne({
                            where: { id: addressUser[i].order[j].voucherData.typeVoucherId }
                        })
                        let orderDetail = await db.OrderDetail.findAll({
                            where: { orderId: addressUser[i].order[j].id }
                        })
                        for (let k = 0; k < orderDetail.length; k++) {
                            orderDetail[k].productDetailSize = await db.ProductDetailSize.findOne({
                                where: { id: orderDetail[k].productId },
                                include: [
                                    { model: db.Allcode, as: 'sizeData' },
                                ],
                                raw: true,
                                nest: true
                            })
                            orderDetail[k].productDetail = await db.ProductDetail.findOne({
                                where: { id: orderDetail[k].productDetailSize.productdetailId }
                            })
                            orderDetail[k].product = await db.Product.findOne({
                                where: { id: orderDetail[k].productDetail.productId }
                            })
                            orderDetail[k].productImage = await db.ProductImage.findAll({
                                where: { productdetailId: orderDetail[k].productDetail.id }
                            })
                            for (let f = 0; f < orderDetail[k].productImage.length; f++) {
                                orderDetail[k].productImage[f].image = new Buffer(orderDetail[k].productImage[f].image, 'base64').toString('binary')
                            }
                        }


                        addressUser[i].order[j].orderDetail = orderDetail
                    }



                }


                resolve({
                    errCode: 0,
                    data: addressUser

                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let getAllOrdersByShipper = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data.shipperId)
            let objectFilter = {
                include: [
                    { model: db.TypeShip, as: 'typeShipData' },
                    { model: db.Voucher, as: 'voucherData' },
                    { model: db.Allcode, as: 'statusOrderData' },

                ],
                order: [['createdAt', 'DESC']],
                raw: true,
                nest: true,
                where: { shipperId: data.shipperId }
            }

            if (data.status && data.status == 'working') objectFilter.where = { ...objectFilter.where, statusId: 'S5' }
            if (data.status && data.status == 'done') objectFilter.where = { ...objectFilter.where, statusId: 'S6' }

            let res = await db.OrderProduct.findAll(objectFilter)

            for (let i = 0; i < res.length; i++) {
                let addressUser = await db.AddressUser.findOne({ where: { id: res[i].addressUserId } })
                if (addressUser) {
                    let user = await db.User.findOne({ where: { id: addressUser.userId } })
                    res[i].userData = user
                    res[i].addressUser = addressUser
                }

            }

            resolve({
                errCode: 0,
                data: res,

            })


            resolve({
                errCode: 0,
                data: addressUser

            })


        } catch (error) {
            reject(error)
        }
    })
}
let paymentOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listItem = []
            let totalPriceProduct = 0
            for (let i = 0; i < data.result.length; i++) {
                data.result[i].productDetailSize = await db.ProductDetailSize.findOne({
                    where: { id: data.result[i].productId },
                    include: [
                        { model: db.Allcode, as: 'sizeData' },
                    ],
                    raw: true,
                    nest: true
                })
                data.result[i].productDetail = await db.ProductDetail.findOne({
                    where: { id: data.result[i].productDetailSize.productdetailId }
                })
                data.result[i].product = await db.Product.findOne({
                    where: { id: data.result[i].productDetail.productId }
                })
                data.result[i].realPrice = parseFloat((data.result[i].realPrice / EXCHANGE_RATES.USD).toFixed(2))

                console.log(data.result[i].realPrice)
                console.log(data.total)
                listItem.push({
                    "name": data.result[i].product.name + " | " + data.result[i].productDetail.nameDetail + " | " + data.result[i].productDetailSize.sizeData.value,
                    "sku": data.result[i].productId + "",
                    "price": data.result[i].realPrice + "",
                    "currency": "USD",
                    "quantity": data.result[i].quantity
                })
                totalPriceProduct += data.result[i].realPrice * data.result[i].quantity
                console.log(data.total - totalPriceProduct)
            }
            listItem.push({
                "name": "Phi ship + Voucher",
                "sku": "1",
                "price": parseFloat(data.total - totalPriceProduct).toFixed(2) + "",
                "currency": "USD",
                "quantity": 1
            })


            var create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": `http://localhost:5000/payment/success`,
                    "cancel_url": "http://localhost:5000/payment/cancel"
                },
                "transactions": [{
                    "item_list": {
                        "items": listItem
                    },
                    "amount": {
                        "currency": "USD",
                        "total": data.total
                    },
                    "description": "This is the payment description."
                }]
            };

            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    resolve({
                        errCode: -1,
                        errMessage: error,

                    })


                } else {

                    resolve({
                        errCode: 0,
                        errMessage: 'ok',
                        link: payment.links[1].href
                    })

                }
            });


        } catch (error) {
            reject(error)
        }
    })
}
let paymentOrderSuccess = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.PayerID || !data.paymentId || !data.token) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                var execute_payment_json = {
                    "payer_id": data.PayerID,
                    "transactions": [{
                        "amount": {
                            "currency": "USD",
                            "total": data.total
                        }
                    }]
                };

                var paymentId = data.paymentId;

                paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
                    if (error) {
                        resolve({
                            errCode: 0,
                            errMessage: error
                        })
                    } else {


                        let product = await db.OrderProduct.create({

                            addressUserId: data.addressUserId,
                            isPaymentOnlien: data.isPaymentOnlien,
                            statusId: 'S3',
                            typeShipId: data.typeShipId,
                            voucherId: data.voucherId,
                            note: data.note

                        })

                        data.arrDataShopCart = data.arrDataShopCart.map((item, index) => {
                            item.orderId = product.dataValues.id
                            return item;
                        })

                        await db.OrderDetail.bulkCreate(data.arrDataShopCart)
                        let res = await db.ShopCart.findOne({ where: { userId: data.userId, statusId: 0 } })
                        if (res) {
                            await db.ShopCart.destroy({
                                where: { userId: data.userId }
                            })
                            for (let i = 0; i < data.arrDataShopCart.length; i++) {
                                let productDetailSize = await db.ProductDetailSize.findOne({
                                    where: { id: data.arrDataShopCart[i].productId },
                                    raw: false
                                })
                                productDetailSize.stock = productDetailSize.stock - data.arrDataShopCart[i].quantity
                                await productDetailSize.save()

                            }

                        }
                        if (data.voucherId && data.userId) {
                            let voucherUses = await db.VoucherUsed.findOne({
                                where: {
                                    voucherId: data.voucherId,
                                    userId: data.userId
                                },
                                raw: false
                            })
                            voucherUses.status = 1;
                            await voucherUses.save()
                        }
                        resolve({
                            errCode: 0,
                            errMessage: 'ok'
                        })

                    }
                });








            }
        } catch (error) {
            reject(error)
        }
    })
}
let paymentOrderVnpaySuccess = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.OrderProduct.create({

                addressUserId: data.addressUserId,
                isPaymentOnlien: data.isPaymentOnlien,
                statusId: 'S3',
                typeShipId: data.typeShipId,
                voucherId: data.voucherId,
                note: data.note

            })

            data.arrDataShopCart = data.arrDataShopCart.map((item, index) => {
                item.orderId = product.dataValues.id
                return item;
            })

            await db.OrderDetail.bulkCreate(data.arrDataShopCart)
            let res = await db.ShopCart.findOne({ where: { userId: data.userId, statusId: 0 } })
            if (res) {
                await db.ShopCart.destroy({
                    where: { userId: data.userId }
                })
                for (let i = 0; i < data.arrDataShopCart.length; i++) {
                    let productDetailSize = await db.ProductDetailSize.findOne({
                        where: { id: data.arrDataShopCart[i].productId },
                        raw: false
                    })
                    productDetailSize.stock = productDetailSize.stock - data.arrDataShopCart[i].quantity
                    await productDetailSize.save()

                }

            }
            if (data.voucherId && data.userId) {
                let voucherUses = await db.VoucherUsed.findOne({
                    where: {
                        voucherId: data.voucherId,
                        userId: data.userId
                    },
                    raw: false
                })
                voucherUses.status = 1;
                await voucherUses.save()
            }
            resolve({
                errCode: 0,
                errMessage: 'ok'
            })
        } catch (error) {
            reject(error)
        }
    })
}
let confirmOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.shipperId || !data.orderId || !data.statusId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let orderProduct = await db.OrderProduct.findOne({ where: { id: data.orderId }, raw: false })
                orderProduct.shipperId = data.shipperId
                orderProduct.statusId = data.statusId
                await orderProduct.save()

                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })

            }


        } catch (error) {
            reject(error)
        }
    })
}
let paymentOrderVnpay = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            var ipAddr = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;



            var tmnCode = process.env.VNP_TMNCODE;
            var secretKey = process.env.VNP_HASHSECRET
            var vnpUrl = process.env.VNP_URL
            var returnUrl = process.env.VNP_RETURNURL




            var createDate = process.env.DATE_VNPAYMENT;
            var orderId = uuidv4();

            console.log("createDate", createDate)
            console.log("orderId", orderId)
            var amount = req.body.amount;
            var bankCode = req.body.bankCode;

            var orderInfo = req.body.orderDescription;
            var orderType = req.body.orderType;
            var locale = req.body.language;
            if (locale === null || locale === '') {
                locale = 'vn';
            }
            var currCode = 'VND';
            var vnp_Params = {};
            vnp_Params['vnp_Version'] = '2.1.0';
            vnp_Params['vnp_Command'] = 'pay';
            vnp_Params['vnp_TmnCode'] = tmnCode;
            // vnp_Params['vnp_Merchant'] = ''
            vnp_Params['vnp_Locale'] = locale;
            vnp_Params['vnp_CurrCode'] = currCode;
            vnp_Params['vnp_TxnRef'] = orderId;
            vnp_Params['vnp_OrderInfo'] = orderInfo;
            vnp_Params['vnp_OrderType'] = orderType;
            vnp_Params['vnp_Amount'] = amount * 100;
            vnp_Params['vnp_ReturnUrl'] = returnUrl;
            vnp_Params['vnp_IpAddr'] = ipAddr;
            vnp_Params['vnp_CreateDate'] = createDate;
            if (bankCode !== null && bankCode !== '') {
                vnp_Params['vnp_BankCode'] = bankCode;
            }

            vnp_Params = sortObject(vnp_Params);


            var signData = querystring.stringify(vnp_Params, { encode: false });

            var hmac = crypto.createHmac("sha512", secretKey);
            var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
            vnp_Params['vnp_SecureHash'] = signed;

            vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
            console.log(vnpUrl)
            resolve({
                errCode: 200,
                link: vnpUrl
            })
        } catch (error) {
            reject(error)
        }
    })
}
let confirmOrderVnpay = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            var vnp_Params = data;

            var secureHash = vnp_Params['vnp_SecureHash'];

            delete vnp_Params['vnp_SecureHash'];
            delete vnp_Params['vnp_SecureHashType'];

            vnp_Params = sortObject(vnp_Params);


            var tmnCode = process.env.VNP_TMNCODE;
            var secretKey = process.env.VNP_HASHSECRET


            var signData = querystring.stringify(vnp_Params, { encode: false });

            var hmac = crypto.createHmac("sha512", secretKey);
            var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

            if (secureHash === signed) {
                resolve({
                    errCode: 0,
                    errMessage: 'Success'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'failed'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
function sortObject(obj) {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
let updateImageOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.image) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let order = await db.OrderProduct.findOne({
                    where: { id: data.id },
                    raw: false
                })
                order.image = data.image
                await order.save()



                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createNewOrder: createNewOrder,
    getAllOrders: getAllOrders,
    getDetailOrderById: getDetailOrderById,
    updateStatusOrder: updateStatusOrder,
    getAllOrdersByUser: getAllOrdersByUser,
    paymentOrder: paymentOrder,
    paymentOrderSuccess: paymentOrderSuccess,
    confirmOrder: confirmOrder,
    getAllOrdersByShipper: getAllOrdersByShipper,
    paymentOrderVnpay: paymentOrderVnpay,
    confirmOrderVnpay: confirmOrderVnpay,
    paymentOrderVnpaySuccess: paymentOrderVnpaySuccess,
    updateImageOrder: updateImageOrder
}