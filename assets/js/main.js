import d from "../js/NTechDOM.js";
import { login } from "../../modules/login.js";
console.log("version", d.version);
login._history = window.history.length;
//window.location = "#/login";
d.render("root", login);

window.closeDiv = (q) => {
  document.querySelector(q).style.display = "none";
};

window.compare = (arr1, arr2) => {
  if (arr1.length != arr2.length) {
    return true;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].length != arr2[i].length) return true;
    for (let j = 0; j < arr1[i].length; j++) {
      if (arr1[i][j] !== arr2[i][j]) return true;
    }
  }
  return false;
};
