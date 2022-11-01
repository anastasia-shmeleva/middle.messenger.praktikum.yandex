export default `
  <button 
    class="profile-avatar" 
      {{#if avatar}}
        style="background-image: url( {{ avatar }} )"
      {{/if}}
  ></button>
`