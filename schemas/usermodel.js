const {Schema,model} = require("mongoose");

const userSchema = new Schema ({
    nombre:{
        type: String,
        required: true
    },
    apellidos:{
        type: String,
        required: true
    },
    mail:{
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
    codigo_postal:{
        type: String,
        required: true
    },
    pais:{
        type: String,
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    municipio:{
        type: String,
        required: true
    },
    colonia:{
        type: String,
        required: true
    },
    tarjeta:{
        type: String,
        required: true
    },
    expiryMonth:{
        type: String,
        required: true
    },
    expiryYear:{
        type: String,
        required: true
    },
    cvv:{
        type: String,
        required: true
    }
    
});


module.exports = model('usuarios', userSchema);