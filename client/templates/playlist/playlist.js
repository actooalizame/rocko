/*Template.playList.rendered = function() {
  var current = Songs.findOne({current: true});
  console.log(current);
  var duration = current.duration;
  Tracker.autorun(function() {
    var interval, timeLeft;
    timeLeft = function() {
      if (duration > 0) {
        duration--;
        console.log(duration);
      }
      else if (duration===0){
        //Meteor.call('setReady', id);
        $('.card').hide();
      }
    };
    interval = Meteor.setInterval(timeLeft, 1000);
    return interval;
  });
};*/


Template.playList.helpers({
  'playList': function(){
    return Songs.find({checked:true, current:false}, {sort: {score: -1, createdAt: -1} });
  },
  'nowPlaying': function(){
    return Songs.find({current:true});
  },
  'selectedClass': function(){
    var songId = this._id;
    var selectedSong = Session.get('selectedSong');
    if( songId == selectedSong ){
      return 'selected';
    }
  },
  'visibleClass': function(){
    var songId = this._id;
    var selectedSong = Session.get('selectedSong');
    if( songId == selectedSong ){
      return 'visible';
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
      return 'disabled';
    }
  },
  'disableVote': function(){
    var songId = this._id;
    var selectedSong = Session.get('selectedSong');
    var user = Meteor.user();
    var remainingVotes = user.remaining_votes;
    
    if(remainingVotes <= 0){
      return 'disabled';
    }
  }/*,
  'ready': function(){
    var current = Songs.findOne({current: true});
    console.log(current);
    var duration = current.duration;
    var interval, timeLeft;
    timeLeft = function() {
      if (duration > 0) {
        duration--;
        console.log(duration);
      }
      else if (duration===0){
        //Meteor.call('setReady', id);
        duration="";
        $('.card').hide();
      }
    };
    interval = Meteor.setInterval(timeLeft, 1000);
    return duration;
  }*/

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

  
  

