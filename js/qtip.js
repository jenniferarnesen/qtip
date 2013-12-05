$( document ).ready(function() {

	var questionData =
	{
		max: 4,
		min: 0,
		decrease: 1
	},

		totalScore = questionData.max,
		reduceScore = function(){
			totalScore = totalScore - questionData.decrease
		};

	$(".tip-button").click(function() {
		if ($(".tip.one").css('display') == 'none') {
			$(".tip.one").show();
			reduceScore();
			console.log(totalScore);
		}
		else if ($(".tip.two").css('display') == 'none') {
			$(".tip.two").show();
			reduceScore();
			console.log(totalScore);
  		}
  		else if ($(".tip.three").css('display') == 'none') {
  			$(".tip.three").show();
  			reduceScore();
  			console.log(totalScore);
  		}
	});

});