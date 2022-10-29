export default `
  <div class="profile-form__control">
    <label for="{{ key }}">{{ key }}</label>
    {{#if passwordEdit}}
      <input id="{{ key }}" value={{ value }} type="password">
    {{else}}
      {{#if edit}}
        <input id="{{ key }}" value="{{ value }}" >
      {{else}}
        <input id="{{ key }}" value="{{ value }}" disabled >
      {{/if}}
    {{/if}}
  </div>
`