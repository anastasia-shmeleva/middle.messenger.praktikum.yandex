import Handlebars from "handlebars";
import "../auth.css"
import template from "../auth.tmpl";
import "../../../components/button/button";

const context = {
  form: "register",
  name: "Register", 
  fields: {
    email: "Email",
    login: "Login",
    first_name: "Name",
    second_name: "Second name",
    phone: "Phone",
    password: "Password",
    confirm_password: "Confirm password",
  },
  button_name: "Sign up",
  link: "Sign in"
}

const body = document.getElementById("main");

const theTemplate = Handlebars.compile(template);
body && body.insertAdjacentHTML('beforeend', theTemplate(context));
