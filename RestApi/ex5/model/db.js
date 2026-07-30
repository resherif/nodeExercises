const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true 
    },
   
    refreshToken: {
        type: String
    },
    role: {
        type: String,
        default:'viewer'
    }
}, { timestamps: true }); 
const categoriesSchema = new mongoose.Schema({
    category_name: { type: String, required: true },
    parentCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        default:null
    }
})
const productsSchema = new mongoose.Schema({
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required:true
    },
    product_title: {
        type: String,
        required:true
    }
    ,
    price: {
        type:String,
        required:true
    },
    stock: {
        type: Number,
         default:0
    },
    desc: String,
   
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
},
   
)
 productsSchema.virtual('outOfStock').get(function() {
    return this.stock <= 0; 
 });
const ordersSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    },
    items: [
        {
            product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required:true
       },
       quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true 
            }
       }
    ],

        totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
},
    { timestamps: true }
)
const Users = mongoose.model('Users', usersSchema);
const Categories = mongoose.model('Categories', categoriesSchema);
const Products = mongoose.model('Products', productsSchema);
const Orders=mongoose.model('Orders',ordersSchema)
module.exports = {Products, Categories,Users,Orders}