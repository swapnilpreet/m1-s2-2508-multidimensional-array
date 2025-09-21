import React, { useEffect, useState } from "react";

const Fetch = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
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
        console.log(universetices)
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
        let username=data?.users.map((user)=>{ return user.username});
        console.log("username",username);

        // data?.users.forEach((user)=>console.log(user.username));
        // console.log("username");


        // check all user are above 18 or not (every)
        const isAllAdults=data?.users.every((user)=>user.age>18)
        console.log("isAllAdults",isAllAdults)

        // cehck if at least one admin exists (some)

        const hasAdmin=data?.users.some((user)=>user.role==='admin');
        console.log("hasAdmin",hasAdmin)

      });
  }, []);


//   function getfrequency(arr,key){
//     return arr.reduce((acc,item)=>{
//         const value=item[key];
//         acc[value]=(acc[value] || 0)+1;
//     },{})
//   }

//   console.log(getfrequency([1,2,1,2,1,34,33,2,21,2,22,11,22,1], "ref"));
// //   

//   single fetch
  async function fetchsingledata(id) {
    try {
      const response = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await response.json();
      console.log("data",data);
    } catch (error) {
      console.log(error.message);
    }
  }

  // async function fetchAustralianUsers() {
  // try {
  //   const res = await fetch("https://randomuser.me/api/?results=50");
  //   const data = await res.json();

  //   // Filter users from Australia
  //   const australianUsers = data.results
  //     .filter((user) => user.location.country === "Australia")
  //     .map((user) => ({
  //       firstName: user.name.first,
  //       lastName: user.name.last,
  //       city: user.location.city
  //     }));

  //   console.log(australianUsers);
  //   return australianUsers;
  // } catch (err) {
  //   console.error("Error fetching users:", err);
  // }
  // }



useEffect(()=>{
    // fetchAustralianUsers();
    fetchsingledata(1)
  },[])

  return <div>Fetch</div>;
};

export default Fetch;