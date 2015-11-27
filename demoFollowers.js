function genDemoFollowers (){
	var demoFollowersBlog = {a:[], b:[]};

	for (var i=0; i<90; i++){
		var randID = Math.floor(Math.random()*1000);

		//push 10 shared random followers to each blog
		if (i%9 === 0){
			var shared = {following: true, name: "sharedBlogFollower" + randID, updated: 1447376836, url: "http://followerBlogA" + randID + ".tumblr.com/"};

			demoFollowersBlog.a.push(shared);
			demoFollowersBlog.b.push(shared);
		}

		//push 90 random followers with unique names to blogA, 80 to blogB
		demoFollowersBlog.a.push({following: true, name: "followerBlogA" + randID, updated: 1447376836, url: "http://followerBlogA" + randID + ".tumblr.com/"});
		if(i<80){
			demoFollowersBlog.b.push({following: true, name: "followerBlogB" + randID, updated: 1447376836, url: "http://followerBlogB" + randID + ".tumblr.com/"});
		}
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