// Examples of State Management
// Managing Simple Data Types
// String State:

function Greeting() {
  const [name, setName] = React.useState("Guest");

  return (
    <div>
      <p>Hello, {name}!</p>
      <button onClick={() => setName("Alice")}>Set Name</button>
    </div>
  );
}
// Boolean State:

function Toggle() {
  const [isOn, setIsOn] = React.useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? "Switch Off" : "Switch On"}
    </button>
  );
}

// Working with Arrays
// Adding Items to an Array:

function ItemList() {
  const [items, setItems] = React.useState([]);

  function addItem() {
    setItems([...items, `Item ${items.length + 1}`]);
  }

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
// Removing Items from an Array:

function RemoveItemList() {
  const [items, setItems] = React.useState(["Item 1", "Item 2", "Item 3"]);

  function removeLastItem() {
    setItems(items.slice(0, -1));
  }

  return (
    <div>
      <button onClick={removeLastItem}>Remove Last Item</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}


// Working with Objects
// Updating Object Properties:

function UserProfile() {
  const [user, setUser] = React.useState({ name: "Alice", age: 25 });

  function updateAge() {
    setUser({ ...user, age: user.age + 1 });
  }

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <button onClick={updateAge}>Increase Age</button>
    </div>
  );
}


// Working with Arrays of Objects
// Adding to an Array of Objects:

function TodoList() {
  const [todos, setTodos] = React.useState([]);

  function addTodo() {
    const newTodo = { id: todos.length + 1, task: `Task ${todos.length + 1}` };
    setTodos([...todos, newTodo]);
  }

  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}
          </li>
        ))}
      </ul>
    </div>
  );
}
// Updating an Item in an Array of Objects:

function UpdateTodo() {
  const [todos, setTodos] = React.useState([
    { id: 1, task: "Learn React", completed: false },
  ]);

  function toggleComplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.task}
          </span>
          <button onClick={() => toggleComplete(todo.id)}>
            {todo.completed ? "Undo" : "Complete"}
          </button>
        </li>
      ))}
    </ul>
  );
}


// Axios Library to Make Network Requests with Firebase: 
// Step-by-Step Explanation
// 1. Fetching Data (GET):

import axios from 'axios';

const FetchData = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get('https://your-firebase-db.firebaseio.com/data.json')
         .then(response => setData(response.data))
         .catch(error => console.error("Error fetching data:", error));
  }, []);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

// 2. Adding Data (POST):
const AddData = () => {
  const handleAdd = () => {
    axios.post('https://your-firebase-db.firebaseio.com/data.json', {
      name: "New Item",
      value: 100,
    })
    .then(response => console.log("Data added:", response.data))
    .catch(error => console.error("Error adding data:", error));
  };

  return <button onClick={handleAdd}>Add Data</button>;
};

// 3. Updating Data (PATCH):
const UpdateData = () => {
  const handleUpdate = () => {
    axios.patch('https://your-firebase-db.firebaseio.com/data/item-id.json', {
      value: 200,
    })
    .then(response => console.log("Data updated:", response.data))
    .catch(error => console.error("Error updating data:", error));
  };

  return <button onClick={handleUpdate}>Update Data</button>;
};

// 4. Deleting Data (DELETE):
const DeleteData = () => {
  const handleDelete = () => {
    axios.delete('https://your-firebase-db.firebaseio.com/data/item-id.json')
    .then(() => console.log("Data deleted"))
    .catch(error => console.error("Error deleting data:", error));
  };

  return <button onClick={handleDelete}>Delete Data</button>;
};



// Implementing Pagination with useSearchParams

// Phase 1: Basic Pagination

// Initially, the Users component fetches data based on a page number and allows navigation through buttons that update this page number in the component's state.

import { useState, useEffect } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorIndicator from "../components/ErrorIndicator";
import { Link } from "react-router-dom";

async function getData(url) {
  try {
    let response = await fetch(url);
    let finalResponse = await response.json();
    return finalResponse;
  } catch (error) {
    console.log(error);
  }
}

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // 1. maintain state for page
  const [page, setPage] = useState(1);

  async function fetchAndUpdateData(url) {
    setLoading(true);
    try {
      const apiResponse = await getData(url);
      setUsers(apiResponse.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    // 3. added page as a dependency here;
    fetchAndUpdateData(`https://reqres.in/api/users?page=${page}`);
  }, [page]);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator />;

  return (
    <div>
      <h1>Users Page</h1>
      {/* 2. Buttons to update page state */}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page : {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
      {users &&
        users.length > 0 &&
        users.map((user) => (
          <div className="user-card" key={user?.id}>
            <img src={user?.avatar} alt={user?.first_name} />
            <Link to={`/users/${user?.id}`}>Click to view user details</Link>
          </div>
        ))}
    </div>
  );
}

// export default Users;

// Phase 2: Integrating Query Parameters

// Setting Page Number in URL: With useSearchParams, the component updates the URL to reflect the current page number upon state changes.
// Retrieving Page Number from URL: Retrieves the page number from the URL's query parameter when the component mounts or the URL changes.
import { useState, useEffect } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorIndicator from "../components/ErrorIndicator";
import { Link, useSearchParams } from "react-router-dom";

async function getData(url) {
  try {
    let response = await fetch(url);
    let finalResponse = await response.json();
    return finalResponse;
  } catch (error) {
    console.log(error);
  }
}

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  // 1 : useSearchParams hooks to get the search params
  const [searchParams, setSearchParams] = useSearchParams();

  async function fetchAndUpdateData(url) {
    setLoading(true);
    try {
      const apiResponse = await getData(url);
      setUsers(apiResponse.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAndUpdateData(`https://reqres.in/api/users?page=${page}`);
  }, [page]);

  // 2. updating search params as soon as the component mounts
  useEffect(() => {
    setSearchParams({ page: page });
  }, [page]);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator />;

  return (
    <div>
      <h1>Users Page</h1>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page : {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
      {users &&
        users.length > 0 &&
        users.map((user) => (
          <div className="user-card" key={user?.id}>
            <img src={user?.avatar} alt={user?.first_name} />
            <Link to={`/users/${user?.id}`}>Click to view user details</Link>
          </div>
        ))}
    </div>
  );
}

export default Users;

// Phase 3: Persistence Across Refreshes

// Maintaining Page State: Ensures that the user remains on the same page after refresh by retrieving the page number from the URL's query parameter.
// Handling Multiple Query Parameters: Demonstrates how to manage multiple query parameters for more complex scenarios, like adding a search feature alongside pagination.
import { useState, useEffect } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorIndicator from "../components/ErrorIndicator";
import { Link, useSearchParams } from "react-router-dom";

async function getData(url) {
  try {
    let response = await fetch(url);
    let finalResponse = await response.json();
    return finalResponse;
  } catch (error) {
    console.log(error);
  }
}

function getPageNumberFromParams(pageParam) {
  pageParam = Number(pageParam);

  if (Number.isNaN(pageParam)) {
    return 1;
  }
  if (!pageParam) {
    return 1;
  }
  if (pageParam < 1) {
    return 1;
  }
  return pageParam;
}

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // 1 Moving searchParams line before page state so as to utilize the searchParams to get the param from URL so that I can use the same in the below line
  const [searchParams, setSearchParams] = useSearchParams();
  // 2. getting the page param from URL
  const [page, setPage] = useState(
    getPageNumberFromParams(searchParams.get("page"))
  );
  // 3. can handle multiple query params
  const [searchText, setSearchText] = useState(searchParams.get("q") || "");

  async function fetchAndUpdateData(url) {
    setLoading(true);
    try {
      const apiResponse = await getData(url);
      setUsers(apiResponse.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAndUpdateData(`https://reqres.in/api/users?page=${page}`);
  }, [page]);

  useEffect(() => {
    const finalParams = {};
    finalParams.page = page;
    if (searchText) {
      finalParams.q = searchText;
    }

    setSearchParams(finalParams);
  }, [page, searchText]);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator />;

  return (
    <div>
      <h1>Users Page</h1>
      <input
        type="text"
        placeholder="set search text"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
      <div className="pagination">
        <button onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page : {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
      {users &&
        users.length > 0 &&
        users.map((user) => (
          <div className="user-card" key={user?.id}>
            <img src={user?.avatar} alt={user?.first_name} />
            <Link to={`/users/${user?.id}`}>Click to view user details</Link>
          </div>
        ))}
    </div>
  );
}

export default Users;

// Form with useState
// Using useState to manage a form with nested state, such as a user's personal information and detailed address including coordinates, introduces complexity in handling updates:

import { useState } from "react";

function FormUseState() {
  const [formState, setFormState] = useState({
    name: "",
    age: "",
    gender: "",
    address: {
      building: "",
      street: "",
      city: "",
      state: "",
      coordinates: {
        latitude: "",
        longitude: "",
      },
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    // perform some api call and post the data;
    // reset the value of form;
  }

  const {
    name,
    age,
    gender,
    address: {
      building,
      street,
      city,
      state,
      coordinates: { latitude, longitude },
    },
  } = formState;

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="name">
          Name :
          <input
            id="name"
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => {
              setFormState({
                ...formState,
                [e.target.id]: e.target.value,
              });
            }}
          />
        </label>
        <label htmlFor="age">
          Age :
          <input
            id="age"
            type="number"
            value={age}
            placeholder="Age"
            onChange={(e) => {
              setFormState({
                ...formState,
                [e.target.id]: +e.target.value,
              });
            }}
          />
        </label>
        <label htmlFor="gender">
          Gender :
          <select
            id="gender"
            value={gender}
            onChange={function (e) {
              setFormState({
                ...formState,
                [e.target.id]: e.target.value,
              });
            }}
          >
            <option value="">---Select Gender---</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </label>
        <label>
          Address - Building Name :
          <input
            id="building"
            type="text"
            value={building}
            placeholder="Building Name"
            onChange={(e) => {
              setFormState({
                ...formState,
                address: {
                  ...formState.address,
                  [e.target.id]: e.target.value,
                },
              });
            }}
          />
        </label>
        <label>
          Address - Coordinates - Latitude :
          <input
            id="latitude"
            type="text"
            value={latitude}
            placeholder="Latitude"
            onChange={(e) => {
              setFormState({
                ...formState,
                address: {
                  ...formState.address,
                  coordinates: {
                    ...formState.address.coordinates,
                    [e.target.id]: e.target.value,
                  },
                },
              });
            }}
          />
        </label>
      </form>
    </div>
  );
}

export default FormUseState;

// Form with useReducer
// Conversely, useReducer allows for a more organized and readable way to handle the same complex form state. By defining actions for each form field, including nested objects, we can simplify state updates:

import { useReducer } from "react";

const initState = {
  name: "",
  age: "",
  gender: "",
  address: {
    building: "",
    street: "",
    city: "",
    state: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
  },
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "UPDATE_NAME":
    case "UPDATE_AGE":
    case "UPDATE_GENDER": {
      return {
        ...state,
        ...payload,
      };
    }
    case "UPDATE_ADDRESS_BUILDING_NAME": {
      return {
        ...state,
        address: {
          ...state.address,
          ...payload,
        },
      };
    }
    case "UPDATE_ADDRESS_COORDINATES_LATITUDE": {
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            ...payload,
          },
        },
      };
    }
    default: {
      throw new Error(`action type is invalid`);
    }
  }
}

function FormUseReducer() {
  const [userDetails, dispatch] = useReducer(reducer, initState);

  function handleSubmit(e) {
    e.preventDefault();
    // perform some api call and post the data;
    // reset the value of form;
  }

  const {
    name,
    age,
    gender,
    address: {
      building,
      street,
      city,
      state,
      coordinates: { latitude, longitude },
    },
  } = userDetails;

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="name">
          Name :
          <input
            id="name"
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => {
              dispatch({
                type: "UPDATE_NAME",
                payload: {
                  [e.target.id]: e.target.value, // { name : "batman" }
                },
              });
            }}
          />
        </label>
        <label htmlFor="age">
          Age :
          <input
            id="age"
            type="number"
            value={age}
            placeholder="Age"
            onChange={(e) => {
              dispatch({
                type: "UPDATE_AGE",
                payload: {
                  [e.target.id]: +e.target.value,
                },
              });
            }}
          />
        </label>
        <label htmlFor="gender">
          Gender :
          <select
            id="gender"
            value={gender}
            onChange={function (e) {
              dispatch({
                type: "UPDATE_GENDER",
                payload: {
                  [e.target.id]: e.target.value,
                },
              });
            }}
          >
            <option value="">---Select Gender---</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </label>
        <label>
          Address - Building Name :
          <input
            id="building"
            type="text"
            value={building}
            placeholder="Building Name"
            onChange={(e) => {
              dispatch({
                type: "UPDATE_ADDRESS_BUILDING_NAME",
                payload: {
                  [e.target.id]: e.target.value,
                },
              });
            }}
          />
        </label>
        <label>
          Address - Coordinates - Latitude :
          <input
            id="latitude"
            type="text"
            value={latitude}
            placeholder="Latitude"
            onChange={(e) => {
              dispatch({
                type: "UPDATE_ADDRESS_COORDINATES_LATITUDE",
                payload: {
                  [e.target.id]: e.target.value,
                },
              });
            }}
          />
        </label>
      </form>
    </div>
  );
}

export default FormUseReducer;
