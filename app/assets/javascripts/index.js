$(function() {
  function buildHTML(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    return html
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
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
      $('#user-search-result').empty();
      if (data.length !== 0) {
        data.forEach(function(data){
          html = buildHTML(data);
        });
      }
      else {
        html = appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
      $('#user-search-result').append(html);
    })
    .fail(function(data){
      alert('ユーザー検索に失敗しました');
    })
    .always(function(data){
      $('#user-search-result').removeAttr('disabled');
    })
  })
})
