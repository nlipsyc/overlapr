  


////////////////////////////
//
// Vanilla javascript to hit Tumblr API
// @todo Integrate this properly a la React
//
////////////////////////////


//The project specific code to grab Tumblr data

var selectedBlogs = [];

function login(network){
  hello( network ).login().then( function(r){
    // Get Profile
    hello(network).api('me').then(function(p){
      console.log(p);
      document.getElementById('login').innerHTML = "Connected to "+ network+" as " + p.name;

      //Get all the possible blogs to compare
      var blogButtons = p.blogs.map(function(item){
        return "<button id='" + item.uuid + "' onClick=\"selectBlog(\'" + item.uuid + "\', \'" + item.followers + "\')\">" + item.title + "</button>";
      });

      document.getElementById('blogButtons').innerHTML = "Click the blogs to compare" + blogButtons.join('');
    });
  }, function(e){
    console.error(e);
  });
}

function selectBlog(blogID, followersCount){
  selectedBlogs.push({blogID: blogID, followersCount: followersCount});
  //Make sure we only have 2 blogs
  if (selectedBlogs.length > 2){
    selectedBlogs.shift();
  }
}

//////////////////////


function getDemoFollowers(){
  var followersBlog, resultA, resultB, resultOverlap;
  followersBlog = genDemoFollowers(); //genDemoFollowers = {a:[followers], b:[followers]};
  followersOverlap = followersBlog.a.filter(function(val) {
    return followersBlog.b.indexOf(val) != -1;  
  });

  resultA = followersBlog.a.map(function(item){
    return "<li>"+item.name+"</li>";
  });

  resultB = followersBlog.a.map(function(item){
    return "<li>"+item.name+"</li>";  
  });

  resultOverlap = followersOverlap.map(function(item){
    return "<li>"+item.name+"</li>";  
  });


  console.log('overlap', resultOverlap);

  console.log('fblog', followersBlog);

  document.getElementById('resultA').innerHTML = "<h2>Blog A</h2><ol>" + resultA.join('') + "</ol>";

  document.getElementById('resultB').innerHTML = "<h2>Blog B</h2><ol>" + resultB.join('') + "</ol>";

  document.getElementById('resultOverlap').innerHTML = "<h2>Follower overlap</h2><ol>" + resultOverlap.join('') + "</ol>";

}

function doTheThing(network){
  //@todo This still needs to iterate over all the followers
  //      (max number to query at a time is 20)
  var rawFollowersBlog = {1: [], 2:[]},
      followersBlog = {1 : [], 2: []}, //Followers *for* blog a and b
      promises = [];

    getFollowers(selectedBlogs[0], 1); //Blog index [0], to be displayed as Blog 1
    getFollowers(selectedBlogs[1], 2); //Blog index [0], to be displayed as Blog 1


    Q.all(promises)
    .then(function(){
     for (var i = 1; i<=2; i++){
        followersBlog[i] = rawFollowersBlog[i].map(function(item){
        return "<li>"+item.name+"</li>";
        });
        document.getElementById('result' + i).innerHTML = "<h2>followersBlog" + i +"</h2><ol>" + followersBlog[i].join('') + "</ol>";
        console.log("These are the list(s) of followers", followersBlog[1], followersBlog[2]);
     }
     getOverlapFollowers();
     
     console.log('result overlap', resultOverlap);
     document.getElementById('resultOverlap').innerHTML = "<h2>Follower overlap</h2><ol>" + resultOverlap.join('') + "</ol>";

   });


  //  selectedBlogs = [{"blogID": blogID, "followersCount": followersCount},{};

  function getFollowers(blogInfo, i){

   hello( network ).login({force:false}).then( function(r){
    console.log('info, i', blogInfo, i);
    var offsets = [];


    for(var j=0; j < blogInfo.followersCount; j += 20){
      offsets.push(j);
    }

    for (var offset in offsets){
      promises.push(
         //Grab the current batch in parallel
        hello(network).api('blog/' + blogInfo.blogID + '/followers?offset=' + offset).then(function(r){ //login
          //Map the current batch to its own object for later assembly
          console.log("Followers request: r.data", r.data, 'index', i, 'offset', offset);


          rawFollowersBlog[i] = rawFollowersBlog[i].concat(r.data);
        })
        );
    }
    // document.getElementById('result' + i).innerHTML = "<h2>followersBlog" + i +"</h2><ol>" + followersBlog[i].join('') + "</ol>";
    // console.log("These are the list(s) of followers", followersBlog[1], followersBlog[2]);

  });
 }
 function getOverlapFollowers(){
  console.log('followers', followersBlog);
  var followersOverlap = followersBlog[1].filter(function(val) {
    return followersBlog[2].indexOf(val) != -1;  
  });


    // followersOverlap = followersBlog.a.filter(function(val) {
    //   return followersBlog.b.indexOf(val) != -1;  
    // });

  resultOverlap = followersOverlap; //@todo, obviously redundant.  Cut out if possible
  // var resultOverlap = followersOverlap.map(function(item){
  //   return item;  
  // });
}

}


function getPosts(blog){
  hello('tumblr').api('blog/'+blog+'/posts/text?notes_info=true').then(function(r){
    var a = r.data.map(function(item){
      return "<h2>"+item.title+"</h2>"+item.body_abstract;
    });
    document.getElementById('blogs').innerHTML = a.join('');
  });
}

hello.init();