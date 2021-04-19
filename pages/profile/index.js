import React from "react";
import { useRouter } from "next/router";
import Dashboard from "../../components/Dashboard";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const Profile = (props) => {
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm(props.userLogin);

  const onSubmit = (data) => {
    let tmp = {
      ...props.userLogin,
      ...data,
      insertStatus: false,
      myrole: props.userLogin.myrole,
    };
    // console.log(tmp);

    axios
      .post(`${props.env.api_url}user/registermanual`, JSON.stringify(tmp))
      .then((value) => {
        console.log(value.data);
        if (value.data.success) {
          props.patchUserLogin(tmp);
          alert("บันทึกข้อมูลสำเร็จ");
        } else {
          alert("หมายเลขประจำตัวประชาชนหรืออีเมล์ถูกใช้งานแล้ว");
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  React.useEffect(() => {
    reset(props.userLogin);
    // router.replace("/home");
  }, []);

  return (
    <Dashboard {...props}>
      <div className="box-padding">
        <div className="row">
          <div className="col-9 mb-3">
            <h2>จัดการข้อมูลส่วนตัว</h2>
          </div>
          <div className="col-3 mb-3">
            <div className="text-right"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="row">
            <div className="col-lg-6">
              {/* {(() => {
              if (`${driverImg}`.length > 0) {
                return (
                  <div className="text-center" style={{ overflow: "auto" }}>
                    <img src={driverImg} width={"200px"} />
                  </div>
                );
              }
            })()}

            <div className="text-center mt-3 mb-2">
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
                defaultValue={props.userLogin.username}
                render={({ field, value, onChange }) => (
                  <TextField
                    {...field}
                    label="ชื่อผู้ใช้งาน"
                    onChange={onChange}
                    value={value}
                    margin="normal"
                    required
                    fullWidth
                    disabled={true}
                  />
                )}
              />

              <Controller
                control={control}
                name="prename"
                defaultValue={props.userLogin.prename}
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
                defaultValue={props.userLogin.firstname}
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
                defaultValue={props.userLogin.lastname}
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
            </div>
            <div className="col-lg-6">
              <Controller
                control={control}
                name="email"
                defaultValue={props.userLogin.email}
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

              <Controller
                control={control}
                name="personal_id"
                defaultValue={props.userLogin.personal_id}
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
                defaultValue={props.userLogin.phone_number}
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
                defaultValue={props.userLogin.position}
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
            </div>
          </div>

          <div className="mt-3 text-center">
            <button type="submit" className="btn btn-primary ">
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default Profile;
