import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

import NavBar from "./components/NavBar/NavBar";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Home = lazy(() => import("./pages/home/Home"));

const App = () => {
  return (
    <>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
