import React from "react";
import { useRouter } from "next/router";
import Dashboard from "../../../components/Dashboard";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const Admin = (props) => {
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm();

  const [stateRequest, setRequest] = React.useState(true);

  const [request, setListRequest] = React.useState([]);
  const [selectRequest, setSelectRequest] = React.useState({});
  const [listCD, setListCD] = React.useState({ car: [], driver: [] });
  const [viewDetail, setViewDetail] = React.useState(null);

  const getRequest = () => {
    axios
      .post(`${props.env.api_url}requestcar/getRequest`)
      .then((val) => {
        console.log(val.data);
        if (val.data.result.rowCount > 0) {
          setListRequest(val.data.result.result);
        } else {
          setListRequest([]);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  React.useEffect(() => {
    // router.replace("/home");
    getRequest();
    $("#exampleViewDetailModal").on("hide.bs.modal", (event) => {
      setViewDetail(null);
    });
  }, []);

  const onSubmit = (data) => {
    let tmp = {
      ...data,
      step: "1",
      insertStatus: true,
      car_step_username: props.userLogin.username,
      car_step_status: "1",
      car_step_reason: "no",
      id_request: selectRequest.id,
    };

    axios
      .post(`${props.env.api_url}requestcar/managestep`, JSON.stringify(tmp))
      .then((val) => {
        console.log(val.data);
        getRequest();
        window.$(`#exampleModal`).modal("hide");
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  return (
    <Dashboard {...props}>
      <div className="box-padding">
        <div className="row">
          <div className="col-9 mb-3">
            <h2>รายการขอใช้ยานพาหนะ</h2>
          </div>
          <div className="col-3 mb-3">
            <div className="text-right"></div>
          </div>
        </div>

        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th scope="col">วันที่ใช้รถ</th>
              <th scope="col">เหตุผล</th>
              <th scope="col">สถานที่</th>
              <th scope="col">สถานะ</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {request.map((e, i) => {
              return (
                <tr key={i}>
                  <td style={{ verticalAlign: "middle" }}>
                    {e.date_start} - {e.date_end}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>{e.reason} </td>
                  <td style={{ verticalAlign: "middle" }}>{e.location} </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {e.mystep == "0"
                      ? "รอการตรวจสอบจากเจ้าหน้าที่"
                      : e.mystep == "5"
                      ? "ยกเลิกการจอง"
                      : e.mystep == "1"
                      ? "รอการอนุมัติจากผู้อำนวยการกองกลาง"
                      : e.mystep == "2"
                      ? "รอการอนุมัติจากผู้มีอำนาจสั่งใช้ยานพาหนะ"
                      : e.mystep == "3"
                      ? "ผ่านอนุมัติ"
                      : e.mystep == "4"
                      ? "ส่งคืนยานพาหนะสำเร็จ"
                      : e.mystep}{" "}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <button
                      type="button"
                      className="btn btn-primary mr-2 btn-sm"
                      data-toggle="modal"
                      data-target="#exampleViewDetailModal"
                      onClick={() => {
                        setViewDetail(e);
                      }}
                    >
                      <i className="fas fa-search-plus"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-warning btn-sm ml-2 mr-2"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => {
                        setSelectRequest(e);
                        axios
                          .post(
                            `${props.env.api_url}carstock/getUsableCarNDriver`,
                            JSON.stringify({
                              date_start: e.date_start,
                              date_end: e.date_end,
                            })
                          )
                          .then((val) => {
                            console.log(val.data);
                            setListCD({
                              car: [...val.data.resultcar.result].filter(
                                (e) => e.delete_at == null
                              ),
                              driver: val.data.resultdriver.result,
                            });
                          })
                          .catch((reason) => {
                            console.log(reason);
                          });
                      }}
                    >
                      เลือกรถและคนขับ
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger btn-sm ml-2"
                      disabled={e.mystep == "5"}
                      onClick={() => {
                        let data = {
                          step: "1",
                          insertStatus: false,
                          id_request: e.id,
                          car_step_username: props.userLogin.username,
                          car_step_status: "0",
                          car_step_reason: "ยกเลิกการจอง",
                        };

                        // console.log(data);
                        if (confirm("ยืนยันการยกเลิก")) {
                          axios
                            .post(
                              `${props.env.api_url}requestcar/managestep`,
                              JSON.stringify(data)
                            )
                            .then((val) => {
                              console.log(val.data);
                              getRequest();
                            })
                            .catch((reason) => {
                              console.log(reason);
                            });
                        }
                      }}
                    >
                      ยกเลิกการขอใช้
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                จำนวนผู้โดยสาร{` ${selectRequest.count_people} `}คน
                <Controller
                  control={control}
                  name="car_detail_id_car"
                  defaultValue={""}
                  render={({ field, value, onChange }) => (
                    <TextField
                      {...field}
                      label="รายการรถที่ว่าง"
                      value={value}
                      select
                      onChange={onChange}
                      margin="normal"
                      required
                      fullWidth
                    >
                      <MenuItem value={""}>--- โปรดเลือก ---</MenuItem>
                      {listCD.car
                        .filter(
                          (ef) =>
                            parseInt(ef.seat_size) >=
                            parseInt(selectRequest.count_people)
                        )
                        .map((e, i) => {
                          return (
                            <MenuItem value={e.id} key={i}>
                              {e.brand} {e.model} จำนวน {e.seat_size} ที่นั่ง
                            </MenuItem>
                          );
                        })}
                    </TextField>
                  )}
                />
                <Controller
                  control={control}
                  name="car_detail_user_driver"
                  defaultValue={""}
                  render={({ field, value, onChange }) => (
                    <TextField
                      {...field}
                      label="รายชื่อคนขับที่ว่าง"
                      value={value}
                      select
                      onChange={onChange}
                      margin="normal"
                      required
                      fullWidth
                    >
                      <MenuItem value={""}>--- โปรดเลือก ---</MenuItem>
                      {listCD.driver.map((e, i) => {
                        return (
                          <MenuItem value={e.username} key={i}>
                            {e.prename}
                            {e.firstname} {e.lastname}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  )}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  ปิด
                </button>
                <button type="submit" className="btn btn-primary">
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div
        className="modal fade"
        id="exampleViewDetailModal"
        tabIndex="-1"
        aria-labelledby="exampleViewDetailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleViewDetailModalLabel">
                รายละเอียดการขอใช้ยานพาหนะ
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{JSON.stringify(viewDetail)}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Admin;
