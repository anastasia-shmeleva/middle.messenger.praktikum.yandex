export default `
  <span class="form-header">{{ name }}</span>
  {{{ emailField }}}
  {{{ loginField }}}
  {{{ firstNameField }}}
  {{{ secondNameField }}}
  {{{ phoneField }}}
  {{{ passwordField }}}
  {{{ confirmPasswordField }}}
  <div class="form-footer">
    {{{ button }}}
    <span class="forward">
      <a href={{ link }}>{{ linkTitle }}</a>
    </span>
  </div>
`;
