import React from 'react';
function MainFeature(props) {
  return (
      <section className="feature-area section_gap_bottom_custom">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="single-feature">
                <div className="title">
                  <i className="flaticon-money"></i>
                  <h3>Mua nhiều giảm nhiều</h3>
                </div>
                <p>Giảm giá lên tận 50%</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-feature">
                <div className="title">
                  <i className="flaticon-truck"></i>
                  <h3>Miễn phí vận chuyển</h3>
                </div>
                <p>Phạm vi trong khoảng 5km</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-feature">
                <div className="title">
                  <i className="flaticon-support"></i>
                  <h3>Sẵn sàng hỗ trợ</h3>
                </div>
                <p>Chỉ cần liên hệ với chúng tôi</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-feature">
                <div className="title">
                  <i className="flaticon-blockchain"></i>
                  <h3>An toàn thanh toán</h3>
                </div>
                <p>Các cổng thanh toán uy tín</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default MainFeature;