const Orders = require('../model/db').Orders;
const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.find();
        if (! orders) return res.status(404).json({
            message: "No Orders found!"
        });
        return res.status(200).json({
            message: 'All Orders retrieved successfully!',
            data:  orders
        });
    } catch (err) {
        return res.status(500).json({ message: " Internal server error! ", error: err.message });
    }
};
const getOrdersById = async (req, res) => { 
    try { 
         const { id } = req.body;
    const  Orders = await Orders.findById(id);
        if (! Orders) return res.status(404).json({ message: " Orders not found!" });
        return res.status(200).json({
            message: ' Orders retrived successfully!',
            data: Orders
        })
    }catch(err){
        return res.status(500).json({ message: " Internal server error! ", error: err.message });
    }
}
const editOrder= async (req, res) => { 
    try { 
        const { id } = req.params;
        const {  items} = req.body;

        const  order = await Orders.findByIdAndUpdate(
            id, 
            { $set: {items}},
            { new: true, runValidators: true } 
        );

        if (! order) {
            return res.status(404).json({ message: ' Orders not found' });
        }

        return res.status(200).json({
            message: " Orders updated successfully!",
            data:  order
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const createNewOrder = async (req, res) => { 
    try { 
        const { items } = req.body;

        const userId = req.user_id;
   if (!items || items.length === 0) {
            return res.status(400).json({ message: "Order items cannot be empty!" });
        }

        let totalOrderPrice = 0;
        const finalizedItems = [];
       for (const singleItem of items) {
            const product = await Books.findById(singleItem.productId);
            
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${singleItem.productId} not found` });
            }

            const itemTotalPrice = product.price * singleItem.quantity;
                        totalOrderPrice += itemTotalPrice;
            finalizedItems.push({
                productId: product._id,
                quantity: singleItem.quantity,
                price: product.price 
            });
        }
        const newOrder = await Orders.create({
            userId,
            items: finalizedItems,
            totalPrice: totalOrderPrice
        });

        return res.status(201).json({
            message: "Order created successfully!",
            order: newOrder
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
        
};
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Orders.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({ message: 'order not found' });
        }

        return res.status(200).json({
            message: "order deleted successfully!",
            data: order
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports = { getAllOrders, getOrdersById, editOrder, createNewOrder, deleteOrder };