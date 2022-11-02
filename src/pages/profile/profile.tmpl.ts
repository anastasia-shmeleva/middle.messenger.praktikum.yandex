export default `
  {{{ sideBtn }}}
  <div class="profile">
    <div class="profile-header">
      {{{ avatar }}}
      {{#unless edit}}
        <div class="profile-title">{{ display }}</div>
      {{/unless}}
    </div>
    <div class="profile-body">
      <form class="profile-form">
      {{#if passwordEdit}}
        {{{ oldPassword }}}
        {{{ newPassword }}}
        {{{ confirmPassword }}}
      {{else}}
        {{{ email }}}
        {{{ login }}}
        {{{ firstName }}}
        {{{ secondName }}}
        {{{ displayName }}}
        {{{ phone }}}
      {{/if}}
      </form>
    </div>
    <div class="profile-footer">
      {{#if edit}}
        {{{ button }}}
      {{else}}
        {{{ profileChange }}}
        {{{ passwordChange }}}
        {{{ logout }}}
      {{/if}}
    </div>
  </div>
`
