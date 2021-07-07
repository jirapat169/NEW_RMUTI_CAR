import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";

const userKey = [
  {
    role: "1",
    text: "ผู้ดูแลระบบ / เจ้าหน้าที่",
  },
  {
    role: "2",
    text: "ผู้อำนวยการกองกลาง (ในโคราช)",
  },
  {
    role: "3",
    text: "ผู้มีอำนาจสั่งใช้ยานพาหนะ",
  },
  {
    role: "7",
    text: "ผู้อำนวยการกองกลาง (นอกโคราช)",
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

const FormCar = (props) => {
  // console.log("props -> ", props.detailCar);
  const { control, handleSubmit, reset } = useForm(props.detailCar);
  const [defaultValue, setDefaultValue] = React.useState(props.detailCar);
  const [driverImg, setDriverImage] = React.useState("");

  const onSubmit = (data) => {
    let tmp = {
      ...data,
      insertStatus: props.onInsertCar,
    };
    console.log(tmp);

    axios
      .post(`${props.env.api_url}user/registermanual`, JSON.stringify(tmp))
      .then((value) => {
        console.log(value.data);
        if (value.data.success) {
          props.getDriver();
          window.$(`#formCarModal`).modal("hide");
          window.location.reload();
        } else {
          alert("ชื่อผู้ใช้งาน หรือ หมายเลขบัตรประชาชน ถูกใช้งานแล้ว");
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  React.useEffect(() => {
    setDefaultValue(props.detailCar);
    reset(props.detailCar);
    setDriverImage(props.detailCar.img);
  }, [props.detailCar]);

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
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="formCarModalLabel">
                  ข้อมูล
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
                  <div className="col-lg-6">
                    {/* {(() => {
                      if (`${driverImg}`.length > 0) {
                        return (
                          <div
                            className="text-center"
                            style={{ overflow: "auto" }}
                          >
                            <img src={driverImg} width={"200px"} />
                          </div>
                        );
                      }
                    })()}

                    <div className="text-center">
                      <input
                        type="file"
                        id="carImgSelect"
                        accept="image/*"
                        onChange={async (e) => {
                          e.preventDefault();
                          let tmp = [...e.target.files];
                          e.target.value = "";

                          const toBase64 = (file) =>
                            new Promise((resolve, reject) => {
                              const reader = new FileReader();
                              reader.readAsDataURL(file);
                              reader.onload = () => resolve(reader.result);
                              reader.onerror = (error) => reject(error);
                            });

                          let img = await toBase64(tmp[0]);

                          setDriverImage(img);
                        }}
                        style={{ display: "none" }}
                      />

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          document.getElementById("carImgSelect").click();
                        }}
                      >
                        เลือกรูปภาพ
                      </button>
                    </div> */}

                    <Controller
                      control={control}
                      name="username"
                      defaultValue={defaultValue.username}
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="ชื่อผู้ใช้งาน"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                          disabled={!props.onInsertCar}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="prename"
                      defaultValue={defaultValue.prename}
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="คำนำหน้า"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="firstname"
                      defaultValue={defaultValue.firstname}
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="ชื่อจริง"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="lastname"
                      defaultValue={defaultValue.lastname}
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="นามสกุล"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="email"
                      defaultValue={defaultValue.email}
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="อีเมล์"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                    />
                  </div>
                  <div className="col-lg-6">
                    <Controller
                      control={control}
                      name="personal_id"
                      defaultValue={defaultValue.personal_id}
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="หมายเลขประจำตัวประชาชน"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="phone_number"
                      defaultValue={defaultValue.phone_number}
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="หมายเลขโทรศัพท์"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="position"
                      defaultValue={defaultValue.position}
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="ตำแหน่ง"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="myrole"
                      defaultValue={defaultValue.myrole}
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
                          {userKey.map((e, i) => {
                            return (
                              <MenuItem value={e.role} key={i}>
                                {e.text}
                              </MenuItem>
                            );
                          })}
                        </TextField>
                      )}
                    />
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

export default FormCar;
