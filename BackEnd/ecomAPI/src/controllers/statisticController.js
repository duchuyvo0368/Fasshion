import statisticService from '../services/statisticService';

let getCountCardStatistic = async (req, res) => {
    try {
        let data = await statisticService.getCountCardStatistic(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getCountStatusOrder = async (req, res) => {
    try {
        let data = await statisticService.getCountStatusOrder(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getStatisticByMonth = async (req, res) => {
    try {
        let data = await statisticService.getStatisticByMonth(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getStatisticByDay = async (req, res) => {
    try {
        let data = await statisticService.getStatisticByDay(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getStatisticOverturn = async (req, res) => {
    try {
        let data = await statisticService.getStatisticOverturn(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getStatisticProfit = async (req, res) => {
    try {
        let data = await statisticService.getStatisticProfit(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getStatisticStockProduct = async (req, res) => {
    try {
        let data = await statisticService.getStatisticStockProduct(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
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