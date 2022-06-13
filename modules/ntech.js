import d from "../assets/js/NTechDOM.js";
import { header, menu } from "./header.js";
import { loading } from "./loading.js";
const ntech = d.createElement("div");
const main = d.createElement("main").setAttribute({ class: "main" });
const title = d.createElement("h1", "NTech Services Providers");
const container = d.createElement("div").setAttribute({ class: "container2" });
const addBtn = d.createElement(
  "div",
  d.createElement("button", "Add Member", {
    class: "addBtn",
    onclick: "window.location='#/addmember'",
  }),
  { class: "div" }
);

main.append(loading);

const users = (arr) => {
  const children = [];
  const accept = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][5] == 0) continue;
    const card = d.createElement("div").setAttribute({
      class: "card",
    });
    const img = d.createElement("img").setAttribute({
      src:
        "https://drive.google.com/uc?export=view&id=" +
        arr[i][3] +
        "&" +
        new Date().getTime(),
      class: "logo",
      style: "border-radius: 6px;",
      alt: "member img",
      id: "member" + i,
    });
    card.append(
      img,
      d.createElement(
        "div",
        [
          d.createElement("div", arr[i][0]),
          d.createElement(
            "div",
            d.createElement("a", arr[i][1], {
              href: "tel:=" + arr[i][1],
              style: "font-size: 12px",
            })
          ),
        ],
        {
          style: "text-align: center; font-size: 18px; width: 100%;",
        }
      )
    );
    children.push(card);
    accept.push(i);
  }
  return { children, accept };
};
ntech.onload = () => {
  if (main.past) {
    const { children, accept } = users(main.past);
    main.setChildren([title, container.setChildren([...children, addBtn])]);
    for (let i = 0; i < accept.length; i++) {
      document.getElementById("member" + accept[i]).onclick = () => {
        header.memberinfo = main.past[i];
        window.location = "#/memberinfo";
      };
    }
  }
  d.post(
    "https://script.google.com/macros/s/AKfycbygUmlp2UhaJPocXT1RRiArfh2paprRKQLivfiTCw/exec",
    {
      type: "1",
      data: "{}",
    }
  ).then((res) => {
    res = JSON.parse(JSON.parse(res).messege);
    console.log(res);
    if (res.result) {
      const { children, accept } = users(res.data);
      if (res.data[0][0] == "") res.data = [[]];
      if (!main.past) main.past = [[]];
      if (compare(main.past, res.data)) {
        if (res.data[0].length) {
          console.log(children);
          main.setChildren([title, container.setChildren([addBtn])]);
          container.setChildren(
            children.length != 0 ? children.concat(addBtn) : addBtn
          );
          main.past = [...res.data];
          for (let i = 0; i < accept.length; i++) {
            document.getElementById("member" + accept[i]).onclick = () => {
              header.memberinfo = main.past[i];
              window.location = "#/memberinfo";
            };
          }
        } else {
          delete main.past;
          main.setChildren([title, container.setChildren([addBtn])]);
        }
      } else {
        if (!main.past[0].length) {
          delete main.past;
          main.setChildren([title, container.setChildren([addBtn])]);
        }
      }
    }
  });

  header.onload();
};
console.log(999);
ntech.append(header, menu, main);
export { ntech };
