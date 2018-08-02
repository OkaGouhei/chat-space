$(document).on('turbolinks:load', function() {
$(function(){
  function buildHTML(message){
  var html = `<div class="main__body__messages__message" data-id="${message.id}">
                <div class="main__body__messages__message__username">
                  ${ message.user_name }
                </div>
                <div class="main__body__messages__message__date">
                  ${ message.created_at }
                </div>
                <div class="main__body__messages__message__content">
                  <p class="lower__message__content">
                  ${ message.content }
                  </p>
                  <div class="lower__message__image">
                  ${ message.image? `<img src = '${ message.image }'>` :""}
                  </div>
                </div>
              </div>`
  return html;
  }

  function scroll(){
    $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight}, 'fast');
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.main__footer__form__input').prop('disabled', false)
      $('#new_message')[0].reset();
      $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight}, 'fast');
      })
    .fail(function(){alert('error');
    })
  })

  var interval = setInterval(function(){
    if (window.location.pathname.match(/\/groups\/\d+\/messages/)) {
    var messageId = $('.main__body__messages__message').last().data('id'); //一番最後にある'main__body__messages__message'というクラスの'id'というデータ属性を取得し、'messageId'という変数に代入
      $.ajax({
         url: location.href,
         type: 'GET',
         data: { id: messageId },
         dataType: 'json'
      })
      .done(function(messages) {
        var html;
        messages.forEach(function(message){
          // console.log(message)
            html = buildHTML(message);
            $('.messages').append(html);
            scroll();
        });
      });
    } else {
    clearInterval(interval);
  }}, 3 * 1000 );
});
})
