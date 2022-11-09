const {Schema,model} = require("mongoose");

let bookItem = new Schema ({
    SKU: {
        type: String
    },
    titulo: {
        type: String
    },
    cantidad: {
        type: Number
    },
    total: {
        type: Number
    }
})

const cartSchema = new Schema ({
    username:{
        type: String,
        unique : true
    },
    libros:[bookItem],
});

module.exports = model('cart', cartSchema);