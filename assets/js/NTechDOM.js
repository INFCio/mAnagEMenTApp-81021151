const NTechDOM = {
  version: "1.0",
  node: 0,
  rendered: false,
  createElement: (element = "div", childrens = [], attributes = {}) => {
    if (attributes.constructor.toString().indexOf("Object") >= 0) {
      for (let x in attributes) {
        if (attributes[x].constructor.toString().indexOf("Array") < 0) {
          attributes[x] = String(attributes[x]).split(" ");
        }
      }
    } else attributes = {};
    const object = {
      _name: element,
      _childrens:
        childrens.constructor.toString().indexOf("Array") >= 0
          ? childrens
          : [childrens],
      _attributes: attributes,
      _reuse: false,
      _ichildrens:
        childrens.constructor.toString().indexOf("Array") >= 0
          ? childrens
          : [childrens],
      _iattributes: {...attributes},
      append(...childrens) {
        this._childrens = this._childrens.concat(childrens);
        if (NTechDOM.rendered && !this._reuse) {
          NTechDOM.rerender(this);
        } else if (!this._rendered) {
          this._ichildrens = this._ichildrens.concat(childrens);
        }
        return this;
      },
      setChildren(childrens) {
        this._childrens =
          childrens.constructor.toString().indexOf("Array") >= 0
            ? childrens
            : [childrens];
        if (NTechDOM.rendered && !this._reuse) {
          NTechDOM.rerender(this);
        } else if (!this._rendered) {
          this._ichildrens =
            childrens.constructor.toString().indexOf("Array") >= 0
              ? childrens
              : [childrens];
        }
        return this;
      },
      getChildren(children) {
        return this._childrens[children] ? this._childrens[children] : "";
      },
      removeChildren(children) {
        let arr = [...this._childrens];
        this._childrens = arr
          .slice(0, children)
          .concat(arr.slice(children + 1, arr.length));
        if (NTechDOM.rendered && !this._reuse) {
          NTechDOM.rerender(this);
        } else if (!this._rendered) {
          arr = [...this._ichildrens];
          this._ichildrens = arr
            .slice(0, children)
            .concat(arr.slice(children + 1, arr.length));
        }
        return this;
      },
      insert(start, ...children) {
        let arr = [...this._childrens];
        this._childrens = [
          ...arr.slice(0, start),
          ...children,
          ...arr.slice(start, arr.length),
        ];
        if (NTechDOM.rendered && !this._reuse) {
          NTechDOM.rerender(this);
        } else if (!this._rendered) {
          arr = [...this._ichildrens];
          this._ichildrens = [
            ...arr.slice(0, start),
            ...children,
            ...arr.slice(start, arr.length),
          ];
        }
        return this;
      },
      removeElement(element) {
        let arr = [...this._childrens];
        for (let children = 0; children < arr.length; children++) {
          if (arr[children].constructor.toString().indexOf("Object") >= 0) {
            if (arr[children]._node == element._node) {
              this._childrens = arr
                .slice(0, children)
                .concat(arr.slice(children + 1, arr.length));
            } else {
              arr[children].removeElement(element);
            }
          }
        }
        if (NTechDOM.rendered && !this._reuse) {
          NTechDOM.rerender(this);
        } else if (!this._rendered) {
          arr = [...this._ichildrens];
          for (let children = 0; children < arr.length; children++) {
            if (arr[children].constructor.toString().indexOf("Object") >= 0) {
              if (arr[children]._node == element._node) {
                this._ichildrens = arr
                  .slice(0, children)
                  .concat(arr.slice(children + 1, arr.length));
              } else {
                arr[children].removeElement(element);
              }
            }
          }
        }
        return this;
      },
      addAttribute(key, ...values) {
        if (this._attributes[key]) {
          this._attributes[key] = [...this._attributes[key], ...values];
        } else {
          this._attributes[key] = values;
        }
        if (NTechDOM.rendered && !this._reuse) {
          NTechDOM.rerender(this);
        } else if(!this._rendered){
          if (this._iattributes[key]) {
            this._iattributes[key] = [...this._iattributes[key], ...values];
          } else {
            this._iattributes[key] = values;
          }
        }
        return this;
      },
      removeAttribute(...keys) {
        for (let x of keys) {
          delete this._attributes[x];
        }
        if (NTechDOM.rendered && !this._reuse) {
          NTechDOM.rerender(this);
        } else if(!this._rendered){
          for (let x of keys) {
            delete this._iattributes[x];
          }
        }
        return this;
      },
      changeAttribute(key, ...values) {
        if (this._attributes[key]) {
          this._attributes[key] = [...values];
        } else {
          this._attributes[key] = values;
        }
        if (NTechDOM.rendered && !this._reuse) {
          NTechDOM.rerender(this);
        } else if(!this._rendered){
          if (this._iattributes[key]) {
            this._iattributes[key] = [...values];
          } else {
            this._iattributes[key] = values;
          }
        }
        return this;
      },
      changeAttributeN(key, ...values) {
        if (this._attributes[key]) {
          this._attributes[key] = [...values];
        } else {
          this._attributes[key] = values;
        }
        if(!this._rendered){
          if (this._iattributes[key]) {
            this._iattributes[key] = [...values];
          } else {
            this._iattributes[key] = values;
          }
          console.log("change", this._name, this._iattributes, this._attributes)
        }
        return this;
      },
      setAttribute(attributes) {
        if (attributes.constructor.toString().indexOf("Object") >= 0) {
          for (let x in attributes) {
            if (attributes[x].constructor.toString().indexOf("Array") < 0) {
              attributes[x] = String(attributes[x]).split(" ");
            }
          }
        } else attributes = {};
        this._attributes = attributes;
        if (NTechDOM.rendered && !this._reuse) {
          NTechDOM.rerender(this);
        } else if(!this._rendered){
          this._iattributes = {...attributes};
          //console.log(this, this._node)
          //console.log("set", this._name, this._iattributes, this._attributes, attributes)
        }
        return this;
      },
      getAttribute(attribute) {
        return this._attributes[attribute] ? this._attributes[attribute] : "";
      },
      _customFunction() {},
      setCustomFunction(_fuction = () => {}) {
        if (_fuction.constructor.toString().indexOf("Function") >= 0)
          this._customFunction = _fuction;
        return this;
      },
      reset() {
        let arr = [...this._childrens];
        for (let children = 0; children < arr.length; children++) {
          if (arr[children].constructor.toString().indexOf("Object") >= 0) {
            if (arr[children]._name == "input") {
              arr[children].changeAttribute("value", "");
            } else {
              arr[children].reset();
            }
          }
        }
        return this;
      },
      init() {
        this._childrens.forEach((value) => {
          if (value.constructor.toString().indexOf("Object") >= 0) {
            value.init();
          }
        });
        this._attributes = {...this._iattributes};
        this._childrens = [...this._ichildrens];
        this._rendered = false;
      },
      _render() {
        //console.log("rander", this._name, this._iattributes, this._attributes)
        let childrens = "";
        this._node = NTechDOM.node++;
        let element = this._name;
        this._rendered = true;
        this._childrens.forEach((value) => {
          if (value.constructor.toString().indexOf("Object") >= 0) {
            childrens += value._render();
          } else {
            childrens += value;
          }
        });
        this._attributes.node = [this._node];
        let _attributes = this._attributes;
        let attributes = "";
        for (let x in _attributes) {
          attributes += x + '="' + _attributes[x].join(" ") + '" ';
        }
        return `<${element} ${attributes}>${childrens}</${element}>`;
      },
      _rerender() {
        let childrens = "";
        this._childrens.forEach((value) => {
          if (value.constructor.toString().indexOf("Object") >= 0) {
            childrens += value._render();
          } else {
            childrens += value;
          }
        });
        return childrens;
      },
    };
    return object;
  },
  render(id = "", element = "") {
    if (id) {
      this.id = id;
      this.element = element;
      document.getElementById(id).innerHTML = element
        ? element._render([])
        : element;
      this.rendered = true;
      element._customFunction();
    }
  },
  rerender(element) {
    const node = document.querySelector(`[node="${element._node}"]`);
    while (node.attributes.length) {
      node.removeAttribute(node.attributes[0].name);
    }
    const attributes = element._attributes;
    for (let x in attributes) {
      node.setAttribute(x, attributes[x].join(" "));
    }
    node.innerHTML = element._rerender();
    element._customFunction();
    //this.render(this.id, this.element)
  },

  // time, post, get, readFiles, getBlobData64
  time() {
    return fetch("https://worldtimeapi.org/api/timezone/Asia/Dhaka").then(
      (_res) => _res.text()
    );
  },
  post(url, data) {
    const form = new FormData();
    for (let x in data) {
      form.append(x, data[x]);
    }
    return fetch(url, {
      method: "POST",
      mode: "cors",
      header: {
        "Content-Type": "application/json",
      },
      body: form,
    }).then((_res) => _res.text());
  },
  get(url) {
    return fetch(url).then((_res) => _res.text());
  },
  readFiles(...files) {
    return new Promise((resolve, reject) => {
      data = [];
      const _reader = (file) => {
        let reader = new FileReader();
        reader.onload = () => {
          data.push(reader.result);
          if (file == files.length - 1) resolve(data);
          else _reader(++file);
        };
        reader.onerror = reject;
        reader.readAsDataURL(files[file]);
      };
      _reader(0);
    });
  },
  getBlobData64(url) {
    return fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((callback) => {
            let reader = new FileReader();
            reader.onload = function () {
              callback(this.result);
            };
            reader.readAsDataURL(blob);
          })
      );
  },
};

export default NTechDOM;
