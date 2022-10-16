export default `
  <div class="profile-container">
    {{> sideBtn }}
    <div class="profile">
      <div class="profile-header">
        <div class="profile-avatar"></div>
        {{#unless edit}}
          <div class="profile-title">{{ display }}</div>
        {{/unless}}
      </div>
      <div class="profile-body">
        <form class="profile-form">
          {{#if passwordEdit}}
            {{#each password}}
              {{> profileItem key=@key value=this edit=../edit passwordEdit=../passwordEdit }}
            {{/each}}
          {{else}}
            {{#each user_data}}
              {{> profileItem key=@key value=this edit=../edit }}
            {{/each}}
          {{/if}}
        </form>
      </div>
      <div class="profile-footer">
        {{#if edit}}
          {{> button name=button_name }}
        {{else}}
          {{#each actions}}
            <span class="profile__action {{@key}}"><a href="#">{{ this }}</a></span>
          {{/each}}
        {{/if}}
      </div>
    </div>
  </div>
`;
