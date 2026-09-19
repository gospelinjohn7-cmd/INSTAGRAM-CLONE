import "./App.css";
import Feed from "./pages/Feed";
import Sidebar from "./components/Sidebar";
import Suggest from "./components/Suggest";

function App() {

  
  return (
    <div className="box">
      <div className="sidibar">
        <Sidebar />
      </div>

      <div className="content">
        <Feed />
        <div className="suggest">
          <Suggest />
        </div>
      </div>
    </div>
  );
}

export default App;