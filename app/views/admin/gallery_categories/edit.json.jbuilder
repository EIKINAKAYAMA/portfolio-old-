json.array! @gallery_categories do |gallery_category|
  json.id gallery_category.id
  json.name gallery_category.name
  json.category_images gallery_category.category_images
end