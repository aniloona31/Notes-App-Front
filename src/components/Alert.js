import React from 'react'

function Alert(props) {
    console.log(props);
    return (
        <div>
            {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
                {props.alert.msg}
            </div>
            }
        </div>
    )
}

export default Alert
