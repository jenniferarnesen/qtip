
$( document ).ready(function() {

   var questionData =
       {
           max: 4,
           min: 0,
           decrease: 1
       },
       totalScore = questionData.max,
       reduceScore = function(){
           totalScore = totalScore - questionData.decrease;
           setMaxScoreText();
       },
       setMaxScoreText = function() {
           $(".score").html("Maximum possible score: " + totalScore);
           $(".max-score").attr("min", questionData.min);
           $(".max-score").attr("max", questionData.max);
           $(".max-score").attr("value", totalScore);
       };

   setMaxScoreText();

   $(".tip-button").click(function() {
       if ($(".tip.one").css('display') == 'none') {
           $(".tip.one").show();
          reduceScore();
       }
       else if ($(".tip.two").css('display') == 'none') {
           $(".tip.two").show();
           reduceScore();
       }
       else if ($(".tip.three").css('display') == 'none') {
           $(".tip.three").show();
          reduceScore();
       }
   });

});
