import d from "../assets/js/NTechDOM.js";
import { header, menu } from "./header.js";
import { loading } from "./loading.js";
import { pages } from "./pages.js";
import { ntech } from "./ntech.js";
import { login } from "./login.js";

let initPages = { ...pages };
const home = d.createElement("div");

const main = d.createElement("main").setAttribute({ class: "main" });
const title = d.createElement("h1", "INFC Branches");
const container = d.createElement("div").setAttribute({ class: "container2" });
const card = d
  .createElement("div")
  .setAttribute({ class: "card", onclick: "window.location = '#/ntech'" });
const img = d
  .createElement("img")
  .setAttribute({
    src: "./assets/img/ntech-icon.png",
    class: "logo",
    style: "border-radius: 6px;",
  });
card.append(
  img,
  d.createElement("div", "NTech Computer & IT", {
    style: "text-align: center; font-size: 18px; width: 100%;",
  })
);
main.append(title, container.append(card));
const menuList = {
  Home: "home",
  Logout: "logout",
};
const onload = () => {
  //console.log("✔️");
  initPages = { ...pages };
  delete initPages.login;
  delete initPages.signup;
  delete initPages.forget;
  let root = "home";
  ntech._loginData = { ...home._loginData };
  header.onload(home._loginData, menuList);
  if (window.hashchange)
    window.removeEventListener("hashchange", hashchange, false);
  window.hashchange = () => {
    d.render("root", loading);
    if (window.location.hash.toString().replace("#/", "") == "logout") {
      for (let x in initPages) delete initPages[x];
      initPages.login = "login";
      initPages.signup = "signup";
      initPages.forget = "forget";
      root = "login";
      delete window.localStorage["com.infc.management"];
      console.log()
    }
    if (initPages[window.location.hash.toString().replace("#/", "")]) {
      eval(initPages[window.location.hash.toString().replace("#/", "")]).init();
      setTimeout(() => {
        d.render(
          "root",
          eval(initPages[window.location.hash.toString().replace("#/", "")])
        );
      }, 500);
    } else {
      eval(initPages[root]).init();
      setTimeout(() => {
        d.render("root", eval(initPages[root]));
      }, 500);
    }
  };
  window.addEventListener("hashchange", hashchange, false);
};

home.append(header, menu, main);

home.setCustomFunction(onload);
export { home };
