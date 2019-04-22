$(function() {
  function buildUsersHTML(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    $('#user-search-result').append(html);
    return html
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    $('#user-search-result').append(html);
    return html
  }

  function buildAddMemberHTML(userId, userName) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${ userId }'>
                  <p class='chat-group-user__name'>${ userName }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    return html
  }

  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val()
    $.ajax({
      url: "/users",
      type: "GET",
      data: ('keyword=' + input),
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data)
      $('#user-search-result').empty();
      if (data.length !== 0) {
        data.forEach(function(data){
          console.log(data)
          html = buildUsersHTML(data);
        });
      }
      else {
        html = appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function(data){
      alert('ユーザー検索に失敗しました');
    })
    .always(function(data){
      $('#user-search-result').removeAttr('disabled');
    })
  })

  $(document).on("click", '.user-search-add', function () {
    var userId = $(this).attr("data-user-id");
    var userName = $(this).attr("data-user-name");

    $(this).parent().remove();

    var html = buildAddMemberHTML(userId, userName);
    $('#chat-group-users').append(html);
  });

  $(document).on("click", '.user-search-remove', function () {
    $(this).parent().remove();
  });
})
