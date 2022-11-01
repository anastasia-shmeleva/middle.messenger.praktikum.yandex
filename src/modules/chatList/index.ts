import Handlebars from "handlebars";
import template from "./chatList.tmpl";
import "./components/listItem/index";

Handlebars.registerPartial('chatList', template);