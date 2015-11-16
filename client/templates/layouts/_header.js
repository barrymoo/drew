Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

/**
 * @description
 * # Header Events
 * Use this for new navbar dropdown entries!
 */
Template._header.events({
  'click .openFile': function (event) {
    Session.set('fileOpenDialog', true);
  }
});

