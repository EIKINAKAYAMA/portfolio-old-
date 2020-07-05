class AddImageToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :image, :string, :after => :email
    add_column :users, :body, :text, :after => :email
  end
end
