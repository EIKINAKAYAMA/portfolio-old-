json.array! @movie_categories do |movie_category|
  json.id movie_category.id
  json.name movie_category.name
  json.category_movies movie_category.category_movies
end