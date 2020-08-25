class CreateMovieCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :movie_categories do |t|
      t.string :name, null:false
      t.references :user,  null:false, foreign_key: true
      t.timestamps
    end
  end
end
