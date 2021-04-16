import React from "react";
import Dashboard from "../../../components/Dashboard";
import FormCar from "./formCar";

const CarManage = (props) => {
  return (
    <React.Fragment>
      <Dashboard {...props}>
        <div className="box-padding">
          <div className="row">
            <div className="col-9 mb-3">
              <h2>รายการยานพาหนะ</h2>
            </div>
            <div className="col-3 mb-3">
              <div className="text-right">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-toggle="modal"
                  data-target="#formCarModal"
                >
                  เพิ่มข้อมูล
                </button>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img src={"/wave110i.png"} width={"100%"} />
                    </div>
                    <div className="col-md-6">
                      <h5>
                        <b>ยี่ห้อ</b> : Honda
                      </h5>
                      <h5>
                        <b>รุ่น</b> : Wave 110i
                      </h5>
                      <h5>
                        <b>ประเภทยานพาหนะ</b> : Wave 110i
                      </h5>
                      <h5>
                        <b>สี</b> : แดง
                      </h5>
                      <h5>
                        <b>ประเภทน้ำมัน</b> : เบนซิน
                      </h5>
                      <h5>
                        <b>หมายเลขทะเบียน</b> : 1กธ 473
                      </h5>
                      <h5>
                        <b>ปีที่ซื้อ</b> : 2543
                      </h5>
                      <h5>
                        <b>ขนาดที่นั่ง</b> : 2
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FormCar {...props}></FormCar>
      </Dashboard>
    </React.Fragment>
  );
};

export default CarManage;
