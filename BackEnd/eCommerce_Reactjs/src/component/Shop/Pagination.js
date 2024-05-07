import React from 'react';

function Pagination(props) {
    var item = [];
    for (var i = 0; i < props.amountPage; i++) {
        item.push(<li className="page-item" key= {i+1}><a className="page-link" href="#">{i+1}</a></li>);
    }
    return (
        <nav aria-label="Page navigation example" style={{ marginTop: '50px', }}>
            <ul className="pagination justify-content-center" style={{ marginLeft: '70%', }}>
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {item}
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
   
}

export default Pagination;