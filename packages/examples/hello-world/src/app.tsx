import React from "react";
import ReactDOM from "react-dom";

import { Test } from "./test";

const App = () => {
    return (
        <div>
            Hello World!
            <Test />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
