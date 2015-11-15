// _header event clicks
Template._header.events({
  'click .openFile': function (event) {
    Session.set('fileOpenDialog', true);
  }
});

// sideBarMain helpers
Template.sideBarMain.helpers({
  fileOpenDialog: function () {
    var fileOpenDialog = Session.get('fileOpenDialog');
    return fileOpenDialog;
  }
});

// sideBarMain event clicks
Template.sideBarMain.events({
  'click #closeForm': function (event) {
    Session.set('fileOpenDialog', false);
  },
  'click #submitForm': function (event) {
    // Get the selected file and send to masterParser
    var selectedFile = document.getElementById('openFileForm').files[0];
    masterParser(selectedFile);

    // Close dialog
    Session.set('fileOpenDialog', false);
  }
});
