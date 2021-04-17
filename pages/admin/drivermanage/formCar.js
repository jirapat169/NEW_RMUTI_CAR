import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

const FormCar = (props) => {
  // console.log("props -> ", props.detailCar);
  const { control, handleSubmit, reset } = useForm(props.detailCar);
  const [defaultValue, setDefaultValue] = React.useState(props.detailCar);

  const onSubmit = (data) => {
    console.log(data);
  };

  React.useEffect(() => {
    setDefaultValue(props.detailCar);
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
          <div className="modal-dialog">
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
                <Controller
                  render={({ field, value, onChange }) => (
                    <TextField
                      {...field}
                      label="Standard"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                  control={control}
                  name="select"
                  defaultValue={defaultValue.select}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
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
