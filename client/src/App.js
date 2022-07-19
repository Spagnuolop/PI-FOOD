import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing";
import Home from "./Components/Home";
import { Detail } from "./Components/Detail";
import { CreateRecipe } from "./Components/CreateRecipe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details/:id" element={<Detail />} />
        <Route path="/createrecipe" element={<CreateRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
