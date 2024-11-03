import ListaTarea from "../../components/Lista/ListaTarea";
import ListaUser from "../../components/Lista/ListaUser";
import Menu from "../../components/Menu";

const Dashboard = () => {
  return (
    <Menu>
      {localStorage.getItem("rol") === "admin" ? (
        <ListaUser />
      ) : (
        <ListaTarea id={localStorage.getItem("id") ?? ""} />
      )}
    </Menu>
  );
};
export default Dashboard;
