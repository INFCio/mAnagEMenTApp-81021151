import d from "../assets/js/NTechDOM.js";
import { header, menu } from "./header.js";
import { loading } from "./loading.js";
const category = d.createElement("div");
const main = d.createElement("main").setAttribute({ class: "main" });
const title = d.createElement("h1");
const container = d
  .createElement("div")
  .setAttribute({ class: ["container2"] });

const addBtn = d.createElement(
  "div",
  d.createElement("button", "Add Service", {
    class: "addBtn",
    onclick: "window.location='#/addservice';",
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

const renameForm = d.createElement("form", "", {
  class: "form",
  name: "renameForm",
  style: "margin-bottom: 30px",
});

const rename = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  type: "text",
  onchange: "mNiAc(this, '1')",
  placeholder: "enter category rename",
});

const label = d.createElement("label");

const renameSubmit = d.createElement("button", "Rename Category", {
  type: "submit",
});

renameForm.append(
  { ...label.setChildren("Category Name") },
  rename,
  renameSubmit
);

const deleteForm = d.createElement("form", "", {
  class: "form",
  name: "deleteForm",
  style: "margin-bottom: 30px",
});

const deleteSubmit = d.createElement("button", "Delete Category", {
  type: "submit",
  class: "deleteBtn",
});

deleteForm.append(deleteSubmit);

main.append(loading);

const link = (value) => {
  if (value.indexOf("https://") < 0) return "http://" + value;
  else if (value.indexOf("http://") < 0) return "http://" + value;
  return value;
};

const services = (data) => {
  const children = [];
  const accept = [];
  for (let i = 0; i < data.length; i++) {
    const card = d.createElement("div").setAttribute({
      class: "card2",
    });
    card.append(
      d.createElement("div", data[i][0], { id: "card" + i }),
      `<svg height="12px" onclick = "window.open('${link(
        data[i][1]
      )}')" version="1.1" viewBox="0 0 20 12" width="20px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink" style="
      margin-left: 10px;
  "><title></title><desc></desc><defs></defs><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#000000" id="Core" transform="translate(-380.000000, -300.000000)"><g id="link" transform="translate(380.000000, 300.000000)"><path d="M6,7 L14,7 L14,5 L6,5 L6,7 L6,7 Z M1.9,6 C1.9,3.7 3.7,1.9 6,1.9 L9,1.9 L9,0 L6,0 C2.7,0 0,2.7 0,6 C0,9.3 2.7,12 6,12 L9,12 L9,10.1 L6,10.1 C3.7,10.1 1.9,8.3 1.9,6 L1.9,6 Z M14,0 L11,0 L11,1.9 L14,1.9 C16.3,1.9 18.1,3.7 18.1,6 C18.1,8.3 16.3,10.1 14,10.1 L11,10.1 L11,12 L14,12 C17.3,12 20,9.3 20,6 C20,2.7 17.3,0 14,0 L14,0 Z" id="Shape"></path></g></g></g></svg>`
    );
    children.push(card);
    accept.push(i);
  }
  return { children, accept };
};

const renameCategoryRequest = () => {
  renameSubmit
    .setChildren("Processing...")
    .changeAttribute("disabled", "")
    .changeAttribute("style", "background: #94d3a2; color: #eee;");
  error.changeAttribute("style", "display: none;");
  d.post(
    "https://script.google.com/macros/s/AKfycbygUmlp2UhaJPocXT1RRiArfh2paprRKQLivfiTCw/exec",
    {
      type: "10",
      data: JSON.stringify({
        id: header.category[1],
        category: rename.getAttribute("value")[0],
        user: "7777",
      }),
    }
  ).then((res) => {
    res = JSON.parse(JSON.parse(res).messege);
    if (res.result) {
      if (res.messege === "success") {
        succDiv.setChildren("Congratulation! You are successed.");
        success.changeAttribute("style", "display: flex");
        renameForm.removeElement(renameSubmit);
        header.category[0] = rename.getAttribute("value")[0];
        title.setChildren(header.category[0] + " Services");
      } else {
        errDiv.setChildren("Something is wrong!");
        error.changeAttribute("style", "display: flex");
        renameSubmit
          .setChildren("Rename Category")
          .removeAttribute("disabled", "style");
      }
    }
  });
};

const deleteCategoryRequest = () => {
  deleteSubmit
    .setChildren("Processing...")
    .changeAttribute("disabled", "")
    .changeAttribute("style", "background: #94d3a2; color: #eee;");
  error.changeAttribute("style", "display: none;");
  d.post(
    "https://script.google.com/macros/s/AKfycbygUmlp2UhaJPocXT1RRiArfh2paprRKQLivfiTCw/exec",
    {
      type: "11",
      data: JSON.stringify({
        id: header.category[1],
        user: "1234",
      }),
    }
  ).then((res) => {
    res = JSON.parse(JSON.parse(res).messege);
    if (res.result) {
      if (res.messege === "success") {
        delete header.category;
        window.location = "#/itservices";
      } else {
        errDiv.setChildren("Something is wrong!");
        error.changeAttribute("style", "display: flex");
        deleteSubmit
          .setChildren("Delete Category")
          .removeAttribute("disabled", "style");
      }
    }
  });
};

category.onload = () => {
  if (!header.category) {
    window.location = "#/itservices";
    return 0;
  }
  title.setChildren(header.category[0] + " Services");
  if (main.past) {
    const { children, accept } = services(main.past);
    main.setChildren([
      title,
      container.setChildren([
        ...children,
        addBtn,
        success,
        error,
        renameForm,
        deleteForm,
      ]),
    ]);
    for (let i = 0; i < accept.length; i++) {
      document.getElementById("card" + accept[i]).onclick = () => {
        header.service = main.past[i];
        window.location = "#/serviceinfo";
      };
    }
    document.forms["renameForm"].onsubmit = (e) => {
      e.preventDefault();
      renameCategoryRequest();
    };
    document.forms["deleteForm"].onsubmit = (e) => {
      e.preventDefault();
      deleteCategoryRequest();
    };
  }
  d.post(
    "https://script.google.com/macros/s/AKfycbygUmlp2UhaJPocXT1RRiArfh2paprRKQLivfiTCw/exec",
    {
      type: "9",
      data: JSON.stringify({
        id: header.category[1],
      }),
    }
  ).then((res) => {
    res = JSON.parse(JSON.parse(res).messege);
    if (res.result) {
      const { children, accept } = services(res.data);
      if (res.data[0][0] == "") res.data = [[]];
      if (!main.past) main.past = [[]];
      if (compare(main.past, res.data)) {
        if (res.data[0].length) {
          main.setChildren([
            title,
            container.setChildren([
              addBtn,
              success,
              error,
              renameForm,
              deleteForm,
            ]),
          ]);
          container.setChildren(
            children.length != 0
              ? children.concat([
                  addBtn,
                  success,
                  error,
                  renameForm,
                  deleteForm,
                ])
              : [success, error, renameForm, deleteForm]
          );
          main.past = [...res.data];
          for (let i = 0; i < accept.length; i++) {
            document.getElementById("card" + accept[i]).onclick = () => {
              header.service = main.past[i];
              window.location = "#/serviceinfo";
            };
          }
        } else {
          delete main.past;
          main.setChildren([
            title,
            container.setChildren([
              addBtn,
              success,
              error,
              renameForm,
              deleteForm,
            ]),
          ]);
        }
      } else {
        if (!main.past[0].length) {
          delete main.past;
          main.setChildren([
            title,
            container.setChildren([
              addBtn,
              success,
              error,
              renameForm,
              deleteForm,
            ]),
          ]);
        }
      }
      document.forms["renameForm"].onsubmit = (e) => {
        e.preventDefault();
        renameCategoryRequest();
      };
      document.forms["deleteForm"].onsubmit = (e) => {
        e.preventDefault();
        deleteCategoryRequest();
      };
    }
  });

  header.onload();

  renameForm.reset();

  // input change
  const inputList = {
    1: rename,
  };
  const changeInput = (v, input) => {
    inputList[input].changeAttributeN("value", v.value);
  };

  window.mNiAc = changeInput;
};

category.append(header, menu, main);

export { category };
