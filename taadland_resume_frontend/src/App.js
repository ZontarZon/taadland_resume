import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./common/Header";
import About from "./pages/About";
import Landing from "./pages/Landing";
import Resume from "./pages/Resume";

function App() {
  return (
    <div style={{width: '100%', height: '100%'}}>
            <div id='body_overlay_1'></div>

      <div id='body_overlay_2'></div>
      <div id='body_content'>
      <img id='planet' alt='planet_dark_mode' src='planet_dark.svg' />
      <Header />
      <BrowserRouter>
      <Routes>
        <Route index element={<Landing/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/resume" element={<Resume/>} />

      </Routes></BrowserRouter>
      </div>
    </div>
  );
}

export default App;
