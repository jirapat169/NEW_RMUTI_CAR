import React from "react";
import { useRouter } from "next/router";
import Dashboard from "../../components/Dashboard";
import axios from "axios";

const Index = (props) => {
  const router = useRouter();
  const [roleList, setRoleList] = React.useState([]);
  const [listUsers, setListUsers] = React.useState([]);

  const getRoles = () => {
    axios
      .post(
        `${props.env.api_url}user/getRoles`,
        JSON.stringify({ username: props.userLogin.username })
      )
      .then((val) => {
        console.log(val.data);
        if (val.data.rowCount > 0) {
          setRoleList([...val.data.result]);
        } else {
          setRoleList([]);
        }
      })
      .catch((reason) => {
        console.log(reason);
        alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
      });
  };

  const getUser = () => {
    axios
      .post(`${props.env.api_url}user/get`)
      .then(async (val) => {
        console.log(val.data);
        if (val.data.result.rowCount > 0) {
          setListUsers(
            [...val.data.result.result].filter(
              (e) =>
                e.username != props.userLogin.username &&
                e.myrole == "4" &&
                roleList.filter((ee) => ee.username == e.username).length == 0
            )
          );
        } else {
          setListUsers([]);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  React.useEffect(() => {
    getRoles();
  }, []);

  React.useEffect(() => {
    getUser();
  }, [roleList]);

  return (
    <Dashboard {...props}>
      <div className="box-padding">
        <div className="row">
          <div className="col-9 mb-3">
            <h2>รายการผู้อนุมัติแทน</h2>
          </div>
          <div className="col-3 mb-3">
            <div className="text-right">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                เพิ่มข้อมูล
              </button>
            </div>
          </div>
        </div>

        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">ชื่อผู้ใช้งาน</th>
              <th scope="col">ชื่อ - สกุล</th>
              <th scope="col">ตำแหน่ง</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {roleList.map((e, i) => {
              return (
                <tr key={i}>
                  <td style={{ verticalAlign: "middle" }}>{i + 1}</td>
                  <td style={{ verticalAlign: "middle" }}>{e.username}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    {e.prename}
                    {e.firstname} {e.lastname}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>{e.position}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        if (confirm("ยืนยันการลบข้อมูล")) {
                          axios
                            .post(
                              `${props.env.api_url}user/deleteRoles`,
                              JSON.stringify({
                                username: e.username,
                                role_username: e.role_username,
                              })
                            )
                            .then((val) => {
                              console.log(val.data);
                              if (val.data.isQuery) {
                                alert("ลบข้อมูลสำเร็จ");
                              }
                              getRoles();
                            })
                            .catch((reason) => {
                              console.log(reason);
                              alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
                            });
                        }
                      }}
                    >
                      ลบ
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
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                รายชื่อผู้ใช้งาน
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
              <table className="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">ชื่อผู้ใช้งาน</th>
                    <th scope="col">ชื่อ - สกุล</th>
                    <th scope="col">ตำแหน่ง</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {listUsers.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td style={{ verticalAlign: "middle" }}>{i + 1}</td>
                        <td style={{ verticalAlign: "middle" }}>
                          {e.username}
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          {e.prename}
                          {e.firstname} {e.lastname}
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          {e.position}
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                              if (confirm("ยืนยันการเพิ่มข้อมูล")) {
                                axios
                                  .post(
                                    `${props.env.api_url}user/addRoles`,
                                    JSON.stringify({
                                      username: e.username,
                                      role_username: props.userLogin.username,
                                      role: props.userLogin.myrole,
                                    })
                                  )
                                  .then((val) => {
                                    console.log(val.data);
                                    if (val.data.isQuery) {
                                      alert("เพิ่มข้อมูลสำเร็จ");
                                    }
                                    getRoles();
                                  })
                                  .catch((reason) => {
                                    console.log(reason);
                                    alert(
                                      "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้"
                                    );
                                  });
                              }
                            }}
                          >
                            เพิ่ม
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Index;
