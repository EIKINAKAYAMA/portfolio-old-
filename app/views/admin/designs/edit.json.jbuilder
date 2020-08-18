json.array! @top_back_images do |image|
  json.id image.id
  json.image image.image.url
end