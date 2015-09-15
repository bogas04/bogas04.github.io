window.onkeypress = function(e) {
  console.log(e);
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
