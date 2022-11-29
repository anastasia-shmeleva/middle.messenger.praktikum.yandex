import Block from "./Block";

export enum StoreEvents {
  UPDATED = "updated",
}

export type Indexed<T = unknown> = {
  [key in string]: T;
};

export interface RouteProps {
  rootQuery: string;
}

export interface RouterProps {
  pathname: string;
  block: new(...props: any) => Block;
  props?: RouteProps;
}

export interface User {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string,
}

export interface PasswordData {
  oldPassword: string,
  newPassword: string
}

interface LastMessage {
  user: User,
  time: string,
  content: string,
}

export interface Chat {
  id: number,
  title: string,
  avatar: string | null,
  created_by: number,
  unread_count: number,
  last_message: LastMessage,
}

export interface messageList {
  sentBy: number;
  content: string;
  time: string;
}

export interface State {
  user: User,
  chatList: Chat[],
  currentChatId: number,
  messageList: messageList[],
}

export interface SignUpData {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
}

export interface SignInData {
  login: string,
  password: string,
}