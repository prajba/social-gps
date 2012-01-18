jQTubeUtil = function(h) {
	function i(a, b, c) {
		var d = {
			"max-results" : b.max || l,
			"start-index" : b.start || u
		};
		if (b.time)
			d.time = b.time;
		a = m(a, d);
		return n(a, b.callback || c)
	}
	function j(a, b) {
		switch (typeof a) {
		case "function":
			return {
				callback : a,
				time : undefined
			};
		case "object":
			var c = {
				max : a.max,
				start : a["start-index"]
			};
			if (b)
				c.time = a.time;
			return c;
		default:
			return {}
		}
	}
	function v(a, b) {
		a = m(w, a);
		return n(a, b)
	}
	function n(a, b) {
		var c = {};
		h.ajax({
			type : "GET",
			dataType : "json",
			url : a,
			success : function(d) {
				if (typeof d != "undefined") {
					var g = [];
					if (d.feed) {
						var e = d.feed, p = d.feed.entry;
						for (entry in p)
							g.push(new q(p[entry]));
						c.startIndex = e.openSearch$startIndex.$t;
						c.itemsPerPage = e.openSearch$itemsPerPage.$t;
						c.totalResults = e.openSearch$totalResults.$t
					} else
						g.push(new q(d.entry));
					c.version = d.version;
					c.searchURL = a;
					c.videos = g;
					typeof b == "function" && b(c)
				}
			},
			error : function(d) {
				throw Exception("couldn't fetch YouTube request : " + a + " : "
						+ d);
			}
		});
		return c
	}
	function m(a, b) {
		var c = "?", d, g = true, e = h.extend({}, b, r);
		for (o in e) {
			b = o;
			d = e[o];
			c += (g ? "" : "&") + b + "=" + d;
			g = false
		}
		return a + c
	}
	var s = function() {
	}, f = s.prototype, l = 10, u = 1, w = "http://gdata.youtube.com/feeds/api/videos";
	MostPopular = "http://gdata.youtube.com/feeds/api/standardfeeds/most_popular";
	MostRecent = "http://gdata.youtube.com/feeds/api/standardfeeds/most_recent";
	TopRated = "http://gdata.youtube.com/feeds/api/standardfeeds/top_rated";
	TopFavs = "http://gdata.youtube.com/feeds/api/standardfeeds/top_favorites";
	RecentlyFeatured = "http://gdata.youtube.com/feeds/api/standardfeeds/recently_featured";
	SuggestURL = "http://suggestqueries.google.com/complete/search";
	Times = [ "today", "this_week", "this_month", "all_time" ];
	OrderBy = [ "relevance", "published", "viewCount", "rating" ];
	var k = {
		q : "",
		orderby : OrderBy[2],
		time : Times[3],
		"max-results" : l
	}, r = {
		key : "",
		format : 5,
		alt : "json",
		callback : "?"
	}, t = {
		hl : "en",
		ds : "yt",
		client : "youtube",
		hjson : "t",
		cp : 1
	};
	f.init = function(a) {
		if (!a.key)
			throw "jQTube requires a key!";
		r.key = a.key;
		if (a.orderby)
			k.orderby = a.orderby;
		if (a.time)
			k.time = a.time;
		if (a.maxResults)
			k["max-results"] = l = a.maxResults;
		if (a.lang)
			t.hl = a.lang
	};
	f.getTimes = function() {
		return Times
	};
	f.getOrders = function() {
		return OrderBy
	};
	f.suggest = function(a, b) {
		a = {
			q : encodeURIComponent(a)
		};
		var c = m(SuggestURL, h.extend({}, t, a));
		h.ajax({
			type : "GET",
			dataType : "json",
			url : c,
			success : function(d) {
				var g = [], e = {};
				for (entry in d[1])
					g.push(d[1][entry][0]);
				e.suggestions = g;
				e.searchURL = c;
				typeof b == "function" && b(e)
			}
		})
	};
	f.search = function(a, b) {
		if (typeof a == "string")
			a = {
				q : encodeURIComponent(a)
			};
		return v(h.extend({}, k, a), b)
	};
	f.video = function(a, b) {
		return n(
				"http://gdata.youtube.com/feeds/api/videos/" + a + "?alt=json",
				b)
	};
	f.mostViewed = function(a, b) {
		return i(
				"http://gdata.youtube.com/feeds/api/standardfeeds/most_viewed",
				j(a, true), b)
	};
	f.mostRecent = function(a, b) {
		return i(MostRecent, j(a, false), b)
	};
	f.mostPopular = function(a, b) {
		return i(MostPopular, j(a, true), b)
	};
	f.topRated = function(a, b) {
		return i(TopRated, j(a, true), b)
	};
	f.topFavs = function(a, b) {
		return i(TopFavs, j(a, true), b)
	};
	var q = function(a) {
		var b = [], c = a.id.$t, d = c.lastIndexOf("/") + 1;
		this.videoId = c.substring(d, c.length);
		this.title = a.title.$t;
		try {
			this.updated = a.updated.$t
		} catch (g) {
			b.push("updated")
		}
		try {
			this.thumbs = a.media$group.media$thumbnail
		} catch (e) {
			b.push("thumbs")
		}
		try {
			this.duration = a.media$group.yt$duration.seconds
		} catch (p) {
			b.push("duration")
		}
		try {
			this.favCount = a.yt$statistics.favoriteCount
		} catch (x) {
			b.push("favCount")
		}
		try {
			this.viewCount = a.yt$statistics.viewCount
		} catch (y) {
			b.push("viewCount")
		}
		try {
			this.category = a.media$group.media$category.$t
		} catch (z) {
			b.push("category")
		}
		try {
			this.description = a.media$group.media$description.$t
		} catch (A) {
			b.push("description")
		}
		try {
			this.keywords = a.media$group.media$keywords.$t
		} catch (B) {
			b.push("keywords")
		}
		this.unavailAttributes = b
	};
	return new s
}(jQuery);