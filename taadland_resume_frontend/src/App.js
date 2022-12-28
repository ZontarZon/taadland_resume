import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.scss';
import Footer from "./common/Footer";
import Header from "./common/Header";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Game from "./pages/Game";
import Landing from "./pages/Landing";
import Resume from "./pages/Resume";
import UXPortfolio from "./pages/UXPortfolio";

function App() {
  return (
    <div style={{width: "100%", height: "100%", position: 'relative', overflowX: 'hidden'}}>
      <div id="body_overlay_1"></div>
      <div id="body_overlay_2"></div>
      <div id="body_overlay_3"></div>
        <Header />

      <div id="body_content">
        <div id='body_content_container'>
          <BrowserRouter>
            <Routes>
              <Route index element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/ux_portfolio" element={<UXPortfolio />} />
              <Route path="/game" element={<Game />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      </div>


    </div>
  );
}

export default App;
