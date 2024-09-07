import { useState } from "react";

function StatePrimitive() {
  const [title, setTitle] = useState<string>("-");
  return (
    <div>
      {title}
      <br />
      <input value={title} onChange={(event) => setTitle(event.target.value)} />
    </div>
  );
}

export default StatePrimitive;
