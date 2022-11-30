export default `
  {{{ sideBtn }}}
  <div class="profile">
    <div class="profile-header">
      {{{ avatar }}}
      <div class="profile-title">{{ display }}</div>
    </div>
    <div class="profile-body">
      <form class="profile-form">
        {{{ email }}}
        {{{ login }}}
        {{{ firstName }}}
        {{{ secondName }}}
        {{{ displayName }}}
        {{{ phone }}}
      </form>
    </div>
    <div class="profile-footer">
      {{{ profileChange }}}
      {{{ passwordChange }}}
      {{{ logout }}}
    </div>
  </div>

  {{{ popup }}}
`
