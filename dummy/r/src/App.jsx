import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  // https://randomuser.me/api/?results=50

  const getData = () => {
    try {
      fetch("https://randomuser.me/api/?results=50")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // console.log(
          //   data.results.reduce((acc, use) => {
          //     acc[use.gender] = (acc[use.gender] || 0) + 1;
          //   }, {})
          // )
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
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
