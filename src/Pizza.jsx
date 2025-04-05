import { useState } from "react";

const Pizza = (props) => {
  const [pizzaNum, setPizzaNum] = useState(0);

  let soldOut;

  if (props.name == "Pepperoni") {
    soldOut = true;
  }

  const handleClick = () => {
    console.log("pizza num is clicked");
    setPizzaNum((prev) => prev + 1);
  };

  return (
    <div className="pizza">
      <h1>{props.name}</h1>
      <p>{props.pizzaSize}</p>
      <p>{props.description}</p>
      <p>{soldOut ? "sold out" : ""}</p>
      <img src={props.image} alt={props.name} />
      <button onClick={handleClick}>Increase Pizza Num</button>
      <span>{pizzaNum}</span>
    </div>
  );
};

export default Pizza;
