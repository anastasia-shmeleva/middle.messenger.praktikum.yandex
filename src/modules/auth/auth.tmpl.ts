export default `
  <div class="container">
    <form class="form {{ form }}">
      <span class="form-header">{{ name }}</span>
      {{#each fields}}
        <div class="form__control">
          <input id="{{ @key }}" type="text" placeholder=" ">
          <label for="{{ @key }}">{{ this }}</label>
        </div>
      {{/each}}
      <div class="form-footer">
        {{> button name=button_name }}
        <span class="forward">
          <a href="#">{{ link }}</a>
        </spam>
      </div>
    </form> 
  </div>
`;
