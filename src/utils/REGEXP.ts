interface REGEXP {
  rule: RegExp;
  error: string;
}

export const REGEXP: Record<string, REGEXP> = {
  email: {
    rule: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: "Please, provide valid email",
  },
  login: {
    rule: /^[a-zA-Z0-9_-]{3,20}$/u,
    error: "3 to 20 symbols, no space, only - or _ symbols are allowed",
  },
  first_name: {
    rule: /(^[A-ZА-Я])([Ёёа-яА-Я-]*$)|(^[a-zA-Z-]*$)/,
    error: "Start with capital letter",
  },
  second_name: {
    rule: /(^[A-ZА-Я])([Ёёа-яА-Я-]*$)|(^[a-zA-Z-]*$)/,
    error: "Start with capital letter",
  },
  phone: {
    rule: /^(\(\d{2,}\) ((\d{4}-\d{4})|(9\d{4}-\d{4})))|(\d{2})((9\d{8})|(\d{8}))$/,
    error: "Please, provide valid phone number",
  },
  password: {
    rule: /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,40}$/,
    error: "8 to 40 symbols, at least 1 number, at least one capital letter",
  },
  confirm_password: {
    rule: /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,40}$/,
    error: "8 to 40 symbols, at least 1 number, at least one capital letter",
  },
  message: {
    rule: /(.|\s)*\S(.|\s)*/,
    error: 'Should not be empty',
  },
}
