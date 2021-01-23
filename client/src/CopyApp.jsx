import React, { useContext, useReducer } from "react";
import "./style.css";

export const MyContext = React.createContext();

const initialState = 60;
function reducer(state, action) {
  switch (action.type) {
    case "increase":
      return state + 1;
      break;

    case "decrease":
      return state + 1;
      break;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <MyContext.Provider value={{ name: "Ayo", age: 24, sex: "male" }}>
        <h1 style={{ color: "red", textAlign: "center" }}>React on Browser</h1>
        <h4> Using useReducer Hook</h4>
        <h3>{state}</h3>
        <button
          onClick={() => {
            dispatch({ type: "increase" });
          }}
        >
          Increase
        </button>
        <Weather time={new Date().toLocaleDateString()} />
      </MyContext.Provider>
    </>
  );
}

function Weather({ time, age }) {
  const name = useContext(MyContext);
  return (
    <>
      <h4> Using useContext Hook</h4>
      <p>{time}</p>
      <p>{name.name}</p>
      <p>{name.age}</p>
      <p>{name.sex}</p>
      <CompA />
    </>
  );
}

function CompA() {
  const name = useContext(MyContext);
  return (
    <>
      <h4> Using useContext Hook</h4>
      <h3> {name.name}</h3>;
    </>
  );
}
