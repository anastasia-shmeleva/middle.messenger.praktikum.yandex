import Handlebars from "handlebars";
import template from "./profile.tmpl";
import "../../components/sideBtn/sideBtn";
import "../../components/profileItem/profileItem";
import "../../components/button/button";

const context = {
  passwordEdit: true,
  edit: true,
  display: "Ivan",
  user_data: {
    "Email": "pochta@yandex.ru",
    "Login": "ivanivanov",
    "Name": "Ivan", 
    "Second name": "Ivanov",
    "Display name": "Ivan",
    "Phone": "+44 999 999 99 99",
  },
  actions: {
    profile: "Edit details", 
    password: "Change password",
    logout: "Log out",
  },
  password: {
    "Old password": "password",
    "New password": "SomePassword",
    "Confirm password": "SomePassword",
  },
  button_name: "Save",
}

const body = document.getElementById("main");

const theTemplate = Handlebars.compile(template);
body && body.insertAdjacentHTML('beforeend', theTemplate(context));