import * as XLSX from 'xlsx/xlsx.mjs'
import { PREFIX_CURRENCY } from '../utils/constant'
class CommonUtils {
    static getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error)
        })
    }
    static exportExcel(data, nameSheet, nameFile) {
        return new Promise((resolve, reject) => {
            var wb = XLSX.utils.book_new()
            var ws = XLSX.utils.json_to_sheet(data)
            XLSX.utils.book_append_sheet(wb, ws, nameSheet)
            XLSX.writeFile(wb, `${nameFile}.xlsx`)
            resolve('oke')
        })
    }
    static formatter = new Intl.NumberFormat('en-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: PREFIX_CURRENCY.minimumFractionDigits
    })

}

export default CommonUtils;