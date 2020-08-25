class CreateGalleryCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :gallery_categories do |t|
      t.string :name, null:false
      t.references :user,  null:false, foreign_key: true
      t.timestamps
    end
  end
end
