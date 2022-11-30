import { REGEXP } from "./REGEXP";

export const validate = (e: Event, element: HTMLElement, error: string, show: string): void => {
  const input = e.target as HTMLInputElement;
  const rule = REGEXP[input.name].rule as RegExp;
  const isValid = rule.test(input.value);
  const errorEl = element.querySelector(error);
  if (isValid) {
    if (e.type === "focusout") {
      errorEl?.classList.remove(show);
      errorEl!.textContent = "";
    }
  } else {
    errorEl?.classList.add(show);
    errorEl!.textContent = REGEXP[input.name].error;
  }
}

export const validateOnSubmit = (e: Event) => {
  e.preventDefault();
  const form: Record<string, unknown> = {};
  const inputArr = [...document.querySelectorAll("input")];
  const isValid = inputArr.every(input => REGEXP[input.name].rule.test(input.value));
  if (!isValid) {
    return;
  }
  inputArr.forEach((input: HTMLInputElement) => (form[input.name] = input.value));
  return form;
}

export const validateForm = (inputs: NodeListOf<HTMLInputElement>) => {
  const validated: boolean[] = [];

  if (inputs) {
    inputs.forEach((input) => {
      const rule = REGEXP[input.name].rule as RegExp;
      const isValid = rule.test(input.value);
      validated.push(isValid);
    });
  }

  return !validated.includes(false);
};
