import db from "../models/index";
require('dotenv').config();
const { Op } = require("sequelize");
let createNewReceipt = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId || !data.supplierId || !data.productDetailSizeId || !data.quantity
                || !data.price
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {

                let receipt = await db.Receipt.create({
                    userId: data.userId,
                    supplierId: data.supplierId

                })
                if (receipt) {
                    await db.ReceiptDetail.create({
                        receiptId: receipt.id,
                        productDetailSizeId: data.productDetailSizeId,
                        quantity: data.quantity,
                        price: data.price,
                    }
                    )
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
let createNewReceiptDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.receiptId || !data.productDetailSizeId || !data.quantity
                || !data.price
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                await db.ReceiptDetail.create({
                    receiptId: data.receiptId,
                    productDetailSizeId: data.productDetailSizeId,
                    quantity: data.quantity,
                    price: data.price,
                }
                )

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
let getDetailReceiptById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {

                let res = await db.Receipt.findOne({
                    where: { id: id }

                })
                res.receiptDetail = await db.ReceiptDetail.findAll({ where: { receiptId: id } })
                if (res.receiptDetail && res.receiptDetail.length > 0) {
                    for (let i = 0; i < res.receiptDetail.length; i++) {

                        let productDetailSize = await db.ProductDetailSize.findOne({
                            where: { id: res.receiptDetail[i].productDetailSizeId },
                            include: [
                                { model: db.Allcode, as: 'sizeData', attributes: ['value', 'code'] },

                            ],
                            raw: true,
                            nest: true
                        })
                        res.receiptDetail[i].productDetailSizeData = productDetailSize
                        res.receiptDetail[i].productDetailData = await db.ProductDetail.findOne({ where: { id: productDetailSize.productdetailId } })
                        res.receiptDetail[i].productData = await db.Product.findOne({ where: { id: res.receiptDetail[i].productDetailData.productId } })

                    }
                }


                resolve({
                    errCode: 0,
                    data: res
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllReceipt = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let objectFilter = {}
            if (data.limit && data.offset) {
                objectFilter.limit = +data.limit
                objectFilter.offset = +data.offset
            }

            //  if(data.keyword !=='') objectFilter.where = {...objectFilter.where, name: {[Op.substring]: data.keyword  } }
            let res = await db.Receipt.findAndCountAll(objectFilter)
            for (let i = 0; i < res.rows.length; i++) {
                res.rows[i].userData = await db.User.findOne({ where: { id: res.rows[i].userId } })
                res.rows[i].supplierData = await db.Supplier.findOne({ where: { id: res.rows[i].supplierId } })
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
let updateReceipt = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.date || !data.supplierId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let receipt = await db.Receipt.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (receipt) {

                    receipt.supplierId = data.supplierId;
                    await receipt.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'ok'
                    })
                }
            }

        } catch (error) {
            reject(error)
        }
    })
}
let deleteReceipt = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let receipt = await db.Receipt.findOne({
                    where: { id: data.id }
                })
                if (receipt) {
                    await db.Receipt.destroy({
                        where: { id: data.id }
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'ok'
                    })
                }
            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createNewReceipt: createNewReceipt,
    getDetailReceiptById: getDetailReceiptById,
    getAllReceipt: getAllReceipt,
    updateReceipt: updateReceipt,
    deleteReceipt: deleteReceipt,
    createNewReceiptDetail: createNewReceiptDetail
}