import db from "../models/index";


let createNewAddressUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                await db.AddressUser.create({
                    userId: data.userId,
                    shipName: data.shipName,
                    shipAdress: data.shipAdress,
                    shipEmail: data.shipEmail,
                    shipPhonenumber: data.shipPhonenumber,
                })
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
let getAllAddressUserByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let res = await db.AddressUser.findAll({
                    where: { userId: userId }

                })
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
let deleteAddressUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let addressUser = await db.AddressUser.findOne({
                    where: {
                        id: data.id
                    }
                })
                if (addressUser) {
                    await db.AddressUser.destroy({
                        where: {
                            id: data.id
                        }
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'ok'
                    })
                } else {
                    resolve({
                        errCode: -1,
                        errMessage: 'Địa chỉ user không tìm thấy'
                    })
                }

            }
        } catch (error) {
            reject(error)
        }
    })
}
let editAddressUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.shipName || !data.shipAdress || !data.shipEmail || !data.shipPhonenumber) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let addressUser = await db.AddressUser.findOne({
                    where: {
                        id: data.id,
                    },
                    raw: false
                })
                if (addressUser) {
                    addressUser.shipName = data.shipName
                    addressUser.shipPhonenumber = data.shipPhonenumber
                    addressUser.shipAdress = data.shipAdress
                    addressUser.shipEmail = data.shipEmail

                    await addressUser.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'ok'
                    })
                } else {
                    resolve({
                        errCode: 0,
                        errMessage: 'Địa chỉ người dùng không tồn tại'
                    })
                }

            }
        } catch (error) {
            reject(error)
        }
    })
}
let getDetailAddressUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let res = await db.AddressUser.findOne({
                    where: { id: id }

                })
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
module.exports = {
    createNewAddressUser: createNewAddressUser,
    getAllAddressUserByUserId: getAllAddressUserByUserId,
    deleteAddressUser: deleteAddressUser,
    editAddressUser: editAddressUser,
    getDetailAddressUserById: getDetailAddressUserById
}