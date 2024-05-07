import axios from "../axios";

//==================USER==========================//
const getAllUsers = (data) => {
    return axios.get(`/api/get-all-user?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}`)

}
const createNewUser = (data) => {
    return axios.post(`/api/create-new-user`, data)

}
const UpdateUserService = (data) => {
    return axios.put(`/api/update-user`, data)

}
const DeleteUserService = (userId) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: userId
        }
    })

}
const getDetailUserById = (id) => {
    return axios.get(`/api/get-detail-user-by-id?id=${id}`)

}
const getDetailUserByEmail = (email) => {
    return axios.get(`/api/get-detail-user-by-email?email=${email}`)

}
const handleLoginService = (data) => {
    return axios.post(`/api/login`, data)

}
const handleSendVerifyEmail = (data) => {
    return axios.post(`/api/send-verify-email`, data)
}
const handleVerifyEmail = (data) => {
    return axios.post(`/api/verify-email`, data)
}
const handleChangePassword = (data) => {
    return axios.post(`/api/changepassword`, data)
}
const checkPhonenumberEmail = (data) => {
    return axios.get(`/api/check-phonenumber-email?phonenumber=${data.phonenumber}&email=${data.email}`)

}
//===============ALL CODE========================//
const getAllCodeService = (type) => {
    return axios.get(`/api/get-all-code?type=${type}`)

}
const getAllCategoryBlogService = (type) => {
    return axios.get(`/api/get-all-category-blog?type=${type}`)

}
const getListAllCodeService = (data) => {
    return axios.get(`/api/get-list-allcode?type=${data.type}&limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}`)

}
const createAllCodeService = (data) => {
    return axios.post(`/api/create-new-all-code`, data)

}

const getDetailAllcodeById = (id) => {
    return axios.get(`/api/get-detail-all-code-by-id?id=${id}`)

}
const UpdateAllcodeService = (data) => {
    return axios.put(`/api/update-all-code`, data)

}
const DeleteAllcodeService = (allcodeId) => {
    return axios.delete(`/api/delete-all-code`, {
        data: {
            id: allcodeId
        }
    })
}
//==================PRODUCT======================//
const CreateNewProduct = (data) => {
    return axios.post(`/api/create-new-product`, data)
}
const getAllProductUser = (data) => {
    return axios.get(`/api/get-all-product-user?limit=${data.limit}&offset=${data.offset}&sortPrice=${data.sortPrice}&sortName=${data.sortName}&categoryId=${data.categoryId}&brandId=${data.brandId}&keyword=${data.keyword}`)

}
const getAllProductAdmin = (data) => {
    return axios.get(`/api/get-all-product-admin?limit=${data.limit}&offset=${data.offset}&sortPrice=${data.sortPrice}&sortName=${data.sortName}&categoryId=${data.categoryId}&brandId=${data.brandId}&keyword=${data.keyword}`)

}
const handleBanProductService = (data) => {
    return axios.post(`/api/unactive-product`, data)
}
const handleActiveProductService = (data) => {
    return axios.post(`/api/active-product`, data)
}
const getDetailProductByIdService = (id) => {
    return axios.get(`/api/get-detail-product-by-id?id=${id}`)
}
const UpdateProductService = (data) => {
    return axios.put(`/api/update-product`, data)
}
const getAllProductDetailByIdService = (data) => {
    return axios.get(`/api/get-all-product-detail-by-id?id=${data.id}&limit=${data.limit}&offset=${data.offset}`)
}
const getAllProductDetailImageByIdService = (data) => {
    return axios.get(`/api/get-all-product-detail-image-by-id?id=${data.id}&limit=${data.limit}&offset=${data.offset}`)
}
const getAllProductDetailSizeByIdService = (data) => {
    return axios.get(`/api/get-all-product-detail-size-by-id?id=${data.id}&limit=${data.limit}&offset=${data.offset}`)
}
const CreateNewProductDetailService = (data) => {
    return axios.post(`/api/create-new-product-detail`, data)
}
const getProductDetailByIdService = (id) => {
    return axios.get(`/api/get-product-detail-by-id?id=${id}`)
}
const UpdateProductDetailService = (data) => {
    return axios.put(`/api/update-product-detail`, data)
}
const createNewProductImageService = (data) => {
    return axios.post(`/api/create-product-detail-image`, data)
}
const getProductDetailImageByIdService = (id) => {
    return axios.get(`/api/get-product-detail-image-by-id?id=${id}`)
}
const UpdateProductDetailImageService = (data) => {
    return axios.put(`/api/update-product-detail-image`, data)
}
const DeleteProductDetailImageService = (data) => {
    return axios.delete(`/api/delete-product-detail-image`, data)
}
const DeleteProductDetailService = (data) => {
    return axios.delete(`/api/delete-product-detail`, data)
}
const createNewProductSizeService = (data) => {
    return axios.post(`/api/create-product-detail-size`, data)
}
const getProductDetailSizeByIdService = (id) => {
    return axios.get(`/api/get-detail-product-detail-size-by-id?id=${id}`)
}
const UpdateProductDetailSizeService = (data) => {
    return axios.put(`/api/update-product-detail-size`, data)
}
const DeleteProductDetailSizeService = (data) => {
    return axios.delete(`/api/delete-product-detail-size`, data)
}
const getProductFeatureService = (limit) => {
    return axios.get(`/api/get-product-feature?limit=${limit}`)
}
const getProductNewService = (limit) => {
    return axios.get(`/api/get-product-new?limit=${limit}`)
}
const getProductShopcartService = (data) => {
    return axios.get(`/api/get-product-shopcart?userId=${data.userId}&limit=${data.limit}`)
}
const getProductRecommendService = (data) => {
    return axios.get(`/api/get-product-recommend?userId=${data.userId}&limit=${data.limit}`)
}
//===============BANNER======================//
const createNewBannerService = (data) => {
    return axios.post(`/api/create-new-banner`, data)
}
const updateBannerService = (data) => {
    return axios.put(`/api/update-banner`, data)
}
const deleteBannerService = (data) => {
    return axios.delete(`/api/delete-banner`, data)
}
const getDetailBannerByIdService = (id) => {
    return axios.get(`/api/get-detail-banner?id=${id}`)
}
const getAllBanner = (data) => {
    return axios.get(`/api/get-all-banner?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}`)
}
//=================BLOG=========================//
const createNewBlogrService = (data) => {
    return axios.post(`/api/create-new-blog`, data)
}
const updateBlogService = (data) => {
    return axios.put(`/api/update-blog`, data)
}
const deleteBlogService = (data) => {
    return axios.delete(`/api/delete-blog`, data)
}
const getDetailBlogByIdService = (id) => {
    return axios.get(`/api/get-detail-blog?id=${id}`)
}
const getAllBlog = (data) => {
    return axios.get(`/api/get-all-blog?limit=${data.limit}&offset=${data.offset}&subjectId=${data.subjectId}&keyword=${data.keyword}`)
}
const getFeatureBlog = (limit) => {
    return axios.get(`/api/get-feature-blog?limit=${limit}`)
}
const getNewBlog = (limit) => {
    return axios.get(`/api/get-new-blog?limit=${limit}`)
}
//===================TYPESHIP=====================//
const createNewTypeShipService = (data) => {
    return axios.post(`/api/create-new-typeship`, data)
}
const updateTypeShipService = (data) => {
    return axios.put(`/api/update-typeship`, data)
}
const deleteTypeShipService = (data) => {
    return axios.delete(`/api/delete-typeship`, data)
}
const getDetailTypeShipByIdService = (id) => {
    return axios.get(`/api/get-detail-typeship?id=${id}`)
}
const getAllTypeShip = (data) => {
    return axios.get(`/api/get-all-typeship?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}`)
}
//===================TYPE VOUCHER===============//
const createNewTypeVoucherService = (data) => {
    return axios.post(`/api/create-new-typevoucher`, data)
}
const updateTypeVoucherService = (data) => {
    return axios.put(`/api/update-typevoucher`, data)
}
const deleteTypeVoucherService = (data) => {
    return axios.delete(`/api/delete-typevoucher`, data)
}
const getDetailTypeVoucherByIdService = (id) => {
    return axios.get(`/api/get-detail-typevoucher?id=${id}`)
}
const getAllTypeVoucher = (data) => {
    return axios.get(`/api/get-all-typevoucher?limit=${data.limit}&offset=${data.offset}`)
}
const getSelectTypeVoucher = () => {
    return axios.get(`/api/get-select-typevoucher`)
}
//=====================VOUCHER===================//
const createNewVoucherService = (data) => {
    return axios.post(`/api/create-new-voucher`, data)
}
const updateVoucherService = (data) => {
    return axios.put(`/api/update-voucher`, data)
}
const deleteVoucherService = (data) => {
    return axios.delete(`/api/delete-voucher`, data)
}
const getDetailVoucherByIdService = (id) => {
    return axios.get(`/api/get-detail-voucher?id=${id}`)
}
const getAllVoucher = (data) => {
    return axios.get(`/api/get-all-voucher?limit=${data.limit}&offset=${data.offset}`)
}
const saveUserVoucherService = (data) => {
    return axios.post(`/api/save-user-voucher`, data)
}
const getAllVoucherByUserIdService = (data) => {
    return axios.get(`/api/get-all-voucher-by-userid?limit=${data.limit}&offset=${data.offset}&id=${data.id}`)
}
//========================REVIEW======================//
const createNewReviewService = (data) => {
    return axios.post(`/api/create-new-review`, data)
}
const getAllReviewByProductIdService = (id) => {
    return axios.get(`/api/get-all-review-by-productId?id=${id}`)
}
const ReplyReviewService = (data) => {
    return axios.post(`/api/reply-review`, data)
}
const deleteReviewService = (data) => {
    return axios.delete(`/api/delete-review`, data)
}
//========================SHOPCART===================//
const addShopCartService = (data) => {
    return axios.post(`/api/add-shopcart`, data)
}
const getAllShopCartByUserIdService = (id) => {
    return axios.get(`/api/get-all-shopcart-by-userId?id=${id}`)
}
const deleteItemShopCartService = (data) => {
    return axios.delete(`/api/delete-item-shopcart`, data)
}
//==========================ORDER====================//
const createNewOrderService = (data) => {
    return axios.post(`/api/create-new-order`, data)

}
const getAllOrder = (data) => {
    return axios.get(`/api/get-all-order?limit=${data.limit}&offset=${data.offset}&statusId=${data.statusId}`)
}
const getDetailOrder = (id) => {
    return axios.get(`/api/get-detail-order?id=${id}`)
}
const updateStatusOrderService = (data) => {
    return axios.put(`/api/update-status-order`, data)
}

const getAllOrdersByUser = (userId) => {
    return axios.get(`/api/get-all-order-by-user?userId=${userId}`)
}
const paymentOrderService = (data) => {
    return axios.post(`/api/payment-order`, data)

}
const paymentOrderSuccessService = (data) => {
    return axios.post(`/api/payment-order-success`, data)

}
const paymentOrderVnpaySuccessService = (data) => {
    return axios.post(`/api/payment-order-vnpay-success`, data)

}
const paymentOrderVnpayService = (data) => {
    return axios.post(`/api/payment-order-vnpay`, data)

}
const confirmOrderVnpay = (data) => {
    return axios.post(`/api/vnpay_return`, data)
}
//=========================ADDRESS USER==============//
const createNewAddressUserrService = (data) => {
    return axios.post(`/api/create-new-address-user`, data)
}
const deleteAddressUserService = (data) => {
    return axios.delete(`/api/delete-address-user`, data)
}
const editAddressUserService = (data) => {
    return axios.put(`/api/edit-address-user`, data)
}
const getAllAddressUserByUserIdService = (userId) => {
    return axios.get(`/api/get-all-address-user?userId=${userId}`)
}
const getDetailAddressUserByIdService = (id) => {
    return axios.get(`/api/get-detail-address-user-by-id?id=${id}`)

}
//======================MESSSAGE==========================//
const createNewRoom = (data) => {
    return axios.post(`/api/create-new-room`, data)
}
const sendMessage = (data) => {
    return axios.post(`/api/sendMessage`, data)
}
const loadMessage = (roomId, userId) => {
    return axios.get(`/api/loadMessage?roomId=${roomId}&userId=${userId}`)

}
const listRoomOfUser = (userId) => {
    return axios.get(`/api/listRoomOfUser?userId=${userId}`)

}
const listRoomOfAdmin = () => {
    return axios.get(`/api/listRoomOfAdmin`)

}
//========================COMMENT=======================
const createNewcommentService = (data) => {
    return axios.post(`/api/create-new-comment`, data)
}
const getAllcommentByBlogIdService = (id) => {
    return axios.get(`/api/get-all-comment-by-blogId?id=${id}`)
}
const ReplycommentService = (data) => {
    return axios.post(`/api/reply-comment`, data)
}
const deletecommentService = (data) => {
    return axios.delete(`/api/delete-comment`, data)
}
//======================STATISTIC========================//
const getCountCardStatistic = () => {
    return axios.get(`/api/get-count-card-statistic`)
}
const getCountStatusOrder = (data) => {
    return axios.get(`/api/get-count-status-order?oneDate=${data.oneDate}&twoDate=${data.twoDate}&type=${data.type}`)
}
const getStatisticByMonth = (year) => {
    return axios.get(`/api/get-statistic-by-month?year=${year}`)
}
const getStatisticByDay = (data) => {
    return axios.get(`/api/get-statistic-by-day?year=${data.year}&month=${data.month}`)
}
const getStatisticOverturn = (data) => {
    return axios.get(`/api/get-statistic-overturn?oneDate=${data.oneDate}&twoDate=${data.twoDate}&type=${data.type}`)
}
const getStatisticProfit = (data) => {
    return axios.get(`/api/get-statistic-profit?oneDate=${data.oneDate}&twoDate=${data.twoDate}&type=${data.type}`)
}
const getStatisticStockProduct = (data) => {
    return axios.get(`/api/get-statistic-stock-product?limit=${data.limit}&offset=${data.offset}`)
}
//=======================SUPPLIER==========================//
const createNewSupplierService = (data) => {
    return axios.post(`/api/create-new-supplier`, data)
}
const updateSupplierService = (data) => {
    return axios.put(`/api/update-supplier`, data)
}
const deleteSupplierService = (data) => {
    return axios.delete(`/api/delete-supplier`, data)
}
const getDetailSupplierByIdService = (id) => {
    return axios.get(`/api/get-detail-supplier?id=${id}`)
}
const getAllSupplier = (data) => {
    return axios.get(`/api/get-all-supplier?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}`)
}
//=======================RECEIPT==========================//
const createNewReceiptService = (data) => {
    return axios.post(`/api/create-new-receipt`, data)
}
const updateReceiptService = (data) => {
    return axios.put(`/api/update-receipt`, data)
}
const deleteReceiptService = (data) => {
    return axios.delete(`/api/delete-receipt`, data)
}
const getDetailReceiptByIdService = (id) => {
    return axios.get(`/api/get-detail-receipt?id=${id}`)
}
const getAllReceipt = (data) => {
    return axios.get(`/api/get-all-receipt?limit=${data.limit}&offset=${data.offset}`)
}
const createNewReceiptDetailService = (data) => {
    return axios.post(`/api/create-new-detail-receipt`, data)
}
//======================THIRTY SERVICE==========================//
const getExchangeRate = () => {
    return axios.get(`https://tygia.com/json.php?ran=0&gold=0&bank=VIETCOM&date=now`)
}
export {
    getAllUsers, getAllCodeService, createNewUser, DeleteUserService, getDetailUserById, UpdateUserService,
    createAllCodeService, getDetailAllcodeById, UpdateAllcodeService, DeleteAllcodeService, handleLoginService,
    handleSendVerifyEmail, handleVerifyEmail, handleChangePassword, CreateNewProduct, getAllProductUser, getAllProductAdmin,
    handleBanProductService, handleActiveProductService, getDetailProductByIdService, UpdateProductService,
    getAllProductDetailByIdService, getAllProductDetailImageByIdService, CreateNewProductDetailService,
    getProductDetailByIdService, UpdateProductDetailService, createNewProductImageService, getProductDetailImageByIdService,
    UpdateProductDetailImageService, DeleteProductDetailImageService, DeleteProductDetailService,
    createNewBannerService, updateBannerService, deleteBannerService, getDetailBannerByIdService, getAllBanner,
    createNewBlogrService, updateBlogService, deleteBlogService, getDetailBlogByIdService, getAllBlog, getListAllCodeService,
    createNewTypeShipService, updateTypeShipService, deleteTypeShipService, getDetailTypeShipByIdService, getAllTypeShip,
    createNewTypeVoucherService, updateTypeVoucherService, deleteTypeVoucherService, getDetailTypeVoucherByIdService, getAllTypeVoucher,
    createNewVoucherService, updateVoucherService, deleteVoucherService, getDetailVoucherByIdService, getAllVoucher, getSelectTypeVoucher,
    getAllProductDetailSizeByIdService, createNewProductSizeService, getProductDetailSizeByIdService, UpdateProductDetailSizeService,
    DeleteProductDetailSizeService, createNewReviewService, getAllReviewByProductIdService, ReplyReviewService, deleteReviewService,
    getProductFeatureService, getProductNewService, saveUserVoucherService, getAllVoucherByUserIdService, addShopCartService,
    getAllShopCartByUserIdService, deleteItemShopCartService, createNewOrderService, createNewAddressUserrService, getAllAddressUserByUserIdService,
    deleteAddressUserService, editAddressUserService, getDetailAddressUserByIdService, getAllOrder, getDetailOrder, updateStatusOrderService,
    getAllOrdersByUser, paymentOrderService, paymentOrderSuccessService, createNewRoom, sendMessage, loadMessage, listRoomOfUser, listRoomOfAdmin, getAllCategoryBlogService,
    createNewcommentService, getAllcommentByBlogIdService, ReplycommentService, deletecommentService, getFeatureBlog, getNewBlog, getCountCardStatistic, getCountStatusOrder,
    getStatisticByMonth, getStatisticByDay, checkPhonenumberEmail, createNewSupplierService, updateSupplierService, deleteSupplierService, getDetailSupplierByIdService,
    getAllSupplier, createNewReceiptService, getAllReceipt, getDetailReceiptByIdService, deleteReceiptService, updateReceiptService, createNewReceiptDetailService,
    getStatisticOverturn, getStatisticProfit, getProductShopcartService, getDetailUserByEmail, getProductRecommendService,
    getStatisticStockProduct, getExchangeRate, paymentOrderVnpayService, confirmOrderVnpay, paymentOrderVnpaySuccessService
}