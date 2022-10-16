export default `
  <div class="container">
    <form class="form {{ form }}">
      <p class="form-header">{{ name }}</p>
      {{#each fields}}
        <div class="form__control">
          <input id="{{ @key }}" type="text" placeholder=" ">
          <label for="{{ @key }}">{{ this }}</label>
        </div>
      {{/each}}
      <div class="form-footer">
        {{> button name=button_name }}
        <p class="forward"><a href="#">{{ link }}</p>
      </div>
    </form> 
  </div>
`;
