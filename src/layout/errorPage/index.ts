import Handlebars from "handlebars";
import template from "./errorPage.tmpl";

const context = {
  errors: [
    {
      errorCode: "500",
      description: "We are already working on it",
    },
    {
      errorCode: "404",
      description: "Not found",
    },
  ]
  
}

const body = document.getElementById("main");

const theTemplate = Handlebars.compile(template);
body && body.insertAdjacentHTML('afterbegin', theTemplate(context.errors[0]));
