class Profile < ApplicationRecord
  belongs_to :user
  
  validates :image, presence: true
  validates :body, presence: true
  
  mount_uploader :image, ImageUploader
end
