import d from "../js/NTechDOM.js";
import { login } from "../../modules/login.js";
console.log("version", d.version);
login._history = window.history.length;
//window.location = "#/login";
d.render("root", login);

window.closeDiv = (q) => {
  document.querySelector(q).style.display = "none";
};
