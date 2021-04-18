import React from "react";
import Dashboard from "../../../components/Dashboard";
import FormCar from "./formCar";
import axios from "axios";

const defaultDriver = {
  username: "",
  prename: "",
  firstname: "",
  lastname: "",
  email: "",
  img: "",
  myrole: "",
  password: "",
  personal_id: "",
  phone_number: "",
  position: "",
};

const DriverManage = (props) => {
  const [stateCar, setStateCar] = React.useState(false);
  const [detailCar, setDetailCar] = React.useState(defaultDriver);
  const [driver, setDriver] = React.useState([]);

  const getDriver = () => {
    axios
      .post(`${props.env.api_url}user/get`)
      .then((value) => {
        // console.log(value.data);
        if (value.data.result.rowCount > 0) {
          setDriver(
            [...value.data.result.result].filter((e) => e.myrole == "5")
          );
        } else {
          setDriver([]);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  React.useEffect(() => {
    getDriver();
  }, []);

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
                    setDetailCar(defaultDriver);
                  }}
                >
                  เพิ่มข้อมูล
                </button>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              {driver.map((e, i) => {
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
                            <b>ชื่อ</b> : {e.prename}
                            {e.firstname} {e.lastname}
                          </h5>
                          <h5>
                            <b>อีเมล์</b> : {e.email}
                          </h5>
                          <h5>
                            <b>เบอร์โทรศัพท์</b> : {e.phone_number}
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
                                  `${props.env.api_url}user/del`,
                                  JSON.stringify({ username: e.username })
                                )
                                .then((val) => {
                                  console.log(val.data);
                                  if (val.data.result.rowCount > 0) {
                                    getDriver();
                                  } else {
                                    alert(
                                      "ข้อมูลนี้กำลังถูกใช้งาน ไม่สามารถลบได้"
                                    );
                                  }
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
          getDriver={getDriver}
        ></FormCar>
      </Dashboard>
    </React.Fragment>
  );
};

export default DriverManage;
