class Profile < ApplicationRecord
  belongs_to :user

  validates :user_image, presence: true

  mount_uploader :user_image, ImageUploader

end
