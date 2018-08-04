$(document).on('turbolinks:load', function() {
$(function(){
  var search_list = $("#user-search-result");

    function  appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name"> ${ user.name }
                  </p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加
                  </a>
                </div>`
    search_list.append(html);
  }
    function appendNoUser(user){
    var html =
        `<div class='chat-group-user clearfix'>${user}</div>`
        $("#user-search-result").append(html)
    }

  $('#user-search-field').on('keyup', function(){
    var input = $("#user-search-field").val();
    if (input == ""){
      $("#user-search-result").empty();
    }
    else{
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $("#user-search-result").empty();
          if (users.length !== 0) {
            users.forEach(function(user){
              appendUser(user);
            });
          }
          else {
            appendNoUser("一致するユーザーはいません。");
          }
        })
      .fail(function() {
         alert('ユーザーの検索に失敗しました。');
      });
    }
  });

 function appendMember(member){
     var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                 <input name='group[user_ids][]' type='hidden' value='${member.id}'>
                 <p class='chat-group-user__name'>${member.name}</p>
                 <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                 </div>`
         $("#chat-group-users").append(html);
         user_result.prepend(html);
   }

 $(document).on("click", ".chat-group-user__btn--add", function(){
       var member = new Object();
       member.name = $(this).prev().text()
       member.id = $(this).attr("data-user-id")
       $(this).parent().remove()
       appendMember(member)
      });

 $("#chat-group-users").on("click", ".js-remove-btn", function(e){
       $(this).parent().remove();
   });
});
})
