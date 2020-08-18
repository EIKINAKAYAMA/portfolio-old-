class CreateProfileBackImages < ActiveRecord::Migration[5.2]
  def change
    create_table :profile_back_images do |t|
      t.string :image, null:false
      t.references :design,  null:false, foreign_key: true
      t.timestamps
    end
  end
end
