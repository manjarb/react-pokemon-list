import classes from "./public-layout.module.scss";
import pokemonLogo from "../assets/images/Pokemon_logo.png";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="container pt-30 pb-40">
      <div className="text-center mb-30">
        <img className={classes.logo} src={pokemonLogo} alt="pokemon logo" />
      </div>
      <Outlet />
    </div>
  );
}
