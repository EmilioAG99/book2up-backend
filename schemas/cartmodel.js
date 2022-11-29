const {Schema,model} = require("mongoose");


const cartSchema = new Schema ({
    username:{
        type: String,
        unique : true
    },
    compras:{
        type:[],
    }
});

module.exports = model('cart', cartSchema);