import Home from "./Component/home";
import Navbar_Result from "./Component/Navbar_Result/Navbar_Result";
import Log_in from "./Component/Log_in";
import Sign_up from "./Component/Sign_up";
import Info_for_id from "./Component/Info_for_id";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Navbar_Result />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log_in" element={<Log_in />} />
          <Route path="/Sign_up" element={<Sign_up />} />
          <Route path="/:type/:name/:id" element={<Info_for_id />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;
