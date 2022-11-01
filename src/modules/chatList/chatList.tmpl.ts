export default `
  <section class="chat-aside">
    <div class="chat-aside__header chat-aside__item-group">
      <div class="chat-img"></div>
      <div class="search-group">
        <div class="search-icon"></div>
        <input type="text" placeholder="Search" name="search" maxlength="30">
      </div>
    </div>
    {{#each items}}
      {{> listItem name=name message=message time=time quantity=quantity }}
    {{/each}}
  </section>
`;