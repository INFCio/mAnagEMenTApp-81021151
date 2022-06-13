import d from "../assets/js/NTechDOM.js";
import { header, menu } from "./header.js";
import { loading } from "./loading.js";
const itservices = d.createElement("div");
const main = d.createElement("main").setAttribute({ class: "main" });
const title = d.createElement("h1", "IT Services Category");
const container = d
  .createElement("div")
  .setAttribute({ class: ["container2"] });
const addBtn = d.createElement(
  "div",
  d.createElement("button", "Add Category", {
    class: "addBtn",
  }),
  { class: "div" }
);

// form
const error = d.createElement("div", "", { class: "error" });
const errDiv = d.createElement("div", "", {
  style: "width: 100%; text-align: left;",
});
const closeBtn = `
<svg onclick="closeDiv('.error')" aria-hidden="true" style="fill: rgb(207, 34, 46); cursor: pointer" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
</svg>
`;
error.append(errDiv, closeBtn);

const success = d.createElement("div", "", { class: "success" });
const succDiv = d.createElement("div", "", {
  style: "width: 100%; text-align: left;",
});
const closeBtn2 = `
<svg onclick="closeDiv('.success')" aria-hidden="true" style="fill: rgb(34, 207, 92); cursor: pointer" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
</svg>
`;
success.append(succDiv, closeBtn2);

const form = d.createElement("form", "", {
  class: "form",
  name: "form",
});
const label = d.createElement("label");
label._reuse = true;
const categoryName = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  autofocus: "",
  type: "text",
  onchange: "mNiAc(this, '1')",
  placeholder: "enter category name",
});

const submit = d.createElement("button", "Submit", {
  type: "submit",
});

form.append({ ...label.setChildren("Category Name") }, categoryName, submit);

main.append(loading);

const category = (data) => {
  const children = [];
  const accept = [];
  for (let i = 0; i < data.length; i++) {
    const card = d.createElement("div").setAttribute({
      class: "card2",
      id: "card" + i,
    });
    card.append(data[i][0]);
    children.push(card);
    accept.push(i);
  }
  return { children, accept };
};

const addCategoryRequest = () => {
  submit
    .setChildren("Processing...")
    .changeAttribute("disabled", "")
    .changeAttribute("style", "background: #94d3a2; color: #eee;");
  error.changeAttribute("style", "display: none;");
  success.changeAttribute("style", "display: none;");
  d.post(
    "https://script.google.com/macros/s/AKfycbygUmlp2UhaJPocXT1RRiArfh2paprRKQLivfiTCw/exec",
    {
      type: "8",
      data: JSON.stringify({
        date: "",
        category: categoryName.getAttribute("value")[0],
        id: 0,
        active: 1,
        user: "1212",
      }),
    }
  ).then((res) => {
    res = JSON.parse(JSON.parse(res).messege);
    if (res.result) {
      if (res.messege === "success") {
        succDiv.setChildren("Congratulation! You are successed.");
        success.changeAttribute("style", "display: flex");
        itservices.init();
        d.render("root", itservices);
      } else {
        errDiv.setChildren("Something is wrong!");
        error.changeAttribute("style", "display: flex");
        submit.setChildren("Submit").removeAttribute("disabled", "style");
      }
    }
  });
};
itservices.onload = () => {
  if (main.past) {
    const { children, accept } = category(main.past);
    main.setChildren([title, container.setChildren([...children, addBtn])]);
    for (let i = 0; i < accept.length; i++) {
      document.getElementById("card" + accept[i]).onclick = () => {
        header.category = main.past[i];
        window.location = "#/category";
      };
    }
    document.querySelector(".addBtn").onclick = () => {
      container.removeElement(addBtn);
      container.append(error, success, form);
      document.forms["form"].onsubmit = (e) => {
        e.preventDefault();
        addCategoryRequest();
      };
      for (let i = 0; i < accept.length; i++) {
        document.getElementById("card" + accept[i]).onclick = () => {
          header.category = main.past[i];
          window.location = "#/category";
        };
      }
    };
  }
  d.post(
    "https://script.google.com/macros/s/AKfycbygUmlp2UhaJPocXT1RRiArfh2paprRKQLivfiTCw/exec",
    {
      type: "7",
      data: "{}",
    }
  ).then((res) => {
    res = JSON.parse(JSON.parse(res).messege);
    if (res.result) {
      const { children, accept } = category(res.data);
      if (res.data[0][0] == "") res.data = [[]];
      if (!main.past) main.past = [[]];
      if (compare(main.past, res.data)) {
        if (res.data[0].length) {
          main.setChildren([title, container.setChildren([addBtn])]);
          container.setChildren(
            children.length != 0 ? children.concat(addBtn) : addBtn
          );
          main.past = [...res.data];
          for (let i = 0; i < accept.length; i++) {
            document.getElementById("card" + accept[i]).onclick = () => {
              header.category = main.past[i];
              window.location = "#/category";
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
      document.querySelector(".addBtn").onclick = () => {
        container.removeElement(addBtn);
        container.append(form);
        document.forms["form"].onsubmit = (e) => {
          e.preventDefault();
          addCategoryRequest();
        };
        for (let i = 0; i < accept.length; i++) {
          document.getElementById("card" + accept[i]).onclick = () => {
            header.category = main.past[i];
            window.location = "#/category";
          };
        }
      };
    }
  });

  header.onload();
  form.reset();

  // input change
  const inputList = {
    1: categoryName,
  };
  const changeInput = (v, input) => {
    inputList[input].changeAttributeN("value", v.value);
  };

  window.mNiAc = changeInput;
};

itservices.append(header, menu, main);
export { itservices };
