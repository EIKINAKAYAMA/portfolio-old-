class CreateCategoryMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :category_movies do |t|
      t.string :image, null:false
      t.references :movie_category,  null:false, foreign_key: true
      t.timestamps
    end
  end
end
