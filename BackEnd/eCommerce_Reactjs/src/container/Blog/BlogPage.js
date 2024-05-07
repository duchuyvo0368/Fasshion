import React, { useEffect, useState } from 'react';
import ItemBlog from '../../component/Blog/ItemBlog';
import Pagination from '../../component/Shop/Pagination';
import SpecialItemBlog from '../../component/Blog/SpecialItemBlog';
import RightBlog from '../../component/Blog/RightBlog';
import { PAGINATION } from '../../utils/constant'
import { getAllBlog } from '../../services/userService'
import ReactPaginate from 'react-paginate';
import { useFetchAllcode } from '../customize/fetch';
import {getAllCategoryBlogService,getFeatureBlog} from '../../services/userService'
import { Link } from 'react-router-dom';
function BlogPage(props) {
  const [dataBlog, setdataBlog] = useState([])
  const [dataFeatureBlog, setdataFeatureBlog] = useState([])
  const [dataSubject, setdataSubject] = useState([])
  const [count, setCount] = useState('')
  const [numberPage, setnumberPage] = useState('')
  const [subjectId,setsubjectId] = useState('')
  const [keyword, setkeyword] = useState('')
  useEffect(() => {
    try {
      window.scrollTo(0, 0);
      loadCategoryBlog()
        fetchData('',keyword)
        loadFeatureBlog()
    } catch (error) {
        console.log(error)
    }

}, [])



let fetchData = async (code,keyword) => {
  let arrData = await getAllBlog({

      subjectId:code,
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword:keyword
  })
  if (arrData && arrData.errCode === 0) {
      setdataBlog(arrData.data)
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
  }
}
let loadFeatureBlog = async() =>{
  let res = await getFeatureBlog(6)
  if(res && res.errCode ==0){
    setdataFeatureBlog(res.data)
  }
}
let loadCategoryBlog = async() =>{
  let res = await getAllCategoryBlogService('SUBJECT')
  if(res && res.errCode == 0){
      setdataSubject(res.data)
  }
}
let handleChangePage = async (number) => {
  setnumberPage(number.selected)
  let arrData = await getAllBlog({

    subjectId:subjectId,
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword:keyword

  })
  if (arrData && arrData.errCode === 0) {
      setdataBlog(arrData.data)
     
  }
  
}
let handleClickCategory = (code) =>{
  setsubjectId(code)
  fetchData(code,'')

}
let handleSearchBlog = (text) =>{
  fetchData('',text)
  setkeyword(text)
}
let handleOnchangeSearch = (keyword) =>{
  if(keyword === ''){
    fetchData('',keyword)
      setkeyword(keyword)
   }
  
}
    return (
        <>
        <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="container">
          <div class="banner_content d-md-flex justify-content-between align-items-center">
            <div class="mb-3 mb-md-0">
              <h2>Tin tức</h2>
              <p>Hãy theo dõi những bài viết để nhận được thông tin mới nhất</p>
            </div>
            <div class="page_link">
            <Link to={"/"}>Trang chủ</Link>
             <Link to={"/blog"}>Tin tức</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="blog_area section_gap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mb-5 mb-lg-0">
                        <div className="blog_left_sidebar">
                           {dataBlog && dataBlog.length > 0 && 
                           dataBlog.map((item,index) =>{
                            return(
                              <ItemBlog key={index} data={item}></ItemBlog>
                            )
                           })
                           }
                     
                       
                          
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
                    <RightBlog handleOnchangeSearch={handleOnchangeSearch} handleSearchBlog={handleSearchBlog} dataFeatureBlog={dataFeatureBlog} isPage={true} handleClickCategory={handleClickCategory} data={dataSubject} />
                </div>
            </div>
        </section>
        
        </>
      

    );
}

export default BlogPage;