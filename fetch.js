fetch("https://dummyjson.com/users")
  .then((res) => res.json())
  .then((data) => {
    setUserData(data.users);
    // console.log(data.users);
    // total number of female,male
    const total = data.users.reduce(
      (acc, user) => {
        if (user.gender === "male") {
          acc.males += 1;
        }
        if (user.gender === "female") {
          acc.females += 1;
        }
        return acc;
      },
      { males: 0, females: 0 }
    );
    console.log(total);

    // get all emails of female user

    const getemail = data.users
      .filter((user) => user.gender === "female")
      .map((user) => {
        return { User: user.email, Gender: user.gender };
      });
    console.log(getemail);

    const getmaleemail = data.users
      .filter((user) => user.gender === "male")
      //   .map((user) => user.email); // emails only gender
      .map((user) => {
        return { User: user.email, Gender: user.gender };
      });

    console.log(getmaleemail);

    let emails = {
      male: getmaleemail,
      female: getemail,
    };
    console.log("emails", emails);

    // let avgage = data.users.reduce(
    //   (acc, user) => acc + user.age / data.user,0
    // );

    //   avg age of user
    let avgage = data.users.reduce((acc, user) => {
      return acc + user.age / data?.users.length;
    }, 0);
    // console.log(data?.users.length)
    console.log("avgAgeofAll user", avgage);

    // avg age of only female
    let avgAgeofFemale = data.users
      .filter((user) => user.gender === "female")
      .reduce((acc, user) => {
        return acc + user.age / data?.users?.length;
      }, 0);
    console.log("avgAgeofFemale", avgAgeofFemale);

    // 5. Frequency of blood groups (reduce)
    let bloodgroup = data?.users?.reduce((acc, user) => {
      acc[user?.bloodGroup] = (acc[user?.bloodGroup] || 0) + 1;
      return acc;
    }, {});

    console.log("some blood group user", bloodgroup);

    // get all unique universetices

    const universetices = [
      ...new Set(data?.users.map((user) => user.university)),
    ];
    console.log(universetices);
    // const tallest = data?.users.reduce((max, user) => user.height > max.height ? user :max);

    // console.log(tallest);
    const tallestAge = data?.users.reduce((max, user) => {
      if (user.age > max) {
        max = user.age;
      }
      return max;
    }, 0);
    console.log("tallestAge", tallestAge);

    // print each username
    let username = data?.users.map((user) => {
      return user.username;
    });
    console.log("username", username);
    // data?.users.forEach((user)=>console.log(user.username));
    // console.log("username");

    // check all user are above 18 or not (every)
    const isAllAdults = data?.users.every((user) => user.age > 18);
    console.log("isAllAdults", isAllAdults);
    // cehck if at least one admin exists (some)
    const hasAdmin = data?.users.some((user) => user.role === "admin");
    console.log("hasAdmin", hasAdmin);
  })
  .catch((err) => console.log(err));

// Fetch posts from JSONPlaceholder
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((data) => {
    console.log("Original Data:", data.slice(0, 5)); // show first 5
  })
  .catch((err) => console.error("Error:", err));

  
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((data)=>{
    // Sort by title alphabetically
    const sorted = [...data].sort((a, b) => a.title.localeCompare(b.title));
    console.log("Sorted Titles:", sorted.slice(0, 5));
  });

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((data) => {
    // Filter posts where userId = 1
    const filtered = data.filter((post) => post.userId === 1);
    console.log("Posts by userId=1:", filtered.slice(0, 5));
  });

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((data) => {
    // Map to extract only title
    const titles = data.map((post) => post.title);
    console.log("All Titles:", titles.slice(0, 5));
  });

const numbers = [10, 20, 30, 40];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("Sum:", sum); // 100

const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];

const frequency = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1; // count occurrences
  return acc;
}, {});

console.log("Frequency Count:", frequency);
// { apple: 3, banana: 2, orange: 1 }

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const userObj = users.reduce((acc, user) => {
  acc[user.id] = user.name; // key = id, value = name
  return acc;
}, {});

console.log("Users as Object:", userObj);
// { 1: 'Alice', 2: 'Bob', 3: 'Charlie' }

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((data) => {
    // 1. Sort posts by title
    const sorted = [...data].sort((a, b) => a.title.localeCompare(b.title));

    // 2. Filter posts for userId=1
    const filtered = sorted.filter((post) => post.userId === 1);

    // 3. Map to only titles
    const titles = filtered.map((post) => post.title);

    // 4. Reduce → count word frequency from all titles
    const wordFreq = titles.reduce((acc, title) => {
      title.split(" ").forEach((word) => {
        acc[word] = (acc[word] || 0) + 1;
      });
      return acc;
    }, {});

    console.log("Titles:", titles.slice(0, 5));
    console.log("Word Frequency:", wordFreq);
  });
