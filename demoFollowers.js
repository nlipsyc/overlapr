function genDemoFollowers (){
	var demoFollowersBlog = {a:[], b:[]};

	for (var i=0; i<80; i++){
		var randID = Math.floor(Math.random()*1000);

		//push 10 shared random followers to each blog
		if (i%8 === 0){
			var shared = {following: true, name: "sharedBlogFollower" + randID, updated: 1447376836, url: "http://followerBlogA" + randID + ".tumblr.com/"};

			demoFollowersBlog.a.push(shared);
			demoFollowersBlog.b.push(shared);
		}

		//push 80 random followers with unique names to each blog
		demoFollowersBlog.a.push({following: true, name: "followerBlogA" + randID, updated: 1447376836, url: "http://followerBlogA" + randID + ".tumblr.com/"});
		demoFollowersBlog.b.push({following: true, name: "followerBlogB" + randID, updated: 1447376836, url: "http://followerBlogB" + randID + ".tumblr.com/"});
	}
	return demoFollowersBlog;
}


//Sample data structure /*
// var sampleData ={

// following: true,
// name: "nmlapp2",
// updated: 1447376836,
// url: "http://nmlapp2.tumblr.com/"
// };