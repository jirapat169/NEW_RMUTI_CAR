import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const FormCar = (props) => {
  // console.log("props -> ", props.detailCar.img);
  const { control, handleSubmit, reset } = useForm(props.detailCar);
  const [defaultValue, setDefaultValue] = React.useState(props.detailCar);
  const [carImg, setCarImage] = React.useState("");

  const onSubmit = (data) => {
    let tmp = {
      ...data,
      ...{
        img: carImg,
        id: props.detailCar.id,
        insertStatus: props.onInsertCar,
      },
    };

    axios
      .post(`${props.env.api_url}carstock/request`, JSON.stringify(tmp))
      .then((value) => {
        console.log(value.data);
        props.getCar();
        window.$(`#formCarModal`).modal("hide");
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  React.useEffect(() => {
    setDefaultValue(props.detailCar);
    setCarImage(props.detailCar.img);
    reset(props.detailCar);
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
                    {(() => {
                      if (`${carImg}`.length > 0) {
                        return (
                          <div
                            className="text-center"
                            style={{ overflow: "auto" }}
                          >
                            <img src={carImg} width={"200px"} />
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

                          setCarImage(img);
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
                    </div>

                    <Controller
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="ยี่ห้อ"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                      control={control}
                      name="brand"
                      defaultValue={defaultValue.brand}
                    />

                    <Controller
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="รุ่น"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                      control={control}
                      name="model"
                      defaultValue={defaultValue.model}
                    />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <Controller
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="ประเภทยานพาหนะ"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                      control={control}
                      name="vehicle_type"
                      defaultValue={defaultValue.vehicle_type}
                    />

                    <Controller
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="สี"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                      control={control}
                      name="color"
                      defaultValue={defaultValue.color}
                    />

                    <Controller
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="ประเภทน้ำมัน"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                      control={control}
                      name="oil_type"
                      defaultValue={defaultValue.oil_type}
                    />

                    <Controller
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="หมายเลขทะเบียน"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                      control={control}
                      name="registration_number"
                      defaultValue={defaultValue.registration_number}
                    />

                    <Controller
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="ปีที่ซื้อ"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                        />
                      )}
                      control={control}
                      name="year_buy"
                      defaultValue={defaultValue.year_buy}
                    />

                    <Controller
                      render={({ field, value, onChange }) => (
                        <TextField
                          {...field}
                          label="ขนาดที่นั่ง"
                          onChange={onChange}
                          value={value}
                          margin="normal"
                          required
                          fullWidth
                          type="number"
                        />
                      )}
                      control={control}
                      name="seat_size"
                      defaultValue={defaultValue.seat_size}
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
