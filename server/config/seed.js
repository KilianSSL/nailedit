/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Article = require('../api/article/article.model');

// Creating 2 dummy users
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@nailedit.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@nailedit.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');

      // create demo articles for admin user, therefor we need the admin users ID
      console.log('finding admin user');
      User.find({name:'Admin'},createArticle);
    }
  );
});

// Creating 3 fake articles with some comments and some up / downvotes
var createArticle = function(err,users) {
  Article.find({}).remove(function() {
    Article.create({
        title : 'First article',
        description : 'Whatever!',
        url: "http://www.google.com",
        category:'other',
        comments:[],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },
      {
        title : 'Second article',
        description : 'Freilebende Gummibärchen gibt es nicht. Man kauft sie in Packungen an der Kinokasse. Dieser Kauf ist der Beginn einer fast erotischen und sehr ',
        url: "http://www.facebook.com",
        category:'sport',
        comments:[
          {text:'Erster Kommentar',_user:users[0]._id},
          {text:'Zweiter Kommentar',_user:users[0]._id}
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },
      {
        title : 'Third article',
        description : 'Freilebende Gummibärchen gibt es nicht. Man kauft sie in Packungen an der Kinokasse. Dieser Kauf ist der Beginn einer fast erotischen und sehr ',
        url: "http://www.twitter.com",
        category:'news',
        comments:[
          {text:'Erster Kommentar',_user:users[0]._id},
          {text:'Zweiter Kommentar',_user:users[0]._id},
          {text:'Dritter Kommentar',_user:users[0]._id},
          {text:'Vierter Kommentar',_user:users[0]._id}
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },{
        title : 'First article',
        description : 'Whatever!',
        url: "http://www.google.com",
        category:'gadgets',
        comments:[
          {text:'Erster Kommentar',_user:users[0]._id},
          {text:'Zweiter Kommentar',_user:users[0]._id},
          {text:'Dritter Kommentar',_user:users[0]._id},
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },
      {
        title : 'Second article',
        description : 'Whatever!',
        url: "http://www.facebook.com",
        category:'social',
        comments:[
          {text:'Erster Kommentar',_user:users[0]._id},
          {text:'Zweiter Kommentar',_user:users[0]._id}
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },
      {
        title : 'Third article',
        description : 'Freilebende Gummibärchen gibt es nicht. Man kauft sie in Packungen an der Kinokasse. Dieser Kauf ist der Beginn einer fast erotischen und sehr  ',
        url: "http://www.twitter.com",
        category:'social',
        comments:[
          {text:'Erster Kommentar',_user:users[0]._id},
          {text:'Zweiter Kommentar',_user:users[0]._id},
          {text:'Dritter Kommentar',_user:users[0]._id},
          {text:'Vierter Kommentar',_user:users[0]._id}
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },{
        title : 'First article',
        description : 'Whatever!',
        url: "http://www.google.com",
        category:'other',
        comments:[
          {text:'Erster Kommentar',_user:users[0]._id},
          {text:'Zweiter Kommentar',_user:users[0]._id},
          {text:'Dritter Kommentar',_user:users[0]._id},
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },
      {
        title : 'Second article',
        description : 'Whatever!',
        url: "http://www.facebook.com",
        category:'news',
        comments:[
          {text:'Erster Kommentar'},
          {text:'Zweiter Kommentar'}
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },
      {
        title : 'Third article',
        description : 'Whatever!',
        url: "http://www.twitter.com",
        category:'sport',
        comments:[
          {text:'Erster Kommentar',_user:users[0]._id},
          {text:'Zweiter Kommentar',_user:users[0]._id},
          {text:'Dritter Kommentar',_user:users[0]._id},
          {text:'Vierter Kommentar',_user:users[0]._id}
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },{
        title : 'First article',
        description : 'Whatever!',
        url: "http://www.google.com",
        category:'other',
        comments:[
          {text:'Erster Kommentar',_user:users[0]._id},
          {text:'Zweiter Kommentar',_user:users[0]._id},
          {text:'Dritter Kommentar',_user:users[0]._id},
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },
      {
        title : 'Second article',
        description : 'Whatever!',
        url: "http://www.facebook.com",
        category:'gadgets',
        comments:[
          {text:'Erster Kommentar',_user:users[0]._id},
          {text:'Zweiter Kommentar',_user:users[0]._id}
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },
      {
        title : 'Third article',
        description : 'Freilebende Gummibärchen gibt es nicht. Man kauft sie in Packungen an der Kinokasse. Dieser Kauf ist der Beginn einer fast erotischen und sehr ',
        url: "http://www.twitter.com",
        category:'news',
        comments:[
          {text:'Erster Kommentar',_user:users[0]._id},
          {text:'Zweiter Kommentar',_user:users[0]._id},
          {text:'Dritter Kommentar',_user:users[0]._id},
          {text:'Vierter Kommentar',_user:users[0]._id}
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },{
        title : 'First article',
        description : 'Whatever!',
        url: "http://www.google.com",
        category:'social',
        comments:[
          {text:'Erster Kommentar',_user:users[0]._id},
          {text:'Zweiter Kommentar',_user:users[0]._id},
          {text:'Dritter Kommentar',_user:users[0]._id},
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },
      {
        title : 'Second article',
        description : 'Whatever!',
        url: "http://www.facebook.com",
        category:'news',
        comments:[
          {text:'Erster Kommentar',_user:users[0]._id},
          {text:'Zweiter Kommentar',_user:users[0]._id}
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },
      {
        title : 'Third article',
        description : 'Whatever!',
        url: "http://www.twitter.com",
        category:'social',
        comments:[
          {text:'Erster Kommentar',_user:users[0]._id},
          {text:'Zweiter Kommentar',_user:users[0]._id},
          {text:'Dritter Kommentar',_user:users[0]._id},
          {text:'Vierter Kommentar',_user:users[0]._id}
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },{
        title : 'First article',
        description : 'Freilebende Gummibärchen gibt es nicht. Man kauft sie in Packungen an der Kinokasse. Dieser Kauf ist der Beginn einer fast erotischen und sehr ',
        url: "http://www.google.com",
        category:'sport',
        comments:[
          {text:'Erster Kommentar',_user:users[0]._id},
          {text:'Zweiter Kommentar',_user:users[0]._id},
          {text:'Dritter Kommentar',_user:users[0]._id},
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },
      {
        title : 'Second article',
        description : 'Whatever!',
        url: "http://www.facebook.com",
        category:'other',
        comments:[
          {text:'Erster Kommentar',_user:users[0]._id},
          {text:'Zweiter Kommentar',_user:users[0]._id}
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      },
      {
        title : 'Third article',
        description : 'Whatever!',
        url: "http://www.twitter.com",
        category:'other',
        comments:[
          {text:'Erster Kommentar',_user:users[0]._id},
          {text:'Zweiter Kommentar',_user:users[0]._id},
          {text:'Dritter Kommentar',_user:users[0]._id},
          {text:'Vierter Kommentar',_user:users[0]._id}
        ],
        upvotes:[],
        downvotes:[],
        _user:users[0]._id
      }, function() {
        console.log('finished populating articles');
      }
    );
  });
};





