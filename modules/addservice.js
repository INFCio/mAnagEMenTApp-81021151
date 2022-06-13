import d from "../assets/js/NTechDOM.js";
import { header, menu } from "./header.js";
const addservice = d.createElement("div");
const main = d
  .createElement("main")
  .setAttribute({ class: ["main", "container2"] });
const title = d.createElement("h1");
main.append(title);

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
  style: "margin-bottom: 30px",
});

const label = d.createElement("label");
label._reuse = true;
const serviceTitle = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  type: "text",
  autofocus: "",
  onchange: "mNiAc(this, '1')",
  placeholder: "enter service title",
});

const link = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  type: "text",
  onchange: "mNiAc(this, '2')",
  placeholder: "enter service link",
});

const steps = d.createElement("textarea", "", {
  required: "",
  autocomplete: "off",
  rows: 15,
  onchange: "mNiAc(this, '3')",
  placeholder: "enter complete steps",
});

const requirement = d.createElement("textarea", "", {
  required: "",
  autocomplete: "off",
  rows: 15,
  onchange: "mNiAc(this, '4')",
  placeholder: "enter requirements",
});

const video = d.createElement("input", "", {
  autocomplete: "off",
  type: "text",
  onchange: "mNiAc(this, '5')",
  placeholder: "enter service's video link",
});

const submit = d.createElement("button", "Submit", {
  type: "submit",
});

form.append(
  { ...label.setChildren("Service Title") },
  serviceTitle,
  { ...label.setChildren("Service Link") },
  link,
  { ...label.setChildren("Complete Steps") },
  steps,
  { ...label.setChildren("Requirements") },
  requirement,
  { ...label.setChildren("Video Link") },
  video,
  submit
);

main.append(error, success, form);

const addRequest = () => {
  submit
    .setChildren("Processing...")
    .changeAttribute("disabled", "")
    .changeAttribute("style", "background: #94d3a2; color: #eee;");
  error.changeAttribute("style", "display: none;");
  success.changeAttribute("style", "display: none;");
  d.post(
    "https://script.google.com/macros/s/AKfycbygUmlp2UhaJPocXT1RRiArfh2paprRKQLivfiTCw/exec",
    {
      type: "12",
      data: JSON.stringify({
        date: "",
        title: serviceTitle.getAttribute("value")[0],
        link: link.getAttribute("value")[0],
        steps: steps.getAttribute("value")[0],
        requirement: requirement.getAttribute("value")[0],
        video: video.getAttribute("value")[0],
        category: header.category[1],
        id: "",
        issue: "",
        active: 1,
        user: "1258",
      }),
    }
  ).then((res) => {
    res = JSON.parse(JSON.parse(res).messege);
    if (res.result) {
      if (res.messege === "success") {
        succDiv.setChildren("Congratulation! You are successed.");
        success.changeAttribute("style", "display: flex");
        form.reset();
        d.rerender(form);
        submit.setChildren("Submit").removeAttribute("disabled", "style");
      } else {
        errDiv.setChildren("Something is wrong!");
        error.changeAttribute("style", "display: flex");
        submit.setChildren("Submit").removeAttribute("disabled", "style");
      }
    }
  });
};

addservice.onload = () => {
  if (!header.category) {
    window.location = "#/itservices";
    return 0;
  }
  title.setChildren("Add " + header.category[0] + " Service");
  header.onload();
  form.reset();

  document.forms["form"].onsubmit = (e) => {
    e.preventDefault();
    addRequest();
  };

  // input change
  const inputList = {
    1: serviceTitle,
    2: link,
    3: steps,
    4: requirement,
    5: video,
  };
  const changeInput = (v, input) => {
    inputList[input].changeAttributeN("value", v.value);
  };

  window.mNiAc = changeInput;
};
addservice.append(header, menu, main);

export { addservice };
