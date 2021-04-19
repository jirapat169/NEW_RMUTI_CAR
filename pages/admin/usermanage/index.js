import React from "react";
import { useRouter } from "next/router";
import Dashboard from "../../../components/Dashboard";
import axios from "axios";

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

const User = (props) => {
  const router = useRouter();
  const [roleSelect, setRoleSelect] = React.useState("");
  const [users, setUsers] = React.useState([]);

  const getUsers = () => {
    axios
      .post(`${props.env.api_url}user/get`)
      .then((val) => {
        if (val.data.result.rowCount > 0) {
          setUsers([...val.data.result.result]);
        } else {
          setUsers([]);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  const onChangeRole = (role) => {
    console.log(role);
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
            <h2>รายการขอใช้ยานพาหนะ</h2>
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
      </div>
    </Dashboard>
  );
};

export default User;
