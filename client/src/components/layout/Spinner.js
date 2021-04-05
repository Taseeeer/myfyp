import React, { Fragment } from "react";
import spinner from "../../img/45.gif";

export default () => (
    <Fragment>
        <img
            src={spinner}
            style={{width: "150px", margin: "auto", display: "block"}}
            alt="Loaidng"
        />
    </Fragment>
);