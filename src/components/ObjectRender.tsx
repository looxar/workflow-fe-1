type A = string;
interface Props { 
  title: string; 
  amount: NullableNumber
}

type NullableNumber = number | null 

function ObjectRender(props: Props) {
  return (
    <div>
      <h1>Task: {props.title}</h1>
      <p>${props.amount || "-"}</p>
    </div>
  );
}

export default ObjectRender;
