import { createContext, useContext, useState } from "react";

type PersonalInfo = {
  firstname: string;
  lastname: string;
};

const PersonalInfoContext = createContext<PersonalInfo>({
  firstname: "-",
  lastname: "-",
});

function PersonalInfoProvider({ children }: { children: React.ReactNode }) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstname: "Bas",
    lastname: "PEA",
  });
  return (
    <PersonalInfoContext.Provider value={personalInfo}>
      {children}
    </PersonalInfoContext.Provider>
  );
}

// -----------------------------------

function Comp1() {
  return (
    <div>
      Comp 1
      <PersonalInfoProvider>
        <Comp2 />
      </PersonalInfoProvider>
      <Comp4 />
    </div>
  );
}

function Comp2() {
  return (
    <div>
      Comp 2
      <Comp3 />
    </div>
  );
}

function Comp3() {
  const { firstname } = useContext(PersonalInfoContext);
  return <div>Comp 3: {firstname}</div>;
}

function Comp4() {
  const { lastname } = useContext(PersonalInfoContext);
  return <div>Comp 4: {lastname}</div>;
}

export default Comp1;
