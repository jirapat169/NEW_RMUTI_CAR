import React from "react";

const Guard = (props) => {
  const AllowPath = ["signin", "register"];
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
  }, []);

  if (loading)
    return (
      <React.Fragment>
        {(() => {
          if (
            AllowPath.indexOf(
              `${window.location.pathname.replace(/\//g, "")}`
            ) != -1
          ) {
            return <>{props.children}</>;
          } else {
            if (props.isLogin) {
              return <>{props.children}</>;
            } else {
              return (
                <>
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>

                  {(() => {
                    window.location.replace("/signin");
                  })()}
                </>
              );
            }
          }
        })()}
      </React.Fragment>
    );
  else
    return (
      <React.Fragment>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </React.Fragment>
    );
};

export default Guard;
