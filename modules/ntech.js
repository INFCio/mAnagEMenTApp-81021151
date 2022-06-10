import d from "../assets/js/NTechDOM.js";
import { header, menu} from "./header.js";
const ntech = d.createElement("div");
const main = d.createElement("main").setAttribute({ class: "main" });
const title = d.createElement("h1", "NTech Services Providers");
const container = d.createElement("div").setAttribute({ class: "container2" });
const card = d
  .createElement("div")
  .setAttribute({ class: "card", onclick: "window.location = '#/ntech'" });
const img = d
  .createElement("img")
  .setAttribute({
    src: "https://drive.google.com/uc?export=view&id=1te0NLol3SshA1TmX1JocgdI_Lkd1GI3K",
    class: "logo",
    style: "border-radius: 6px;",
  });
card.append(
  img,
  d.createElement("div", [d.createElement("div", "Mission"), d.createElement("div", d.createElement("a", "01211212", {href: "tel:0191919", style: 'font-size: 12px'}))], {
    style: "text-align: center; font-size: 18px; width: 100%;",
  })
);
main.append(title, container.append(card));

const onload = () => {
  header.onload(ntech._loginData);
}

ntech.append(header, menu, main)
ntech.setCustomFunction(onload);
export {ntech};