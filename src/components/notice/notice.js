import React, {useRef} from "react";
import {useSelector} from "react-redux";

const Notice = ()=>{
    const message = useSelector(status=>status.user.error.message)
    const flag = useSelector(status=>status.user.error.flag)

    let classesControl = "alert alert-danger alert-dismissible fade "
    if (flag)
        classesControl+="show"
    return (
        <div className={classesControl} >
            <strong>{message}</strong>
        </div>
    )
}

export default Notice