import { Outlet } from "react-router-dom"
import MainNavigation from "../components/MainNavigation";

export default function RootLayout() {
  return (
    <div>
      <h3>Root Layout</h3>
        <MainNavigation />
      <Outlet/>
    </div>
  );
}
