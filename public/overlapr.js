//The project specific code to grab Tumblr data
var selectedBlogs = [];

function login(network){
  console.log("network", network);
  hello( network ).login().then( function(r){
    // Get Profile
    hello(network).api('me').then(function(p){
      console.log(p);
      document.getElementById('login').innerHTML = "Connected to "+ network+" as " + p.name;

      //Get all the possible blogs to compare
      var blogButtons = p.blogs.map(function(item){
        return "<button id='" + item.uuid + "' onClick=\"selectBlog('" + item.uuid + "')\">" + item.title + "</button>";
      });

      document.getElementById('blogButtons').innerHTML = "Click the blogs to compare" + blogButtons.join('');
    });
  }, function(e){
    console.error(e);
  });
}

function selectBlog(blogID){
  selectedBlogs.push(blogID);
  //Make sure we only have 2 blogs
  if (selectedBlogs.length > 2){
    selectedBlogs.shift();
  }
  console.log("Selected blogs", selectedBlogs);
}

//////////////////////

function doTheThing(network){
  var followersBlog1 = [],
  followersBlog2 = [];
  
  getFollowers(selectedBlogs[0], 1);
  getFollowers(selectedBlogs[1], 2);

  function getFollowers(blogName, index){
    hello( network ).login({force:false}).then( function(r){

      hello(network).api('blog/' + blogName + "/followers").then(function(r){
        console.log("r", r);

        followersBlog[index] = r.data.users.map(function(item){
          return "<li>"+item.name+"</li>";
        });
      });
    });
  }
  document.getElementById('result').innerHTML = "<h2>followersBlog1</h2><ul>" + followersBlog1.join('') + "</ul>" + "<h2>followersBlog2</h2><ul>" + followersBlog2.join('') + "</ul>";
  console.log("These are the list of followers"+followersBlog1, followersBlog2);
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