import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.scss';
import Header from "./common/Header";
import About from "./pages/About";
import Landing from "./pages/Landing";
import Resume from "./pages/Resume";

function App() {
  return (
    <div style={{width: "100%", height: "100%", position: 'relative'}}>
      <div id="body_overlay_2"></div>
              <img id="planet" alt="planet_dark_mode" src="planet_dark.svg" />
        <Header />

      <div id="body_content">
        <div id='body_content_container'>
          <BrowserRouter>
            <Routes>
              <Route index element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
