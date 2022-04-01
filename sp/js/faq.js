$(document).ready( function() {
  $('section').find('.question').each(function(i) {
    $('#faq_offon'+i).hide();
  })
});

function viewAnswer(num) {
  var div_faq = $('#faq_offon' + num);
  var div_question = $('.area' + num).find('.question');
  var div_plusminus = $('.area' + num).find('.plus_minus');

  if(div_faq.is(':visible')) {
    div_faq.hide();
    div_question.css({"background-color": "#ffffff"});
    div_plusminus.css({"background-position": "0 0"});
  }
  else {
    div_faq.show();
    div_question.css({"background-color": "#f6f6f6"});
    div_plusminus.css({"background-position": "0 -23px"});
  }
}