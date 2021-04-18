import React from "react";
import { useRouter } from "next/router";

const Guard = (props) => {
  const AllowPath = ["signin", "register"];
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    // console.log(router.pathname);
    setLoading(true);
  }, []);

  if (loading)
    return (
      <React.Fragment>
        {(() => {
          if (
            AllowPath.indexOf(`${router.pathname.replace(/\//g, "")}`) != -1
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
                    router.replace("/signin");
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
