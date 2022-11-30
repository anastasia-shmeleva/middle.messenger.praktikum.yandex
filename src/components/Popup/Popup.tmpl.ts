export default `
  <form class="popup-body">
    <p class="popup-title">{{ title }}</p>
    <div class="popup-content">
      {{{ content }}}
    </div>
    <div class="popup-footer">
      {{{ button_save }}}
      {{{ button_cancel }}}
    </div>
  </form>
`