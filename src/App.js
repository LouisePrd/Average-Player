import { useData } from "./services/Data";
import { Champion } from "./components/Champion";
import "./App.css";

function App() {
  const { data, error, loading } = useData();
  console.log(data ? data.name : "No data yet");

  if (loading) {
    return <div className="App">Loading...</div>;
  }
  if (error) {
    return <div className="App">Error: {error.message}</div>;
  }
  return (
    <div className="App">
      <h1>Average player</h1>
      {data ? (
        <Champion champion={data} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
  
}

export default App;
