import d from "../assets/js/NTechDOM.js";
import { header, menu } from "./header.js";
const addmember = d.createElement("div");
const main = d
  .createElement("main")
  .setAttribute({ class: ["main", "container2"] });
const title = d.createElement("h1", "Add Services Provider");
const container = d.createElement("div").setAttribute({ class: "container2" });
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
});
const label = d.createElement("label");
label._reuse = true;
const username = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  autofocus: "",
  type: "text",
  onchange: "mNiAc(this, '1')",
  placeholder: "enter member name",
});

const mobile = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  autofocus: "",
  type: "number",
  onchange: "mNiAc(this, '2')",
  placeholder: "enter member's mobile number",
});

const email = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  type: "email",
  onchange: "mNiAc(this, '3')",
  placeholder: "enter member's email address",
});

const picture = d.createElement("input", "", {
  required: "",
  type: "file",
  onchange: "mNiAcF(this, '4')",
});

const cv = d.createElement("input", "", {
  required: "",
  type: "file",
  onchange: "mNiAcF(this, '5')",
});

const submit = d.createElement("button", "Submit", {
  type: "submit",
});

form.append(
  { ...label.setChildren("Member Name") },
  username,
  { ...label.setChildren("Mobile Number") },
  mobile,
  { ...label.setChildren("Email Address") },
  email,
  { ...label.setChildren("Picture") },
  picture,
  { ...label.setChildren("CV") },
  cv,
  submit
);

const addBtn = d.createElement(
  "div",
  d.createElement("button", "Add New Member", {
    class: "addBtn",
  }),
  { class: "div" }
);

main.append(error, success, form);
console.log(addmember._loginData?.username);
const addmemberRequest = () => {
  submit
    .setChildren("Processing...")
    .changeAttribute("disabled", "")
    .changeAttribute("style", "background: #94d3a2; color: #eee;");
  error.changeAttribute("style", "display: none;");
  success.changeAttribute("style", "display: none;");
  d.readFiles(picture.getAttribute("file")[0], cv.getAttribute("file")[0]).then(
    (files) => {
      d.post(
        "https://script.google.com/macros/s/AKfycbygUmlp2UhaJPocXT1RRiArfh2paprRKQLivfiTCw/exec",
        {
          type: "2",
          data: JSON.stringify({
            date: "",
            name: username.getAttribute("value")[0],
            mobile: mobile.getAttribute("value")[0],
            email: email.getAttribute("value")[0],
            photo: files[0],
            cv: files[1],
            password: "",
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
            d.getBlobData64(
              "https://ntechcomputer.github.io/management/icon.png"
            ).then((base64) => {
              let str = JSON.stringify(res.data).replace(/"/g, "'");
              let result = "";
              for (let i = 0; i < str.length; i++) {
                let ascii = str[i].charCodeAt();
                result +=
                  parseInt(ascii / 18) + String(ascii % 18).padStart(2, "0");
              }
              result = btoa(result);
              new AwesomeQR({
                text: result,
                size: 1000,
                dotScale: 0.6,
                backgroundImage: base64,
              })
                .draw()
                .then((dataURL) => {
                  form.setChildren(
                    d
                      .createElement("img")
                      .setAttribute({ style: "width: 100%;", src: dataURL })
                  );
                  main.append(addBtn);
                  document.querySelector(".addBtn").onclick = () => {
                    d.render("root", addmember);
                  };
                });
            });
          } else {
            errDiv.setChildren("Something is wrong!");
            error.changeAttribute("style", "display: flex");
            submit.setChildren("Submit").removeAttribute("disabled", "style");
          }
        }
      });
    }
  );
};
addmember.onload = () => {
  header.onload(addmember._loginData);

  form.reset();
  document.forms["form"].onsubmit = (e) => {
    e.preventDefault();
    addmemberRequest();
  };

  // input change
  const inputList = {
    1: username,
    2: mobile,
    3: email,
    4: picture,
    5: cv,
  };
  const changeInput = (v, input) => {
    inputList[input].changeAttributeN("value", v.value);
  };

  const changeInputFile = (v, input) => {
    inputList[input].changeAttributeN("file", v.files[0]);
  };

  window.mNiAc = changeInput;
  window.mNiAcF = changeInputFile;
};
addmember.append(header, menu, main);

export { addmember };
