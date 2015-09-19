/* Plugins */
(function (d,s,scripts){
  var js, fjs = d.getElementsByTagName(s)[0];
  for(var i = 0; i < scripts.length; i++) {
    if(!d.getElementById(scripts[i].id)) {
      js = d.createElement(s);
      js.id = scripts[i].id;
      js.src = scripts[i].url;
      fjs.parentNode.insertBefore(js,fjs);
    }
  }
})(document, 'script', [ {id: 'google-platform', url: '//apis.google.com/js/platform.js'}, {id: 'twitter-wjs', url: '//platform.twitter.com/widgets.js'}, {id: 'facebook-jssdk', url: '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=603267456389915' }, {id: 'instagram-sdk', url: '//tsatchi.com/apps/instagram-widget-builder/b/2f6kDa7c407he35bUSTl6C18619BV24jLg91IbjKlFl9P7GZiWkO7g2i7d35d2A4R60Q1j' }, { id: 'statcounter', url: '//statcounter.com/counter/counter.js' }]); 

/* Analytics */
var sc_project=10571971; 
var sc_invisible=1; 
var sc_security="952925b7"; 

/* Keyboard Events */
window.onkeypress = function(e) {
  this.currentSection = this.currentSection || 0;
  this.$sections = this.$sections || document.getElementsByClassName('section');
  if((e.charCode === 106 || e.keyCode === 40) && this.currentSection < this.$sections.length - 1) {
    window.scrollTo(0, this.$sections[++this.currentSection].offsetTop);
    return false;
  } else if((e.charCode === 107 || e.keyCode === 38) && this.currentSection > 0) {
    window.scrollTo(0, this.$sections[--this.currentSection].offsetTop);
    return false;
  }
};
