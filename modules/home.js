import d from "../assets/js/NTechDOM.js";
import { header, menu} from "./header.js";

const home = d.createElement("div");
const menuList = {
  "Home" : "home",
  "Logout": "logout"
}
const onload = () => {
  //console.log("✔️");
  header.onload(home._loginData, menuList);
  
}

home.append(header, menu);

home.setCustomFunction(onload);
export {home};