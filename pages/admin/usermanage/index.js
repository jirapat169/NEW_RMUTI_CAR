import React from "react";
import { useRouter } from "next/router";
import Dashboard from "../../../components/Dashboard";
import axios from "axios";
import FormCar from "./formCar";

const userKey = [
  {
    role: "1",
    text: "ผู้ดูแลระบบ / เจ้าหน้าที่",
  },
  {
    role: "2",
    text: "ผู้อำนวยการกองกลาง",
  },
  {
    role: "3",
    text: "ผู้มีอำนาจสั่งใช้ยานพาหนะ",
  },
  {
    role: "5",
    text: "พนักงานขับยานพาหนะ",
  },
  {
    role: "4",
    text: "ผู้ใช้งาน",
  },
];
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

const User = (props) => {
  const router = useRouter();
  const [roleSelect, setRoleSelect] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [listUsers, setListUsers] = React.useState([]);
  const [detailCar, setDetailCar] = React.useState(defaultDriver);

  const onChangeRole = (role) => {
    setUsers(listUsers.filter((e) => `${e.myrole}` == `${role}`));
  };

  const getUsers = () => {
    axios
      .post(`${props.env.api_url}user/get`)
      .then(async (val) => {
        if (val.data.result.rowCount > 0) {
          await setListUsers([...val.data.result.result]);
          onChangeRole(roleSelect);
        } else {
          setUsers([]);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  React.useEffect(() => {
    // router.replace("/home");
    getUsers();
  }, []);

  return (
    <Dashboard {...props}>
      <div className="box-padding">
        <div className="row">
          <div className="col-9 mb-3">
            <h2>รายการข้อมูลผู้ใช้ในระบบ</h2>
          </div>
          <div className="col-3 mb-3">
            <div className="text-right">
              <select
                className="custom-select"
                value={roleSelect}
                onChange={(e) => {
                  setRoleSelect(e.target.value);
                  onChangeRole(e.target.value);
                }}
              >
                <option value={""}>เลือกประเภทผู้ใช้งาน</option>
                {userKey.map((e, i) => {
                  return (
                    <option key={i} value={e.role}>
                      {e.text}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th scope="col">ชื่อผู้ใช้งาน</th>
              <th scope="col">ชื่อ - สกุล</th>
              <th scope="col">ตำแหน่ง</th>
              <th scope="col">อีเมล์</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{e.username}</td>
                  <td>
                    {e.prename}
                    {e.firstname} {e.lastname}
                  </td>
                  <td>{e.position}</td>
                  <td>{e.email}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning btn-sm mr-2"
                      data-toggle="modal"
                      data-target="#formCarModal"
                      onClick={() => {
                        setDetailCar(e);
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    {/* <button
                      type="button"
                      className="btn btn-danger btn-sm ml-2"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <FormCar
        {...props}
        onInsertCar={false}
        detailCar={detailCar}
        getDriver={getUsers}
      ></FormCar>
    </Dashboard>
  );
};

export default User;
