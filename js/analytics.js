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
})(document, 'script', [ {id: 'google-platform', url: '//apis.google.com/js/platform.js'}, {id: 'twitter-wjs', url: '//platform.twitter.com/widgets.js'}, {id: 'facebook-jssdk', url: '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=603267456389915' }, {id: 'instagram-sdk', url: '//tsatchi.com/apps/instagram-widget-builder/b/2f6kDa7c407he35bUSTl6C18619BV24jLg91IbjKlFl9P7GZiWkO7g2i7d35d2A4R60Q1j' }]); 

var sc_project=10571971; 
var sc_invisible=1; 
var sc_security="952925b7"; 
var scJsHost = (("https:" == document.location.protocol) ?
                "https://secure." : "http://www.");
document.write("<sc"+"ript type='text/javascript' src='" + scJsHost+
               "statcounter.com/counter/counter.js'></"+"script>");
