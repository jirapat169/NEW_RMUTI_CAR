import axios from "axios";
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
  seat_size: "",
};

const CarManage = (props) => {
  const [stateCar, setStateCar] = React.useState(false);
  const [detailCar, setDetailCar] = React.useState({ ...defaultDetail });
  const [listCar, setListCar] = React.useState([]);

  const getCar = () => {
    axios
      .post(`${props.env.api_url}carstock/getCarStock`)
      .then((value) => {
        if (value.data.result.rowCount > 0) {
          setListCar(value.data.result.result);
        } else {
          setListCar([]);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  React.useEffect(() => {
    getCar();
  }, []);

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
              {listCar.map((e, i) => {
                return (
                  <div className="card mb-3" key={i}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div
                            className="text-center"
                            style={{ overflow: "auto" }}
                          >
                            <img src={e.img} width={"200px"} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <h5>
                            <b>ยี่ห้อ</b> : {e.brand}
                          </h5>
                          <h5>
                            <b>รุ่น</b> : {e.model}
                          </h5>
                          <h5>
                            <b>ประเภทยานพาหนะ</b> : {e.vehicle_type}
                          </h5>
                          <h5>
                            <b>สี</b> : {e.color}
                          </h5>
                          <h5>
                            <b>ประเภทน้ำมัน</b> : {e.oil_type}
                          </h5>
                          <h5>
                            <b>หมายเลขทะเบียน</b> : {e.registration_number}
                          </h5>
                          <h5>
                            <b>ปีที่ซื้อ</b> : {e.year_buy}
                          </h5>
                          <h5>
                            <b>ขนาดที่นั่ง</b> : {e.seat_size}
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
                            setDetailCar({ ...e });
                          }}
                        >
                          แก้ไข
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger ml-3"
                          onClick={() => {
                            if (confirm("ยืนยันการลบข้อมูล")) {
                              axios
                                .post(
                                  `${props.env.api_url}carstock/delrequest`,
                                  JSON.stringify({ id: e.id })
                                )
                                .then((val) => {
                                  getCar();
                                })
                                .catch((reason) => {
                                  console.log(reason);
                                });
                            }
                          }}
                        >
                          ลบ
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <FormCar
          {...props}
          onInsertCar={stateCar}
          detailCar={detailCar}
          getCar={getCar}
        ></FormCar>
      </Dashboard>
    </React.Fragment>
  );
};

export default CarManage;
