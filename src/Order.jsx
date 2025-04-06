import Pizza from "./Pizza";
import { useEffect, useState } from "react";
import Cart from "./Cart";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

//trying check into git again

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  async function checkout() {
    setLoading(true);
    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    console.log("checking out");

    setCart([]);
    setLoading(false);

    alert("Checkout complete");
  }

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);

    console.log(selectedPizza);

    price = intl.format(selectedPizza.sizes[pizzaSize]);
  }

  async function fetchPizzaTypes() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const pizzaRes = await fetch("/api/pizzas");
    const pizzaJson = await pizzaRes.json();
    console.log(pizzaJson);
    setPizzaTypes(pizzaJson);
    setLoading(false);
  }

  //run once after it renders

  useEffect(() => {
    fetchPizzaTypes();
  }, [pizzaSize]);

  return (
    <>
      <div className="order">
        <h2>CREATE ORDER</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCart([...cart, { pizza: selectedPizza, size: pizzaSize }]);
            console.log("submit button clicked");
          }}
        >
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                name="pizza-type"
                onChange={(e) => setPizzaType(e.target.value)}
                value={pizzaType}
                id="pizza-type"
              >
                {pizzaTypes.map((pizza) => (
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    checked={pizzaSize === "S"}
                    type="radio"
                    name="pizza-size"
                    value="S"
                    id="pizza-s"
                    onChange={(e) => {
                      setPizzaSize(e.target.value);
                    }}
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === "M"}
                    type="radio"
                    name="pizza-size"
                    value="M"
                    id="pizza-m"
                    onChange={(e) => {
                      setPizzaSize(e.target.value);
                    }}
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === "L"}
                    type="radio"
                    name="pizza-size"
                    value="L"
                    id="pizza-l"
                    onChange={(e) => {
                      setPizzaSize(e.target.value);
                    }}
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          <div className="order-pizza">
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              <Pizza
                name={selectedPizza.name}
                pizzaSize={pizzaSize}
                description={selectedPizza.description}
                image={selectedPizza.image}
              />
            )}
            <p>{price}</p>
          </div>
        </form>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Cart cart={cart} setCart={setCart} checkout={checkout} />
        )}
      </div>
    </>
  );
}
