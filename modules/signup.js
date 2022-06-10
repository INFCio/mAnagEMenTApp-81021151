import d from "../assets/js/NTechDOM.js";
import { loading } from "./loading.js";
import { login } from "./login.js";

const signup = d.createElement("div").setAttribute({ class: "container" });

const header = d.createElement(
  "header",
  `
<svg class="icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 1000 800" style="enable-background:new 0 0 1000 800;" xml:space="preserve"><style type="text/css">.st1105 {fill: #0063F2;}.st1106 {fill: #762CC4;}.st1110 {fill: #1AAD36;}.st1111 {fill: #CC1D1D;}</style><g xmlns="http://www.w3.org/2000/svg"><g><path class="st1105" d="M230.02,740.85L230.02,740.85c70.6,0,127.84-57.23,127.84-127.84V359.75H230.02V740.85z"/></g><g><path class="st1106" d="M874.47,392.57c0,70.6-57.24,127.84-127.84,127.84h-74.29V392.57H874.47z"/></g><g><path class="st1105" d="M672.34,267.41V613c0,16.94-3.29,33.11-9.27,47.89c-36.88-9.76-76.95-24.84-118.57-44.82V267.41H383.31    V139.57H544.5c52.95,0,98.38,32.19,117.79,78.09C668.76,232.95,672.34,249.77,672.34,267.41z"/></g><g><path class="st1105" d="M663.07,660.89c-6.49,16.06-16.14,30.47-28.17,42.51c-1.9,1.9-3.84,3.73-5.85,5.47    c-22.53,19.9-52.14,31.97-84.54,31.97V616.07C586.12,636.05,626.19,651.13,663.07,660.89z"/></g><g><path class="st1106" d="M624.15,139.57c42.61,26.64,71.02,73.99,71.02,127.85h128.95c35.3,0,67.27-14.31,90.39-37.45    c23.14-23.14,37.45-55.09,37.45-90.39H624.15z"/></g><g><path class="st1110" d="M855.67,680.33c-36.78,50.43-121.78,57.76-226.63,28.54c-27.02-7.53-55.37-17.48-84.54-29.77    c-60.08-25.26-123.71-60.38-186.64-104.33c-6.49-4.52-12.96-9.14-19.41-13.86c-39.5-28.81-75.82-59.1-108.43-89.95    C82.74,331.62,11.3,180.95,66.81,104.83c53.82-73.75,210.69-55.35,382,34.74h-5.87c-139.55-67.12-261.82-79.26-304.47-20.83    c-39.68,54.4-0.06,155.84,91.55,260.25c35.37,40.36,78.51,81.15,127.84,119.85c9.89,7.75,20.03,15.42,30.39,22.99    c52.38,38.2,105.47,69.88,156.25,94.25c41.62,19.98,81.69,35.06,118.57,44.82c86.53,22.92,155.43,16.61,185.26-24.32    c20.33-27.89,19.82-68.14,2.15-114.82C879.5,586.05,883.34,642.43,855.67,680.33z"/></g><g><path class="st1111" d="M230.02,248.6v18.81h127.84V139.57h-18.81C278.84,139.57,230.02,188.38,230.02,248.6z"/></g></g></svg>
`
);
const h1 = d.createElement("h1", "Sign Up to INFC");
header.append(h1);

const main = d.createElement("main");

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
  class: "signup-form",
  name: "signup-form",
});
const label = d.createElement("label");
label._reuse = true;
const username = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  autofocus: "",
  type: "text",
  onchange: "mNiAc(this, '1')",
  placeholder: "enter your username",
});
const email = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  type: "email",
  onchange: "mNiAc(this, '2')",
  placeholder: "enter your email address",
});
const password = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  type: "password",
  onchange: "mNiAc(this, '3')",
  placeholder: "enter your password",
});
const conPassword = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  type: "password",
  onchange: "mNiAc(this, '4')",
  placeholder: "enter your confirm password",
});
const otp = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  type: "number",
  onchange: "mNiAc(this, '5')",
  placeholder: "enter your otp",
});
const span = d.createElement("span", "Send Again OTP", {
  class: "otp",
  style: "cursor: pointer",
});
const submit = d.createElement("button", "Send OTP", {
  type: "submit",
});

form.append(
  { ...label.setChildren("User Name") },
  username,
  { ...label.setChildren("Email Address") },
  email,
  { ...label.setChildren("Password") },
  password,
  { ...label.setChildren("Confirm Password") },
  conPassword,
  submit
);

main.append(
  error,
  success,
  form,
  d.createElement("div", "", { class: "footer" }).setChildren(
    d.createElement("div", [
      "Already have an acount? ",
      d.createElement("span", "Login", {
        class: "login",
        style: "cursor: pointer;",
      }),
    ])
  )
);

const onload = () => {
  document.querySelector(".container").style.minHeight = window.innerHeight;
  form.reset();
  document.forms["signup-form"].onsubmit = (e) => {
    e.preventDefault();
    signupRequest();
  };
  document.querySelector(".login").onclick = () => {
    window.location = "#/login";
  };

  // input change
  const inputList = {
    1: username,
    2: email,
    3: password,
    4: conPassword,
    5: otp,
  };
  const changeInput = (v, input) => {
    inputList[input].changeAttributeN("value", v.value);
  };

  window.mNiAc = changeInput;
};

signup.setCustomFunction(onload);

signup.append(header, main);

const signupRequest = () => {
  submit
    .setChildren("Processing...")
    .changeAttribute("disabled", "")
    .changeAttribute("style", "background: #94d3a2; color: #eee;");
  error.changeAttribute("style", "display: none;");
  success.changeAttribute("style", "display: none;");
  if (
    password.getAttribute("value")[0] !== conPassword.getAttribute("value")[0]
  ) {
    setTimeout(function () {
      errDiv.setChildren("Confirm Password doesn't match!");
      error.changeAttribute("style", "display: flex");
      submit.setChildren("Send OTP").removeAttribute("disabled", "style");
    }, 500);
  } else {
    if (otp._rendered) {
      d.post(
        "https://script.google.com/macros/s/AKfycbylPYEYUxWhqvbtHLnZ6om62iW0eDrZt7IsbqLJM2sIxH0A3QU/exec",
        {
          type: "2",
          data: JSON.stringify({
            username: username.getAttribute("value")[0],
            email: email.getAttribute("value")[0],
            password: password.getAttribute("value")[0],
            otp: otp.getAttribute("value")[0],
          }),
        }
      ).then((res) => {
        res = JSON.parse(JSON.parse(res).messege);
        if (res.result) {
          if (res.messege === "success") {
            succDiv.setChildren("Congratulation! You are successed.");
            success.changeAttribute("style", "display: flex");
            form.removeElement(submit).removeElement(span);
          } else if (res.messege === "email") {
            errDiv.setChildren("User Email already exist!");
            error.changeAttribute("style", "display: flex");
            submit.setChildren("Sign Up").removeAttribute("disabled", "style");
          } else if (res.messege === "otp") {
            errDiv.setChildren("OTP isn't correct!");
            error.changeAttribute("style", "display: flex");
            submit.setChildren("Sign Up").removeAttribute("disabled", "style");
          }
        }
      });
    } else {
      sendOpt();
    }
  }
};

const sendOpt = () => {
  if (otp._rendered) {
    submit
      .setChildren("Processing...")
      .changeAttribute("disabled", "")
      .changeAttribute("style", "background: #94d3a2; color: #eee;");
    error.changeAttribute("style", "display: none;");
    success.changeAttribute("style", "display: none;");
    form.removeElement(span);
  }
  d.post(
    "https://script.google.com/macros/s/AKfycbylPYEYUxWhqvbtHLnZ6om62iW0eDrZt7IsbqLJM2sIxH0A3QU/exec",
    {
      type: "3",
      data: JSON.stringify({
        email: email.getAttribute("value")[0],
      }),
    }
  ).then((res) => {
    //console.log(res);
    res = JSON.parse(JSON.parse(res).messege);
    if (res.result) {
      if (res.messege === "success") {
        if (!otp._rendered) {
          form.insert(9, { ...label.setChildren("OTP") }, otp, span);
          document.querySelector(".otp").onclick = (e) => {
            sendOpt();
          };
        }
        succDiv.setChildren("An OTP has been sent to your email.");
        success.changeAttribute("style", "display: flex");
        submit.setChildren("Sign Up").removeAttribute("disabled", "style");
      }
    }
  });
};

export { signup };
