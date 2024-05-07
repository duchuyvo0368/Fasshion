import React, { useState, useEffect } from 'react';

import { getAllCodeService } from '../../services/userService';
function Brand(props) {


    const [activeLinkId, setactiveLinkId] = useState('')
    const [arrBrand, setarrBrand] = useState([])
    let handleClickBrand = (code) => {
        props.handleRecevieDataBrand(code)
        setactiveLinkId(code)
    }
    useEffect(() => {
        let fetchBrand = async () => {
            let arrData = await getAllCodeService('BRAND')
            if (arrData && arrData.errCode === 0) {
                arrData.data.unshift({
                    createdAt: null,
                    code: "ALL",
                    type: "BRAND",
                    value: "Tất cả",
                })
                setarrBrand(arrData.data)
            }
        }
        fetchBrand()
    }, [])
    return (

        <aside className="left_widgets p_filter_widgets">
            <div className="l_w_title">
                <h3>Các thương hiệu</h3>
            </div>
            <div className="widgets_inner">
                <ul className="list">
                    {arrBrand && arrBrand.length > 0 &&
                        arrBrand.map((item, index) => {
                            return (
                                <li className={item.code === activeLinkId ? 'active' : ''} style={{ cursor: 'pointer' }} onClick={() => handleClickBrand(item.code)} key={index}>
                                    <a >{item.value}</a>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </aside>

    );
}

export default Brand;