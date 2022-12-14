export default `
  <span class="form-header">{{ name }}</span>
  {{{ email }}}
  {{{ login }}}
  {{{ firstName }}}
  {{{ secondName }}}
  {{{ phone }}}
  {{{ password }}}
  {{{ confirmPassword }}}
  <div class="form-footer">
    {{{ button }}}
    <span class="forward">
      <a href={{ link }}>{{ linkTitle }}</a>
    </span>
  </div>
`;
