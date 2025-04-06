import { usePizzaOfTheDay } from "./usePizzaOfTheDay";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const PizzaOfTheDay = () => {
  const pizzaOfTheDay = usePizzaOfTheDay();

  if (!pizzaOfTheDay) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pizza-of-the-day">
      <h2>Pizza of the Day</h2>
      <div className="pizza">
        <h3>{pizzaOfTheDay.name}</h3>
        <p>{pizzaOfTheDay.description}</p>
        <p>
          <strong>From {intl.format(pizzaOfTheDay.sizes.S)}</strong>
        </p>

        <img
          className="pizza-of-the-day-image"
          src={pizzaOfTheDay.image}
          alt=""
        />
      </div>
    </div>
  );
};

export default PizzaOfTheDay;
