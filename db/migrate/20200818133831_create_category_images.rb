class CreateCategoryImages < ActiveRecord::Migration[5.2]
  def change
    create_table :category_images do |t|
      t.string :image, null:false
      t.references :gallery_category,  null:false, foreign_key: true
      t.timestamps
    end
  end
end
