/*
*	jQuery Tweet v0.1
*	written by Diego Peralta
*
*	Copyright (c) 2010 Diego Peralta (http://www.bahiastudio.net/)
*	Dual licensed under the MIT (MIT-LICENSE.txt)
*	and GPL (GPL-LICENSE.txt) licenses.
*	Built using jQuery library 
*
*	Options:
*		- before (string): HTML code before the tweet.
*		- after (string): HTML code after the tweet.
*		- tweets (numeric): number of tweets to display.
*	
*	Example: 
*	
*		<script type="text/javascript" charset="utf-8">
*   		$(document).ready(function() {
*      			$('#tweets').tweets({
*          			tweets:4,
*          			username: "diego_ar"
*      			});
*  			});
*		</script>
*
*/
(function($){
	$.fn.tweets = function(options) {
		$.ajaxSetup({ cache: true });
		var defaults = {
			tweets: 5,
			before: "<li>",
			after: "</li>"
		};
		var options = $.extend(defaults, options);
		return this.each(function() {
			var obj = $(this);
			$.getJSON('http://search.twitter.com/search.json?callback=?&rpp='+options.tweets+'&q=from:'+options.username,
		        function(data) {
		            $.each(data.results, function(i, tweet) {
		                if(tweet.text !== undefined) {
		                    $(obj).append(options.before+linkify(tweet.text)+options.after);
		                }
		            });
		        }
		    );
		});
	};

        function linkify(text) {
             var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
             return text.replace(exp,"<a href='$1'>$1</a>");
        }
function atify(text) {
             var exp = /(\b@([a-zA-Z0-9_]+)/ig;
             return text.replace(exp,"<a href="http://twitter.com/$1" target="_blank">@$1<\/a>");
        }
})(jQuery);