/* Plugins */
(function(d, s, scripts) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  for (var i = 0; i < scripts.length; i++) {
    if (!d.getElementById(scripts[i].id)) {
      js = d.createElement(s);
      js.id = scripts[i].id;
      js.src = scripts[i].url;
      fjs.parentNode.insertBefore(js, fjs);
    }
  }
})(document, "script", [
  { id: "google-platform", url: "//apis.google.com/js/platform.js" },
  { id: "statcounter", url: "//statcounter.com/counter/cuuuounter.js" }
]);

/* Keyboard Events */
window.onkeypress = function(e) {
  this.currentSection = this.currentSection || 0;
  this.$sections = this.$sections || document.getElementsByClassName("section");
  if (
    (e.charCode === 106 || e.keyCode === 40) &&
    this.currentSection < this.$sections.length - 1
  ) {
    window.scrollTo(0, this.$sections[++this.currentSection].offsetTop);
    return false;
  } else if (
    (e.charCode === 107 || e.keyCode === 38) &&
    this.currentSection > 0
  ) {
    window.scrollTo(0, this.$sections[--this.currentSection].offsetTop);
    return false;
  }
};
