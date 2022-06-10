import d from "../assets/js/NTechDOM.js";
import {menuItemsLists} from "./menuItemsLists.js"
const header = d.createElement("header").setAttribute({class: "header"});

const logo = d.createElement("div", d.createElement("img").setAttribute({class: "logo", src: "./logo.svg", alt: "INFC Logo"}));

header.append(`
<svg class="menuBtn" style="cursor: pointer;" aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true" class="octicon octicon-three-bars">
  <path fill-rule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z"></path>
</svg>`,
logo);

const menu = d.createElement("div", d.createElement("div").setAttribute({class: "nav"}), {class: "menu"});
const nav = d.createElement("nav");

const profile = d.createElement("div").setAttribute({class: "profile"});
const profileImg = d.createElement("img").setAttribute({alt: "profile picture", src:"./assets/img/user.svg"});
const userName = d.createElement("div");
profile.append(profileImg, userName);

const menuItems = d.createElement("div").setAttribute({class: "menuItems"});

nav.append(profile, menuItems);
menu.append(nav);

let menuShow = false;
const menuNavigation = () => {
  if(menuShow){
    document.querySelector(".menu").style.left = "-110%";
  } else{
    document.querySelector(".menu").style.left = "0";
  }
  menuShow = !menuShow;
}

let itemsLists = [];
for(let x in menuItemsLists){
  itemsLists.push(d.createElement("div", x, {onclick: [`window.location='#/${menuItemsLists[x]}'`]}));
}
menuItems.setChildren(itemsLists);

header.onload = (loginData, lists = "") => {
  menuShow = false; 
  document.querySelector(".menuBtn").onclick = menuNavigation;
  document.querySelector(".nav").onclick = menuNavigation;
  console.log(loginData);
  let itemsLists = [];
  for(let x in lists){
    itemsLists.push(d.createElement("div", x, {onclick: `window.location = '#/${lists[x]}'`}));
 }
  if(lists) menuItems.setChildren(itemsLists);
}
export {header, menu};