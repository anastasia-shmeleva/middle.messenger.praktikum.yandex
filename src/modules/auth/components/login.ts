import Handlebars from "handlebars";
import "../auth.css"
import template from "../auth.tmpl";
import "../../../components/button/button";

const context = {
  form: "login", 
  name: "Sign in",
  fields: {
    login: "Login",
    password: "Password",
  },
  button_name: "Sign in",
  link: "Create account"
}

const body = document.getElementById("main");

const theTemplate = Handlebars.compile(template);
body && body.insertAdjacentHTML('beforeend', theTemplate(context));
