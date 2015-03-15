Router.configure({
  layoutTemplate: 'layout'
});

Router.route('root', {
  template: 'playList',
  path: '/',
  loadingTemplate: "loading",
  waitOn: function() {
     return [
       Meteor.subscribe('approvedSongs')
     ]
  }
  
});

Router.route('userSongs', {
  template: 'userSongs',
  path: '/mis-canciones',
  loadingTemplate: "loading",
  waitOn: function() { return Meteor.subscribe('userSongs');
  }
});

Router.route('player', {
  template: 'player',
  path: '/player',
  waitOn: function() {
     return [
       Meteor.subscribe('playerNextSong')
     ]
  }
});

Router.route('doneSongs', {
  template: 'doneSongs',
  path: '/done',
  waitOn: function() {
     return [
       Meteor.subscribe('doneSongs')
     ]
  }
});

Router.route('admin', {
  template: 'adminSongs',
  path: '/admin399',
  waitOn: function() {
     return [
       Meteor.subscribe('adminSongs')
     ]
  }
});

Router.route('users', {
  template: 'usersList',
  path: '/userslist',
  loadingTemplate: "loading",
  waitOn: function() {
     return [
       Meteor.subscribe('users')
     ]
  }
});









