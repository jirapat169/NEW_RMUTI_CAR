import React from "react";
import Dashboard from "../../../components/Dashboard";
import FormCar from "./formCar";

const defaultDetail = {
  id: "",
  img: "",
  brand: "",
  model: "",
  vehicle_type: "",
  color: "",
  oil_type: "",
  registration_number: "",
  year_buy: "",
  delete_at: "",
};

const CarManage = (props) => {
  const [stateCar, setStateCar] = React.useState(false);
  const [detailCar, setDetailCar] = React.useState({ ...defaultDetail });

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
                  onClick={() => {
                    setStateCar(true);
                    setDetailCar({ ...defaultDetail });
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

                  <div className="text-center mt-2">
                    <button
                      type="button"
                      className="btn btn-warning mr-3"
                      data-toggle="modal"
                      data-target="#formCarModal"
                      onClick={() => {
                        setStateCar(false);
                        setDetailCar({ brand: "hello" });
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

export default CarManage;
