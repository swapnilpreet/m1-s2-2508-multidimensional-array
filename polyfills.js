
// Polyfills:
    // a pollyfills piease of code that implementes morder funcitionality on order browser or environment that do not natively support it
    
    

    // Array method 


// filter:

    if(!Array.prototype.filter){
        Array.prototype.filter=function (callback,thisarg){
            if(this===null){
                throw new Error("this is null anf undefiend");
            }
            if(this.length===0){
                throw new TypeError("Array is empty");
            }
            if(typeof callback !== "function"){
                throw new TypeError(callback+'this is not fn')
            }

            let ans=[];
            for(let i=0;i,this.length;i++){
                if(i in this && callback.call(thisarg,this[i],i,this)){
                    ans.push(this[i])
                }
            }
            return ans;
        }
    }

    let number =[];
    console.log("filter",number.filter((n)=>n>15));