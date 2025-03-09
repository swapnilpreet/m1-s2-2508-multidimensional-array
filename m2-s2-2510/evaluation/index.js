// console.log("Starting")
// Q: 1
// Problem Statement 1: Order Processing System

function createOrderManager() {
  let orderList = [];
  return {
    addOrder: function (order) {
      orderList.push(order);
    },
    updateOrder: function (id, newStatus) {
      let findOrder = orderList.filter((order) => order.id === id);
        //  console.log("findOrder",findOrder);
        if(findOrder.id === id){
            findOrder.status=newStatus;
        }
        // console.log(orderList);
    },
    filterOrders: function (status) {
        let findOrderbystatus = orderList.filter((order) => order.status === status);
        return findOrderbystatus;
    },
    sortOrders: function (by) {
        let sortOrder=[...orderList];
        // console.log("orderList",orderList);
        if(by==="status") {
         return sortOrder.sort((a,b)=> a.status.localeCompare(b.status));
        }else{
         return sortOrder.sort((a,b)=> a.createdAt - b.createdAt);
        }

    },
    getTotalRevenue:function() {
        let orderSummary =orderList.reduce((acc,curr)=> {
            let currTotal = curr.items.reduce((acc,ncurr)=>acc+(ncurr.price*ncurr.quantity),0);
            // // console.log(ncurr)
            // console.log(currTotal)
            return acc+currTotal;
        },0);
        console.log(orderSummary)
    },
    exportOrders: function () {
        let JSONS=JSON.stringify(orderList);
        return JSONS
    },
  };
}

const manager = createOrderManager();
manager.addOrder({
  id: 1,
  customerName: "Alice",
  items: [{ name: "Laptop", price: 1000, quantity: 1 }],
  status: "pending",
  createdAt: new Date("2024-03-01"),
});
manager.addOrder({
  id: 2,
  customerName: "Bob",
  items: [{ name: "Phone", price: 500, quantity: 2 }],
  status: "shipped",
  createdAt: new Date("2024-03-02"),
});
// manager.updateOrder(2,"pending");
// manager.filterOrders("shipped")
// console.log(manager.sortOrders('date'))
// console.log(manager.aexportorders())
// manager.getTotalRevenue();
console.log(manager.filterOrders("pending"));



// Q: 2
// Problem Statement 2: Advanced Function Registry System

function createFunctionRegistry() {
    let thelegistry ={};

    return{
        registerFunction:function(name, callbackfn){
            thelegistry[name]=name;
            thelegistry[name]=callbackfn;
            // console.log("Registry",thelegistry)
        },
        executeFunction:function(name, args, context = null) {
           return  thelegistry[name].apply(context, args)
        },
        mapFunction:function(name, dataArray){
            return dataArray.map((ele)=>thelegistry[name].call(null, ele))
        },
        executeFunctionAsync:function(name, args, delay){
            let promise = new Promise((resolve,reject) =>{
                setTimeout(()=>{
                    resolve(thelegistry[name].apply(null, args))
                },delay)
            })
            // console.log(promise)
            return promise;
        }

    }
}

const registry = createFunctionRegistry();
registry.registerFunction("double", x => x * 2);
console.log(registry.executeFunction("double", [5]));
// console.log(registry.mapFunction("double", [5,2,3,4]));
registry.executeFunctionAsync("double", [4], 2000).then(console.log);