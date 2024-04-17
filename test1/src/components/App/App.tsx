import { useEffect, useState } from "react";
import dataJson from "../../bd.json";
import "./App.css";
import { Card } from "../Card";
import { DataDTO } from "./types";

const fetchData = () => {
  return dataJson;
};

function App() {
  const [data, setData] = useState<DataDTO[]>([]);

  useEffect(() => {
    const response = fetchData();
    setData(response);
  }, []);

  return (
    <div className="cards-wrapper">
      {data.map((cardData) => (
        <Card
          key={`card-${cardData.text.length}-${cardData.options.length}`}
          {...cardData}
        />
      ))}
    </div>
  );
}

export default App;
