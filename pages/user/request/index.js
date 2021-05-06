import React from "react";
import { useRouter } from "next/router";
import Dashboard from "../../../components/Dashboard";
import FormRequest from "./formRequest";
import axios from "axios";

const defaultRequest = {
  id: "",
  reason: "",
  location: "",
  list_teacher: "",
  list_student: "",
  date_start: "",
  date_end: "",
  car_start: "",
  car_end: "",
  timestamp: "",
  username: "",
  doc1: "",
  doc2: "",
  count_people: "",
};

const Admin = (props) => {
  const router = useRouter();
  const [stateRequest, setRequest] = React.useState(true);
  const [detail, setDetail] = React.useState({ ...defaultRequest });

  const [request, setListRequest] = React.useState([]);
  const [viewDetail, setViewDetail] = React.useState(null);

  const getRequest = () => {
    axios
      .post(
        `${props.env.api_url}requestcar/getmyrequest`,
        JSON.stringify({ username: props.userLogin.username })
      )
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

  return (
    <Dashboard {...props}>
      <div className="box-padding">
        <div className="row">
          <div className="col-9 mb-3">
            <h2>รายการขอใช้ยานพาหนะ</h2>
          </div>
          <div className="col-3 mb-3">
            <div className="text-right">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                data-toggle="modal"
                data-target="#formCarModal"
                onClick={() => {
                  setRequest(true);
                  setDetail({ ...defaultRequest });
                }}
              >
                เพิ่มข้อมูล
              </button>
            </div>
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
                      className="btn btn-warning btn-sm mr-2 ml-2"
                      data-toggle="modal"
                      data-target="#formCarModal"
                      disabled={
                        e.mystep == "3" || e.mystep == "4" || e.mystep == "5"
                      }
                      onClick={() => {
                        setRequest(false);
                        setDetail({ ...e });
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger btn-sm ml-2"
                      onClick={() => {
                        if (confirm("ยืนยันการลบข้อมูล")) {
                          axios
                            .post(
                              `${props.env.api_url}requestcar/delrequest`,
                              JSON.stringify({ id: e.id })
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
                      disabled={
                        e.mystep == "3" || e.mystep == "4" || e.mystep == "5"
                      }
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
            <div className="modal-body">
              {(() => {
                if (viewDetail) {
                  return (
                    <>
                      <h6>
                        <b>เหตุผลการขอใช้ยานพาหนะ : </b>
                        {viewDetail.reason}
                      </h6>
                      <h6>
                        <b>สถานที่ : </b>
                        {viewDetail.location}
                      </h6>
                      <h6>
                        <b>จำนวนผู้ร่วมเดินทาง : </b>
                        {viewDetail.count_people}
                      </h6>
                      <h6>
                        <b>อาจารย์/เจ้าหน้าที่ : </b>
                        <ol style={{ margin: "unset" }}>
                          {`${viewDetail.list_teacher}`
                            .split(",")
                            .map((e, i) => {
                              return <li key={i}>{e}</li>;
                            })}
                        </ol>
                      </h6>
                      <h6>
                        <b>นักศึกษา : </b>
                        <ol style={{ margin: "unset" }}>
                          {`${viewDetail.list_student}`
                            .split(",")
                            .map((e, i) => {
                              return <li key={i}>{e}</li>;
                            })}
                        </ol>
                      </h6>
                      <h6>
                        <b>ระหว่างวันที่ : </b>
                        {viewDetail.date_start} ถึง {viewDetail.date_end}
                      </h6>
                      <h6>
                        <b>เวลาออกรถ : </b>
                        {viewDetail.car_start}
                      </h6>
                      <h6>
                        <b>เวลากลับ : </b>
                        {viewDetail.car_end}
                      </h6>
                      <div className={"mb-3 mt-3"}>
                        {(() => {
                          if (`${viewDetail.doc1}`.length > 0) {
                            return (
                              <a
                                href={viewDetail.doc1}
                                download="เอกสารอนุมัติไปราชการ.pdf"
                              >
                                <i className="fas fa-file-powerpoint"></i>{" "}
                                เอกสารอนุมัติไปราชการ
                              </a>
                            );
                          } else {
                            return (
                              <b className="text-danger">
                                ไม่พบเอกสารอนุมัติไปราชการ
                              </b>
                            );
                          }
                        })()}
                      </div>
                      <div>
                        {(() => {
                          if (`${viewDetail.doc2}`.length > 0) {
                            return (
                              <a
                                href={viewDetail.doc2}
                                download="เอกสารอนุญาติให้ใช้ยานพาหนะ.pdf"
                              >
                                <i className="fas fa-file-powerpoint"></i>{" "}
                                เอกสารอนุญาติให้ใช้ยานพาหนะ
                              </a>
                            );
                          } else {
                            return (
                              <b className="text-danger">
                                ไม่พบเอกสารอนุญาติให้ใช้ยานพาหนะ
                              </b>
                            );
                          }
                        })()}
                      </div>
                    </>
                  );
                }
              })()}
            </div>
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
      <FormRequest
        defaultValue={detail}
        onInsertRequest={stateRequest}
        getRequest={getRequest}
        {...props}
      ></FormRequest>
    </Dashboard>
  );
};

export default Admin;
