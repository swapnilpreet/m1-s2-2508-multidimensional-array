// Q: 11
// Title: L0 - Convert to Arrow Function with Default Parameters

let multiply=(a,b)=> !a ? 1 : !b ? 1 : a+b
console.log(multiply(4,5))


// Q: 12
// Title:
// L0 - Square and Cube of a Number with Implicit Return


let squareCube=(a)=>{ 
    let obj={
        square:a*a, 
        cube:a*a*a
    }
    return obj
}

console.log(squareCube(5))


// Q: 13
// Title:
// L1 - Multi-Level Array and Object Destructuring

const people = [ 
    { name: "Alice", 
      address: { city: "New York", street: { name: "Broadway", number: 123 } }
    }, 
    { name: "Bob", address: { city: "Los Angeles", street: { name: "Sunset Boulevard", number: 456 } }
    }
 ];

 let result =[];

 for(let i in people) {
     const {name}=people[i];
     const {address:{city}}=people[i];
     const {address:{street}}=people[i];
     result.push(`${name} lives in ${city} on ${street.name}`);
 }

console.log(result);

// or
console.log(":new ans")
const ansnew = people.map(({name,address:{city,street:{name:streetName}}}) =>`${name} lives is ${city} on ${streetName}`);

console.log(ansnew);


// Q: 14
// Title:
// L1 - Merging and Updating Nested Objects with Spread Operator


const profile = { name: "Charlie", age: 29, address: { city: "San Francisco", zipcode: "94101" } };

const updates = { age: 30, address: { zipcode: "94109", country: "USA" } };


let newobj = {...profile,...updates,address:{...profile.address,...updates.address}}

console.log(newobj);
// { name: "Charlie", age: 30, address: { city: "San Francisco", zipcode: "94109", country: "USA" } }


// Q: 15
// Title:
// L2 - Nested Object Destructuring for API Response with Optional Chaining


const user = { id: 123, profile: { name: "John Doe", address: { city: "Los Angeles", zipcode: "90001" } } };

console.log(`User ${user?.profile.name || "Information not available"} (ID: ${user.id}) lives in ${user?.profile?.address?.city || "Information not available"} (ZIP: ${user?.profile?.address?.zipcode || "Information not available"})`)