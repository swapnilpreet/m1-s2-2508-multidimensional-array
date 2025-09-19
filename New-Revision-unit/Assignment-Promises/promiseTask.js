function fetchUserData() {
  const mypromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject("Failed to fetch user data");
      } else {
        resolve({ id: 1, name: "John Doe", role: "Admin" });
      }
    }, 2000);
  });
  return mypromise;
}

fetchUserData()
  .then((res) => {
    console.log("success", res);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("Fetch attempt complete");
  });

function fetchUserPermissions() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("fetchUserPermissions success");
    }, 1500);
  });
}

Promise.all([fetchUserData(), fetchUserPermissions()])
  .then((res) => {
    let [user, permission] = res;
    console.log("promise-all-resolve", user, permission);
  })
  .catch((err) => {
    console.log("promise-all-failed", err);
  });

  Promise.race([fetchUserData(), fetchUserPermissions()])
  .then((res) => {
    console.log("promise-race-resolve", res);
  })
  .catch((err) => {
    console.log("promise-race-failed", err);
  });