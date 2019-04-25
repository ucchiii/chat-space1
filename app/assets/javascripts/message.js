$(function() {
  var buildMessageHTML = function(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image } class="lower-message__image", width="300px">` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info--talker">
                      ${ message.user_name }
                    </div>
                    <div class="message__upper-info--date">
                      ${ message.created_at }
                    </div>
                  </div>
                  <div class="lower-message">
                      <p class="lower-message__content">
                        ${content}
                      </p>
                        ${img}
                  </div>
                </div>`
    return html;
  };
    function scrollBottom(){
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({
      scrollTop: position
    }, 300, 'swing');
  }
  var reloadMessages = function() {
    var last_message_id = $('.message:last').attr('data-message-id');
    var groupId = $(".main-header__left-box--current-group").attr("data-group-id")
    $.ajax({
      url: "/groups/" + groupId + "/api/messages",
      type: 'get',
      dataType: 'json',
      data:{
        id: last_message_id
      } 
    })
    .done(function(data) {
      if (data.length !== 0) {
        data.forEach(function(data){
          html = buildMessageHTML(data);
        });
        $('.messages').append(html)
        scrollBottom();
      }
    })
    .fail(function() {
    });
  };
  setInterval(reloadMessages, 10000);
});
