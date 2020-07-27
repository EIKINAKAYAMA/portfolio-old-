class CreateDesigns < ActiveRecord::Migration[5.2]
  def change
    create_table :designs do |t|
      t.string :top_back_image
      t.string :gallery_back_image
      t.string :contact_back_image
      t.string :profile_back_image
      t.references :user,  null:false, foreign_key: true
      t.timestamps
    end
  end
end
