class baseModel{
    constructor(data,message){
        if(typeof data === 'String'){
            this.message = data
            data = null
            message = null
        }
        if(data){
            this.data = data
        }
        if(message){
            this.message = message
        }
    }
}

class SuccessModel extends baseModel{
    constructor(data,message){
        super(data,message)
        this.rspCode = 0;
    }
}

class ErrorModel extends baseModel{
    constructor(data,message){
        super(data,message)
        this.rspCode = -1;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}