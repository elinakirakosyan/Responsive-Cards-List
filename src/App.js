import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import NavBar from "./components/Navbar/NavBar";
import noDataImage from "./assets/noData.png";

function App() {
  const [loading, setLoading] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://cloud.codesupply.co/endpoint/react/data.json"
      );
      const data = await response.json();
      setCardsData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredData(cardsData);
    } else {
      const filtered = cardsData.filter(
        (item) =>
          item.title
            .toLowerCase()
            .includes(inputValue.trimLeft().toLowerCase()) ||
          item.text.toLowerCase().includes(inputValue.trimLeft().toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [inputValue, cardsData]);

  return (
    <div className="App">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          <NavBar />
          <div className="main-wrapper">
            <div className="container">
              <input
                type="text"
                placeholder="Search..."
                onChange={(event) => setInputValue(event.target.value)}
                value={inputValue}
              />
              <div className="search"></div>
            </div>
            <div className="card-wrapper">
              {!!filteredData.length ? (
                filteredData.map((el, idx) => <Card data={el} key={idx} />)
              ) : (
                <img
                  src={noDataImage}
                  className="no-data"
                  alt="no_data_image"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
