import React from 'react';
import { useEffect, useState } from 'react';
import { getAllBlog, deleteBlogService } from '../../../services/userService';
import moment from 'moment';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import '../Banner/AddBanner.scss';
import { PAGINATION } from '../../../utils/constant';
import ReactPaginate from 'react-paginate';
import CommonUtils from '../../../utils/CommonUtils';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from "react-router-dom";
import FormSearch from '../../../component/Search/FormSearch';

const ManageBlog = () => {

    const [dataBlog, setdataBlog] = useState([])
    const [imgPreview, setimgPreview] = useState('')
    const [isOpen, setisOpen] = useState(false)
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [keyword, setkeyword] = useState('')
    useEffect(() => {
        
            loadBlog(keyword)
    
    }, [])
    let loadBlog = async (keyword) => {
        let arrData = await getAllBlog({
            subjectId:'',
            limit: PAGINATION.pagerow,
            offset: 0,
            keyword:keyword

        })
        if (arrData && arrData.errCode === 0) {
            setdataBlog(arrData.data)
            setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
        }
    }


    let openPreviewImage = (url) => {
        setimgPreview(url);
        setisOpen(true);
    }
    let handleDeleteBlog = async (id) => {
        let response = await deleteBlogService({
            data: {
                id: id
            }
        })
        if (response && response.errCode === 0) {
            toast.success("Xóa bài đăng thành công thành công !")
            let arrData = await getAllBlog({

                subjectId:'',
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                keyword:keyword
            })
            if (arrData && arrData.errCode === 0) {
                setdataBlog(arrData.data)
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }
        } else {
            toast.error("Xóa bài đăng thất bại")
        }
    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllBlog({

            subjectId:'',
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            keyword:keyword

        })
        if (arrData && arrData.errCode === 0) {
            setdataBlog(arrData.data)

        }
    }
    let handleSearchBlog = (keyword) =>{
        loadBlog(keyword)
        setkeyword(keyword)
    }
    let handleOnchangeSearch = (keyword) =>{
        if(keyword === ''){
            loadBlog(keyword)
            setkeyword(keyword)
        }
    }
    let handleOnClickExport =async () =>{
        let res = await getAllBlog({
            subjectId:'',
            limit: '',
            offset:'',
            keyword:''
        })
        if(res && res.errCode == 0){
            res.data.forEach(element => {
                element.image = ""
            })
            await CommonUtils.exportExcel(res.data,"Danh sách bài viết","ListBlog")
        }
       
    }
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý bài đăng</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    Danh sách bài đăng
                </div>
                <div className="card-body">
              
                    <div className='row'>
                    <div  className='col-4'>
                    <FormSearch title={"tiêu đề"}  handleOnchange={handleOnchangeSearch} handleSearch={handleSearchBlog} />
                    </div>
                    <div className='col-8'>
                    <button  style={{float:'right'}} onClick={() => handleOnClickExport()} className="btn btn-success" >Xuất excel <i class="fa-solid fa-file-excel"></i></button>
                    </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered" style={{ border: '1' }} width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên bài đăng</th>
                                    <th>Chủ đề</th>
                                    <th>Hình ảnh</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataBlog && dataBlog.length > 0 &&
                                    dataBlog.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.title}</td>
                                                <td>{item.subjectData.value}</td>
                                                <td style={{ width: '30%' }} ><div onClick={() => openPreviewImage(item.image)} className="box-img-preview" style={{ backgroundImage: `url(${item.image})`, width: '100%' }}></div></td>
                                                <td style={{ width: '20%' }}>
                                                    <Link to={`/admin/edit-blog/${item.id}`}>Edit</Link>
                                                    &nbsp; &nbsp;

                                                    <span onClick={() => handleDeleteBlog(item.id)} style={{ color: '#0E6DFE', cursor: 'pointer' }} >Delete</span>


                                                </td>
                                            </tr>
                                        )
                                    })
                                }




                            </tbody>
                        </table>
                    </div>
                </div>
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
            {
                isOpen === true &&
                <Lightbox mainSrc={imgPreview}
                    onCloseRequest={() => setisOpen(false)}
                />
            }
        </div >
    )
}
export default ManageBlog;