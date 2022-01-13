"use strict"

const uniqueMessage = error => {
    let output;
    try {
        let fieldName = error.message.split(".$")[1];
        field = field.split(" dup key")[0];
        field = field.subString(0, field.lastIndexOf("_"));
        req.flash("errors",[{
            msg: "An account with this " + field + "already exists"
        }]);
        ouput = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + " already exists";
    } catch(ex) {
        output = "already exists";
    }

    return output;
}

const errorHandler = error => {
    let message = "";
    if(error.code) {
        switch(error) {
            case 11000:
            case 11001:
                message = uniqueMessage(error);
                break;
            default: 
                message = "Something went wrong!"; 

        }
    } else {
        for(let errorName in error.errorors) {
            if(error.errorors[errorName].message) {
                message = error.message[errorName].message;
            }
        }
    }
    return message;
}

export default errorHandler;