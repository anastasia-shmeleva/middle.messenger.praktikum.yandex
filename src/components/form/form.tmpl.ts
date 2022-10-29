export default `
  <span class="form-header">{{ name }}</span>
  {{#each fields}}
    {{{ this }}}
  {{/each}}
  <div class="form-footer">
    {{{ button }}}
    <span class="forward">
      <a href={{ link }}>{{ linkTitle }}</a>
    </span>
  </div>
`;