import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const FormRequest = (props) => {
  // console.log("props -> ", props);
  const lsST = props.onInsertRequest
    ? ""
    : `${props.defaultValue.list_student}`.split(",");

  const lsTA = props.onInsertRequest
    ? ""
    : `${props.defaultValue.list_teacher}`.split(",");

  const { control, handleSubmit, reset } = useForm(props.defaultValue);
  const [defaultValue, setDefaultValue] = React.useState(props.defaultValue);

  const [listTeacher, setListTeacher] = React.useState(
    props.onInsertRequest ? [] : lsTA.map((e, i) => i)
  );
  const [listStudent, setListStudent] = React.useState(
    props.onInsertRequest ? [] : lsST.map((e, i) => i)
  );
  const [counterTeacher, setCounterTeacher] = React.useState(lsTA.length);
  const [counterStudent, setCounterStudent] = React.useState(lsST.length);

  const onSubmit = (data) => {
    let tmp = {
      id: props.onInsertRequest ? "" : props.defaultValue.id,
      insertStatus: props.onInsertRequest,
      list_student: data.list_student ? [...data.list_student].join() : "",
      list_teacher: data.list_teacher ? [...data.list_teacher].join() : "",
      username: props.userLogin.username,
    };
    data = { ...data, ...tmp };

    axios
      .post(`${props.env.api_url}requestcar/request`, JSON.stringify(data))
      .then((val) => {
        // console.log(val.data);
        props.getRequest();
        window.$(`#formCarModal`).modal("hide");
      })
      .catch((reason) => {
        console.log(reason);
      });

    console.log(data);
  };

  React.useEffect(() => {
    setDefaultValue(props.defaultValue);
    setListTeacher(props.onInsertRequest ? [] : lsTA.map((e, i) => i));
    setListStudent(props.onInsertRequest ? [] : lsST.map((e, i) => i));
    setCounterTeacher(lsTA.length);
    setCounterStudent(lsST.length);
    reset({
      ...props.defaultValue,
      list_student: props.onInsertRequest
        ? ""
        : `${props.defaultValue.list_student}`.split(","),
      list_teacher: props.onInsertRequest
        ? ""
        : `${props.defaultValue.list_teacher}`.split(","),
    });
  }, [props.defaultValue]);

  return (
    <React.Fragment>
      <div
        className="modal fade"
        id="formCarModal"
        tabIndex="-1"
        aria-labelledby="formCarModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="formCarModalLabel">
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
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <Controller
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="จุดประสงค์ในการขอใช้ยานพาหนะ"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                      control={control}
                      name="reason"
                      defaultValue={defaultValue.reason}
                    />

                    <Controller
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="สถานที่"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                      control={control}
                      name="location"
                      defaultValue={defaultValue.location}
                    />

                    <Controller
                      render={({ field, value, onChange }) => (
                        <TextField
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          {...field}
                          label="วันที่ต้องการใช้ยานพาหนะ"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                      control={control}
                      name="date_start"
                      defaultValue={defaultValue.date_start}
                    />

                    <Controller
                      render={({ field, value, onChange }) => (
                        <TextField
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          {...field}
                          label="วันที่นำยานพาหนะส่งคืน"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                      control={control}
                      name="date_end"
                      defaultValue={defaultValue.date_end}
                    />

                    <Controller
                      render={({ field, value, onChange }) => (
                        <TextField
                          id="time"
                          label="เวลานำยานพาหนะออกใช้งาน"
                          type="time"
                          onChange={onChange}
                          value={value}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                          margin="normal"
                          {...field}
                          required
                          fullWidth
                        />
                      )}
                      control={control}
                      name="car_start"
                      defaultValue={defaultValue.car_start}
                    />

                    <Controller
                      render={({ field, value, onChange }) => (
                        <TextField
                          id="time"
                          label="เวลานำยานพาหนะส่งคืน"
                          type="time"
                          onChange={onChange}
                          value={value}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                          margin="normal"
                          {...field}
                          required
                          fullWidth
                        />
                      )}
                      control={control}
                      name="car_end"
                      defaultValue={defaultValue.car_end}
                    />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <table className="table table-sm table-borderless">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "100%" }}>
                            รายชื่ออาจารย์หรือเจ้าหน้าที่
                          </th>
                          <th scope="col">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                setListTeacher((prevIndexes) => [
                                  ...prevIndexes,
                                  counterTeacher,
                                ]);
                                setCounterTeacher(
                                  (prevCounter) => prevCounter + 1
                                );
                              }}
                            >
                              เพิ่ม
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {listTeacher.map((index) => {
                          const fieldName = `list_teacher[${index}]`;
                          return (
                            <tr key={index}>
                              <td>
                                <Controller
                                  render={({ field, value, onChange }) => (
                                    <input
                                      {...field}
                                      type="text"
                                      className="form-control"
                                      onChange={onChange}
                                      value={value}
                                      required
                                    ></input>
                                  )}
                                  control={control}
                                  name={fieldName}
                                  defaultValue={""}
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() => {
                                    setListTeacher((prevIndexes) => [
                                      ...prevIndexes.filter(
                                        (item) => item !== index
                                      ),
                                    ]);
                                    setCounterTeacher(
                                      (prevCounter) => prevCounter - 1
                                    );
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

                    <table className="table table-sm table-borderless">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "100%" }}>
                            รายชื่อนักศึกษา
                          </th>
                          <th scope="col">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                setListStudent((prevIndexes) => [
                                  ...prevIndexes,
                                  counterStudent,
                                ]);
                                setCounterStudent(
                                  (prevCounter) => prevCounter + 1
                                );
                              }}
                            >
                              เพิ่ม
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {listStudent.map((index) => {
                          const fieldName = `list_student[${index}]`;
                          return (
                            <tr key={index}>
                              <td>
                                <Controller
                                  render={({ field, value, onChange }) => (
                                    <input
                                      {...field}
                                      type="text"
                                      className="form-control"
                                      onChange={onChange}
                                      value={value}
                                      required
                                    ></input>
                                  )}
                                  control={control}
                                  name={fieldName}
                                  defaultValue={""}
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() => {
                                    setListStudent((prevIndexes) => [
                                      ...prevIndexes.filter(
                                        (item) => item !== index
                                      ),
                                    ]);
                                    setCounterStudent(
                                      (prevCounter) => prevCounter - 1
                                    );
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
                </div>
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
    </React.Fragment>
  );
};

export default FormRequest;