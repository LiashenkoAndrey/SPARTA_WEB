import './App.css';
import {useEffect} from "react";

let tg = window.Telegram.WebApp;

function App() {

    useEffect(() => {
        tg.ready()
    }, []);

    const onClose = () => {
        tg.close()
    }

  return (
    <div className="App">
      <h1>Hello!</h1>
      <button onClick={onClose}>Close me</button>
    </div>
  );
}

export default App;
