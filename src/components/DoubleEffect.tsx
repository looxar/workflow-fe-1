import { useEffect, useState } from "react";

function DoubleEffect() {
  const [firstname, setFirstname] = useState("TEST");
  console.log("re-render");

  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log("effect");
    const id = setInterval(() => {
      setCounter((prevState) => prevState + 1);
    }, 1 * 1000);
    return () => {
      console.log("before unmounted");
      //   clearInterval(id);
    };
  }, [firstname]);
  return (
    <div>
      <h1 className="text-2xl">
        effect
        {counter}
      </h1>
      <input
        type="text"
        value={firstname}
        onChange={(event) => {
          setFirstname(event.target.value);
        }}
      />
      {firstname}
    </div>
  );
}

export default DoubleEffect;
