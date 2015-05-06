Meteor.startup(function() {
	Session.setDefault("voteAvailable", true);
  Tracker.autorun(function() {
    Meteor.subscribe('users');
    Meteor.subscribe('remainingVotes');
    Meteor.subscribe('remainingSongs');
    });
});

