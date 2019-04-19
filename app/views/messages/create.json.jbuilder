
  json.id @message.id
  json.content @message.content
  json.image_url @message.image.url
  json.user_id @message.user_id
  json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
  json.user_name @message.user.name

