import cloudbase from '@cloudbase/js-sdk';

var auths = {}

auths.install = function (vue) {
  const app = cloudbase.init({
    env: 'test-8gzsbnsi974ecbea',
  })

  const myauth = app.auth({ persistence: "local" });
  vue.prototype.$auths = myauth;
}

export default auths;

//https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-signinwithemailandpassword