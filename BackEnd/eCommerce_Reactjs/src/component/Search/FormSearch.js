import React from 'react';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


const FormSearch = (props) => {
    const [keyword, setkeyword] = useState('')

    let handleSearchProduct = () =>{
        props.handleSearch(keyword)
    }
    let handleOnchange = (keyword)=>{
        setkeyword(keyword)
        props.handleOnchange(keyword)
    }


    return (
        <form   >
        <div className="form-group">
            <div className="input-group mb-3">
                <input onChange={(e) => handleOnchange(e.target.value)} value={keyword} type="text" className="form-control" placeholder={`Tìm kiếm theo ${props.title}`} />
                <div className="input-group-append">
                    <button onClick={() => handleSearchProduct()} className="btn" type="button"><i className="ti-search"/></button>
                    <button  className="btn" type="button"><i className="ti-camera"/></button>
                </div>
            </div>
        </div>

        </form>
    )
}
export default FormSearch;



