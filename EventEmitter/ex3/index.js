const myEmitter = require('events');
const { v4: uuid } = require('uuid');
const id=uuid();
class Delivery extends myEmitter { 
    constructor(orderId) { 
        super();
        this.orderId = orderId;
    }
    startShipping() { 
        console.log(`shipping order no ${this.orderId}`);
        this.emit("statusChange", {orderId: this.orderId, status:"shipped"});
    }
    outForDelivery() { 
      console.log(`order no ${this.orderId} is out for delivery`);
        this.emit("statusChange", {orderId: this.orderId, status:"out_for_delivery"});  
    }
    delivered() { 
         console.log(`order no ${this.orderId} is delivered`);
        this.emit("statusChange", {orderId: this.orderId, status:"delivered"}); 
        this.removeAllListeners();
        console.log("all listeners removed"); 
    }
}
const delivery = new Delivery(id);

    console.log("starting delivery process");
delivery.on("shipped", (data) => {
    if (data.status === "shipped") {
        console.log(`[ UPDATE ] :order no ${data.orderId} has been shipped`);
    } else if (data.status === "out_for_delivery") {
        console.log(`[ UPDATE ] :order no ${data.orderId} is out for delivery`);

    } else {
        console.log(`[ UPDATE ] :order no ${data.orderId} has been delivered`);
    };
});
delivery.startShipping();
delivery.outForDelivery();
delivery.delivered();