import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./modules/dashboard/Dashboard";
import Login from "./modules/login/Login";
import PrivateRoute from "./components/PrivateRoute";
import Tarea from "./modules/dashboard/tareas/Tarea";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/dashboard"} />} />
        <Route path="/iniciar_session" element={<Login session={true} />} />
        <Route path="/crear_cuenta" element={<Login session={false} />} />
        <Route Component={PrivateRoute}>
          <Route path="/dashboard" Component={Dashboard} />
        </Route>
        <Route path="/dashboard/:id" element={<Tarea />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
