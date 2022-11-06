export default ` 
  <input 
    id="{{ name}}" 
    type={{ type }} 
    name="{{ name }}"
    value="{{ value }}"
    placeholder=" "
  />
  <label for="{{ name }}">{{ label }}</label>
  <p class='form__error'></p>
`;
