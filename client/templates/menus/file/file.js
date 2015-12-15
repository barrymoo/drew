/**
 * @description
 * # File Menu Events
 */
Template.file.events ({
  'click #submitForm': function (event) {
    // Get the selected file and send to masterParser
    var selectedFile = document.getElementById ('openFileForm').files[0];
    masterParser (selectedFile);
  },
  'click #caffeine': function (event) {
    xyzParser(Molecules.findOne({name: 'caffeine'}).fileContents);
  }
});