import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useFetchAllcode } from '../../customize/fetch';
import './AddProduct.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getDetailProductByIdService, UpdateProductService } from '../../../services/userService';
const EditProduct = (props) => {
    const mdParser = new MarkdownIt();
    const { id } = useParams();
    const { data: dataBrand } = useFetchAllcode('BRAND');
    const { data: dataCategory } = useFetchAllcode('CATEGORY')

    const [inputValues, setInputValues] = useState({
        brandId: '', categoryId: '', name: '',contentHTML: '', contentMarkdown: '',
        madeby: '', material: '',
    });

    useEffect(() => {
        let fetchProduct = async () => {
            let res = await getDetailProductByIdService(id)
            if (res && res.errCode === 0) {
                setStateProduct(res.data)
            }
        }
        fetchProduct();
    }, [])
    let setStateProduct = (data) => {
        setInputValues({
            ...inputValues,
            ["brandId"]: data.brandId,
            ["categoryId"]: data.categoryId,
            ["name"]: data.name,
            ["contentMarkdown"]: data.contentMarkdown,
            ["contentHTML"]: data.contentHTML,
            ["madeby"]: data.madeby,
            ["material"]: data.material,
        })

    }
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleSaveProduct = async () => {
        let res = await UpdateProductService({
            name: inputValues.name,
            material: inputValues.material,
            madeby: inputValues.madeby,
            brandId: inputValues.brandId,
            categoryId: inputValues.categoryId,
            contentHTML: inputValues.contentHTML,
            contentMarkdown: inputValues.contentMarkdown,
            id: id
        })
        if (res && res.errCode === 0) {
            toast.success("Cập nhật sản phẩm thành công !")
        } else {
            toast.error(res.errMessage)
        }
    }
    let handleEditorChange = ({ html, text }) => {
        setInputValues({
            ...inputValues,
            ["contentMarkdown"]: text,
            ["contentHTML"]: html
        })
    }
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý sản phẩm</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    Cập nhật sản phẩm
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Tên sản phẩm</label>
                                <input type="text" value={inputValues.name} name="name" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputPassword4">Chất liệu</label>
                                <input type="text" value={inputValues.material} name="material" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputPassword4">Được làm bởi</label>
                                <input type="text" value={inputValues.madeby} name="madeby" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress">Mô tả sản phẩm</label>
                            <MdEditor
                                style={{ height: '400px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={handleEditorChange}
                                value={inputValues.contentMarkdown}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Danh mục sản phẩm</label>
                                <select value={inputValues.categoryId} name="categoryId" onChange={(event) => handleOnChange(event)} id="inputState" className="form-control">
                                    {dataCategory && dataCategory.length > 0 &&
                                        dataCategory.map((item, index) => {
                                            return (
                                                <option key={index} value={item.code}>{item.value}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Nhãn hàng</label>
                                <select value={inputValues.brandId} name="brandId" onChange={(event) => handleOnChange(event)} id="inputState" className="form-control">
                                    {dataBrand && dataBrand.length > 0 &&
                                        dataBrand.map((item, index) => {
                                            return (
                                                <option key={index} value={item.code}>{item.value}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                        </div>


                        <button onClick={() => handleSaveProduct()} type="button" className="btn btn-primary">Lưu thông tin</button>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default EditProduct;