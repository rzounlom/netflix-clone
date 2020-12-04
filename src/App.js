import "./App.css";
import Row from "./components/Row/Row";
import requests from "./utils/requests";

const App = () => {
  return (
    <div className="App">
      <h1>Hello To the React Netflix Clone</h1>
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTreding} />
    </div>
  );
};

export default App;
