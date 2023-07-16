import { useState} from "react";
import "./styles.css";

const apiurl =
  "https://api.weatherapi.com/v1/current.json?key=346ac1769e7248248bc173005231407&q=";

const App = () => {
  const [previsao, setPrevisao] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

//Usa a API para buscar a cidade e, se positivo, a adiciona à "previsao"
  const handleSearch = () => {
    fetch(`${apiurl}${searchTerm}&lang=pt`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setPrevisao(data);
      });
  };

//chama "handleSearch" ao pressionar Enter na busca
    const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="App">
      <div className="container">
        {previsao ? (
          <div className="Resultado">
            <h1>Clima em {previsao.location.name}</h1>
            <div className="graus">
              <p id="temp">{previsao.current.temp_c}°C</p>
              <img src={previsao.current.condition.icon} />
            </div>
            <p id="cond">{previsao.current.condition.text}</p>
            <input
              placeholder="Buscar cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
            />

            <button onClick={handleSearch}>Procurar</button>
          </div>
        ) : (
          <div className="Interface">
            <h1>Site Clima</h1>

            <p id="info">Digite sua cidade:</p>

            <input
              placeholder="Buscar cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button onClick={handleSearch}>Procurar</button>
          </div>
        )}
      </div>
      <div className="Credito">
        <p id="Watermark">
          Projeto de{" "}
          <a href="https://github.com/Thiagod3" target="_blank">
            ThiagoVilela
          </a>
        </p>
        <p id="Watermark">
          Powered by{" "}
          <a href="https://www.weatherapi.com/" title="Weather API">
            WeatherAPI.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
