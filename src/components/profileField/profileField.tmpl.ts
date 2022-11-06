export default `
  <label for="{{ name }}">{{ label }}</label>
  <input 
    id="{{ name}}" 
    type={{ type }} 
    name="{{ name }}"
    value="{{ value }}"
    placeholder=" "
    {{#unless edit}} disabled {{/unless}}
  />
`
