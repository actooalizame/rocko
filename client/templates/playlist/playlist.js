/*Template.playList.rendered = function() {
  var winner = Songs.findOne({approved:true}, {sort: {score: -1}});
  var hook = winner.observeChanges({
    changed: function(id, song){
      var highScore = song.score;
      console.log(highScore);
    }
  });
};*/
Template.playList.helpers({
  'playList': function(){
    return Songs.find({}, {sort: {score: -1, createdAt: -1} });
  },
  'maximum': function(){
    var max = Songs.findOne({checked:true}, {sort:{score: -1}})
    return max.score;
  },
  'selectedClass': function(){
    var songId = this._id;
    var selectedSong = Session.get('selectedSong');
    if( songId == selectedSong ){
      return 'selected'
    }
  },
  'visibleClass': function(){
    var songId = this._id;
    var selectedSong = Session.get('selectedSong');
    if( songId == selectedSong ){
      return 'visible'
    }
  },
  'disableOwnVote': function(){
    var songId = this._id;
    var selectedSong = Session.get('selectedSong');
    var user = Meteor.user()._id;
    var mySong = Songs.findOne(id = songId );
    var creator =  mySong.createdBy;
    var creatorId = creator._id;
    if ( user === creatorId ){
      return 'disabled'
    }
  },
  'disableVote': function(){
    var songId = this._id;
    var selectedSong = Session.get('selectedSong');
    var user = Meteor.user();
    var remainingVotes = user.remaining_votes;
    
    if(remainingVotes <= 0){
      return 'disabled'
    }
  },
  'readyClass': function(){
    var lastCard = Songs.find({current: true});
    var time = Session.get('time');
    if(time>0){
      $(lastCard).addClass('disabled');
    }
  }
});

Template.playList.events({
  'click .card': function(){
    var songId = this._id;
    Session.set('selectedSong', songId);  
  },
  'click .btn-vote': function(){
    var selectedSong = Session.get('selectedSong');
    Meteor.call('vote',selectedSong);
    var user = Meteor.user();
    Meteor.call('decreaseVotes', user);
    
  }
});

/*Template.playList.rendered = function(){
  Tracker.autorun = function(){
  var score = $('.card').first().data('score');
  
  console.log(score);
  }
};*/
  
  

