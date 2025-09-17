
Question 6:

    What the task was?
        the task was given a code with bug where result was coming as undefined, i had to fix the bug and make it return the correct answer.

    How you fixed it?

        when we create new calculator, constructor sets this to the new object
        i used arrow fn inside the constructor so they capture the surrounding this
        arrow fn don’t have their own this but they take it from their parent (lexical this)
        because of that, all nested arrow fn got the correct this reference and updated total properly, so result became 30

    Why the fix works?
        arrow fn do not create their own this
        instead they use the this value from the outer scope (here, the constructor)
        that’s why all nested arrow fn used the right this of the calculator object
        in the original code only the first add had the right this but inner fn lost it, which caused undefined. arrow fn solved that problem


Question 7:
    
    Original Issue/Bug(if any)?
        No bug in the code, but tricky behavior happens because of hoisting and scope. Variables are declared with var, which gets hoisted and initialized with undefined.
    

    Expected Behavior?
        each console.log will not log the value you expect 50, 100, 200. Instead, bcs of var hoisting, each fns local data is hoisted but uninitialized when the log runs.
        thats why we got answer like undefined ,undefined and 200
    
    How You Fixed or Solved It?
        Recognize that var data is hoisted inside each fn.
        During the console.log, the local data exists but is still undefined bcs of Hoisting until the assignment happens.
        we use let to avoid hoisting and shadowing confusion.

    Why This Fix Works?
        var hoisting Declarations are moved to the top of their scope, but assignments stay in place.
        means at the time of the console.log, the variable exists but its value is undefined.
        Each nested fn shadows the outer data.

    Predicted Output?
        Outer data: undefined 
        Inner data: undefined
        Deep data: 200

    

Question 8:

    Original Issue / Bug (if any)
        The first log printName prints undefined bcs its an arrow fn.
        Arrow fn don’t create their own this, they use this from the surrounding lexical scope in this case the global scope where this.name is undefined.

    Expected Behavior
        Both methods should log "Alice".

    How You Fixed or Solved It
        Changed printName from an arrow fn to a regular fn.
        Regular fn call as methods user.printName() have this bound to the calling object (user).
    
    Why This Fix Works (short explanation)
        Arrow fn: this is taken from where the fn is defined lexical scope. 
        inside an object literal,that’s the global scope their no name.
        Regular fn: this is determined by who calls them. Since user.printName() is called by user, this = user.

    How You Fixed or Solved It
        const user = {
            name: "Alice",
            printName: function () {
                console.log(this.name);
            },
            printName2: function () {
                console.log(this.name);
            }
        };

        user.printName();
        user.printName2();
    Predicted Output (if asked)
        Alice
        Alice


Question 9:

    Original Issue / Bug (if any):
        inside setTimeout this does not point to obj. instead, it defaults to the global object window in browser or undefined in strict mode. thats why this.count was not updating and gave NaN.
    
    Expected Behavior:
        When calling obj.start()
        output is like:
        "Counter started"
        1, 2, 3 with delays.


    How You Fixed or Solved It:
        using arrow fn we can solve the bug bcs arrow fn dont have there this value but arrow fn can access this using lexical taht the resone we can solve the problem.

    Predicted Output (if asked):
       Counter started
        1
        2
        3 

