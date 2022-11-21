const {Schema,model} = require("mongoose");

const userSchema = new Schema ({
    nombre:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    contra:{
        type: String,
        required: true
    },
});


module.exports = model('usuarios', userSchema);