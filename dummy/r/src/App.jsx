import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LightGallery from "./Components/LightGallery";

function App() {
  const [count, setCount] = useState(0);

  const getData = () => {
    try {
      fetch("https://randomuser.me/api/?results=50")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let ans = data?.results.reduce(
            (acc, user) => {
              if (user.gender === "male") {
                acc.male += 1;
              } else {
                acc.female += 1;
              }
              return acc;
            },
            { male: 0, female: 0 }
          );
          console.log("ans", ans);

          let oldman = data?.results.reduce((acc, user) =>
            user.dob.age > acc.dob.age ? user : acc
          );

          console.log(oldman.name.first);

          let avgage = data?.results.reduce(
            (acc, user) => acc + user.dob.age,
            0
          );
          let totalage = Math.round(avgage / data?.results.length);
          console.log(totalage);

          let mapnew = data?.results
            .filter((user) => user?.location.country === "Australia")
            .map(
              (user) =>
                `${user?.name?.first} ${user?.name?.last} ${user?.location?.city}`
            );

          console.log(mapnew);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div>
        <LightGallery/>
      </div>
    </>
  );
}

export default App;
