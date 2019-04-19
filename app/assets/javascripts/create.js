$(function(){
  function buildHTML(message){
    console.log("hellow")
    var content = message.content ? `${ message.content }` : "";
    var img = message.image_url ? `<img src= ${ message.image_url } class="lower-message__image", width="300px">` : "";
    var html = `<div class="message">
                  <div class="message__upper-info" data-id="${message.id}">
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
  }

  function scrollBottom(){
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({
      scrollTop: position
    }, 300, 'swing');
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var form = new FormData($('#new_message').get(0));
    $.ajax({
      url: location.href,
      type: "POST",
      data: form,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.input-box__text').val('')
      scrollBottom();
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);
    })
  })
})
