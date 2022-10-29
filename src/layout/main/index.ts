import Handlebars from "handlebars";
import template from "./main.tmpl";
import "../../modules/chat/index";
import "../../modules/chatList/index";

const context = {
  text: "Choose chat to send a message",
  items: [
    {
      name: "Andy", 
      message: "Image", 
      time: "10:45", 
      quantity: "2"
    },
    {
      name: "Julia", 
      message: "Так увлёкся работой по курсу, что совсем забыл его анонсир...", 
      time: "1 September 2021", 
      quantity: ""
    },
  ]
  
}

const body = document.getElementById("main");

const theTemplate = Handlebars.compile(template);
body && body.insertAdjacentHTML('beforeend', theTemplate(context));
