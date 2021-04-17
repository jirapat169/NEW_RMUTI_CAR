import React from "react";
import { useRouter } from "next/router";
import Dashboard from "../../../components/Dashboard";
import FormRequest from "./formRequest";

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
};

const Admin = (props) => {
  const router = useRouter();
  const [stateRequest, setRequest] = React.useState(false);
  const [detail, setDetail] = React.useState({ ...defaultRequest });

  React.useEffect(() => {
    // router.replace("/home");
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

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Mark</td>
              <td>Mark</td>
              <td>Mark</td>
            </tr>
          </tbody>
        </table>
      </div>

      <FormRequest
        defaultValue={detail}
        onInsertRequest={stateRequest}
      ></FormRequest>
    </Dashboard>
  );
};

export default Admin;
