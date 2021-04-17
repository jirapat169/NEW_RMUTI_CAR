import React from "react";
import Dashboard from "../../../components/Dashboard";
import FormCar from "./formCar";

const DriverManage = (props) => {
  const [stateCar, setStateCar] = React.useState(false);
  const [detailCar, setDetailCar] = React.useState({ select: "" });

  return (
    <React.Fragment>
      <Dashboard {...props}>
        <div className="box-padding">
          <div className="row">
            <div className="col-9 mb-3">
              <h2>รายการพนักงานขับยานพาหนะ</h2>
            </div>
            <div className="col-3 mb-3">
              <div className="text-right">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-toggle="modal"
                  data-target="#formCarModal"
                  onClick={() => {
                    setStateCar(true);
                    setDetailCar({ select: "" });
                  }}
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
                      <div className="text-center" style={{ overflow: "auto" }}>
                        <img src={"/wave110i.png"} width={"200px"} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h5>
                        <b>ชื่อ</b> : นายจิรพัฒน์ สุคนธพงศ์
                      </h5>
                      <h5>
                        <b>อีเมล์</b> : jirapat.sk@rmuti.ac.th
                      </h5>
                      <h5>
                        <b>เบอร์โทรศัพท์</b> : 0981966915
                      </h5>
                    </div>
                  </div>

                  <div className="text-center mt-2">
                    <button
                      type="button"
                      className="btn btn-warning mr-3"
                      data-toggle="modal"
                      data-target="#formCarModal"
                      onClick={() => {
                        setStateCar(false);
                        setDetailCar({ select: "hello" });
                      }}
                    >
                      แก้ไข
                    </button>
                    <button type="button" className="btn btn-danger ml-3">
                      ลบ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FormCar
          {...props}
          onInsertCar={stateCar}
          detailCar={detailCar}
        ></FormCar>
      </Dashboard>
    </React.Fragment>
  );
};

export default DriverManage;
