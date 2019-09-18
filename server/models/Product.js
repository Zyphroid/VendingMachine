const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: String,
    count: String,
    code: String,
    price: String,
    productCode: String,
    image: String,
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
});

mongoose.model('products', productSchema);