import d from "../assets/js/NTechDOM.js";
import { header, menu } from "./header.js";
const memberinfo = d.createElement("div");
const main = d
  .createElement("main")
  .setAttribute({ class: ["main", "container2"] });
const title = d.createElement("h1", "Member's Information");
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

const pictureForm = d.createElement("form", "", {
  class: "form",
  name: "pictureForm",
  style: "margin-bottom: 30px",
});

const infoForm = d.createElement("form", "", {
  class: "form",
  name: "infoForm",
  style: "margin-bottom: 30px",
});

const qrForm = d.createElement("form", "", {
  class: "form",
  style: "margin-bottom: 30px",
});

const resetPasswordForm = d.createElement("form", "", {
  class: "form",
  name: "resetPasswordForm",
  style: "margin-bottom: 30px",
});

const deleteForm = d.createElement("form", "", {
  class: "form",
  name: "deleteForm",
  style: "margin-bottom: 30px",
});

const label = d.createElement("label");
label._reuse = true;
const username = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  type: "text",
  onchange: "mNiAc(this, '1')",
  placeholder: "enter member name",
});

const mobile = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
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

const infoSubmit = d.createElement("button", "Update Infomation", {
  type: "submit",
});

const pictureSubmit = d.createElement("button", "Update Picture", {
  type: "submit",
});

const resetPasswordSubmit = d.createElement("button", "Initialize Password", {
  type: "submit",
});

const deleteSubmit = d.createElement("button", "Delete Member", {
  type: "submit",
  class: "deleteBtn",
});
const memberImg = d
  .createElement("img")
  .setAttribute({ width: "100%", alt: "member img", src: "" });

const qrImg = d
  .createElement("img")
  .setAttribute({ width: "100%", alt: "qr code", src: "" });

const picture = d.createElement("input", "", {
  required: "",
  type: "file",
  onchange: "mNiAcF(this, '4')",
});

pictureForm.append(memberImg, picture, pictureSubmit);

infoForm.append(
  { ...label.setChildren("Member Name") },
  username,
  { ...label.setChildren("Mobile Number") },
  mobile,
  { ...label.setChildren("Email Address") },
  email,
  infoSubmit
);

main.append(
  error,
  success,
  pictureForm,
  infoForm,
  qrForm.append(qrImg),
  resetPasswordForm.append(resetPasswordSubmit),
  deleteForm.append(deleteSubmit)
);

const pictureUpdateRequest = () => {
  pictureSubmit
    .setChildren("Processing...")
    .changeAttribute("disabled", "")
    .changeAttribute("style", "background: #94d3a2; color: #eee;");
  error.changeAttribute("style", "display: none;");
  success.changeAttribute("style", "display: none;");
  d.readFiles(picture.getAttribute("file")[0]).then((files) => {
    d.post(
      "https://script.google.com/macros/s/AKfycbygUmlp2UhaJPocXT1RRiArfh2paprRKQLivfiTCw/exec",
      {
        type: "3",
        data: JSON.stringify({
          photo: files[0],
          name: username.getAttribute("value")[0],
          id: String(header.memberinfo[4]).substr(8),
        }),
      }
    ).then((res) => {
      res = JSON.parse(JSON.parse(res).messege);
      if (res.result) {
        if (res.messege === "success") {
          succDiv.setChildren("Congratulation! You are successed.");
          success.changeAttribute("style", "display: flex");
          memberImg.changeAttribute(
            "src",
            "https://drive.google.com/uc?export=view&id=" +
              res.data.img +
              "&" +
              new Date().getTime()
          );
          pictureForm.removeElement(pictureSubmit);
        } else {
          errDiv.setChildren("Something is wrong!");
          error.changeAttribute("style", "display: flex");
          pictureSubmit
            .setChildren("Picture Update")
            .removeAttribute("disabled", "style");
        }
      }
    });
  });
};

const infoUpdateRequest = () => {
  infoSubmit
    .setChildren("Processing...")
    .changeAttribute("disabled", "")
    .changeAttribute("style", "background: #94d3a2; color: #eee;");
  error.changeAttribute("style", "display: none;");
  success.changeAttribute("style", "display: none;");
  d.post(
    "https://script.google.com/macros/s/AKfycbygUmlp2UhaJPocXT1RRiArfh2paprRKQLivfiTCw/exec",
    {
      type: "4",
      data: JSON.stringify({
        name: username.getAttribute("value")[0],
        mobile: mobile.getAttribute("value")[0],
        email: email.getAttribute("value")[0],
        id: String(header.memberinfo[4]).substr(8),
      }),
    }
  ).then((res) => {
    res = JSON.parse(JSON.parse(res).messege);
    if (res.result) {
      if (res.messege === "success") {
        succDiv.setChildren("Congratulation! You are successed.");
        success.changeAttribute("style", "display: flex");
        infoForm.removeElement(infoSubmit);
      } else {
        errDiv.setChildren("Something is wrong!");
        error.changeAttribute("style", "display: flex");
        infoSubmit
          .setChildren("Update Information")
          .removeAttribute("disabled", "style");
      }
    }
  });
};

const resetPasswordRequest = () => {
  resetPasswordSubmit
    .setChildren("Processing...")
    .changeAttribute("disabled", "")
    .changeAttribute("style", "background: #94d3a2; color: #eee;");
  error.changeAttribute("style", "display: none;");
  success.changeAttribute("style", "display: none;");
  d.post(
    "https://script.google.com/macros/s/AKfycbygUmlp2UhaJPocXT1RRiArfh2paprRKQLivfiTCw/exec",
    {
      type: "5",
      data: JSON.stringify({
        id: String(header.memberinfo[4]).substr(8),
      }),
    }
  ).then((res) => {
    res = JSON.parse(JSON.parse(res).messege);
    if (res.result) {
      if (res.messege === "success") {
        succDiv.setChildren("Congratulation! You are successed.");
        success.changeAttribute("style", "display: flex");
        main.removeElement(resetPasswordForm);
      } else {
        errDiv.setChildren("Something is wrong!");
        error.changeAttribute("style", "display: flex");
        resetPasswordSubmit
          .setChildren("Initialize Password")
          .removeAttribute("disabled", "style");
      }
    }
  });
};

// delete update ...
const deleteRequest = () => {
  deleteSubmit
    .setChildren("Processing...")
    .changeAttribute("disabled", "")
    .changeAttribute("style", "background: #94d3a2; color: #eee;");
  error.changeAttribute("style", "display: none;");
  success.changeAttribute("style", "display: none;");
  d.post(
    "https://script.google.com/macros/s/AKfycbygUmlp2UhaJPocXT1RRiArfh2paprRKQLivfiTCw/exec",
    {
      type: "6",
      data: JSON.stringify({
        id: String(header.memberinfo[4]).substr(8),
      }),
    }
  ).then((res) => {
    res = JSON.parse(JSON.parse(res).messege);
    if (res.result) {
      if (res.messege === "success") {
        window.location = "#/ntech";
      } else {
        errDiv.setChildren("Something is wrong!");
        error.changeAttribute("style", "display: flex");
        resetPasswordSubmit
          .setChildren("Delete Member")
          .removeAttribute("disabled", "style");
      }
    }
  });
};

memberinfo.onload = () => {
  if (!header.memberinfo) {
    window.location = "#/ntech";
    return 0;
  }
  header.onload(memberinfo._loginData);
  infoForm.reset();
  pictureForm.reset();
  let url =
    "https://drive.google.com/uc?export=view&id=" +
    header.memberinfo[3] +
    "&" +
    new Date().getTime();

  memberImg.changeAttribute("src", url);
  username.changeAttribute("value", header.memberinfo[0]);
  mobile.changeAttribute("value", header.memberinfo[1]);
  email.changeAttribute("value", header.memberinfo[2]);
  d.getBlobData64("https://ntechcomputer.github.io/management/icon.png").then(
    (base64) => {
      const data = { id: header.memberinfo[4], type: "memberId" };
      let str = JSON.stringify(data).replace(/"/g, "'");
      let result = "";
      for (let i = 0; i < str.length; i++) {
        let ascii = str[i].charCodeAt();
        result += parseInt(ascii / 18) + String(ascii % 18).padStart(2, "0");
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
          qrImg.changeAttribute("src", dataURL);
        });
    }
  );
  document.forms["pictureForm"].onsubmit = (e) => {
    e.preventDefault();
    pictureUpdateRequest();
  };

  document.forms["infoForm"].onsubmit = (e) => {
    e.preventDefault();
    infoUpdateRequest();
  };

  document.forms["resetPasswordForm"].onsubmit = (e) => {
    e.preventDefault();
    resetPasswordRequest();
  };

  document.forms["deleteForm"].onsubmit = (e) => {
    e.preventDefault();
    deleteRequest();
  };

  // input change
  const inputList = {
    1: username,
    2: mobile,
    3: email,
    4: picture,
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
memberinfo.append(header, menu, main);

export { memberinfo };
