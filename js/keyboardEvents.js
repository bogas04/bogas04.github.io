window.onkeypress = function(e) {
  this.currentSection = this.currentSection || 0;
  this.$sections = this.$sections || document.getElementsByClassName('section');
  if((e.key === "j" || e.keyCode === 40) && this.currentSection < this.$sections.length - 1) {
    window.scrollTo(0, this.$sections[++this.currentSection].offsetTop);
    return false;
  } else if((e.key === "k" || e.keyCode === 38) && this.currentSection > 0) {
    window.scrollTo(0, this.$sections[--this.currentSection].offsetTop);
    return false;
  }
};
