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
    hello( network ).login({force:false}).then( function(r){

      hello('tumblr').api('followers').then(function(r){
        console.log("r", r);
          
        var a = r.data.map(function(item){
          return "<li>"+item.name+"</li>";
        });
        document.getElementById('result').innerHTML = "<ul>" + a.join('') + "</ul>";
        console.log("This list of followers"+a);
      });
  });
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