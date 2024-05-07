import React, { useEffect, useState } from 'react';
import FormSearch from '../Search/FormSearch';
import ItemCategory from './ItemCategory';
import SpecialItemBlog from './SpecialItemBlog'
function RightBlog(props) {
    const [dataCategory, setdataCategory] = useState([])
    const [activeLinkId,setactiveLinkId] = useState('')
    const [dataFeatureBlog, setdataFeatureBlog] = useState([])
    useEffect(()=>{
        if(props.data){
            setdataCategory(props.data)
        }
        if(props.dataFeatureBlog){
            setdataFeatureBlog(props.dataFeatureBlog)
        }
    },[props.data,props.dataFeatureBlog])
    let handleClickCategory= (code) =>{
        props.handleClickCategory(code)
        setactiveLinkId(code)
    }
    let handleSearchBlog = (keyword) =>{
        props.handleSearchBlog(keyword)
        
    }
    let handleOnchangeSearch = (keyword) =>{
        props.handleOnchangeSearch(keyword)
    }
   
    return (
        <div className="col-lg-4">
            <div className="blog_right_sidebar">
            {props.isPage === true && 
            <>
            <aside className="single_sidebar_widget search_widget">
                   <FormSearch title={"tiêu đề"} handleOnchange={handleOnchangeSearch} handleSearch={handleSearchBlog} />
                </aside>
                
                   <aside class="single_sidebar_widget post_category_widget">
                   <h4 class="widget_title">Danh mục</h4>
                   <ul class="list cat-list">
                   <ItemCategory activeLinkId={activeLinkId} handleClickCategory={handleClickCategory} data={{value:'Tất cả',code:'',countPost:'ALL'}}/>
                      {
                       dataCategory.map((item,index) =>{
                           return(
                               <ItemCategory activeLinkId={activeLinkId} handleClickCategory={handleClickCategory} key={index} data={item}/>    
                           )
                       })
                      }
                   </ul>
                 </aside>
            </>
                
                }
             
                <aside className="single_sidebar_widget popular_post_widget">
                    <h3 className="widget_title">Bài viết nổi bật</h3>
                    {dataFeatureBlog && dataFeatureBlog.length > 0 &&
                    dataFeatureBlog.map((item,index) =>{
                        return(
                            <SpecialItemBlog key={index} data={item} />
                        )
                    })
                    }
                  
                  
                </aside>

                
            </div>
        </div>
    );
}

export default RightBlog;