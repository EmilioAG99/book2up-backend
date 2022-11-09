const {Schema,model} = require("mongoose");

const bookSchema = new Schema ({
    titulo:{
        type: String,
        required: true
    },
    autor:{
        type: String,
        required: true
    },
    sin:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    SKU:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    }
});


module.exports = model('books', bookSchema);