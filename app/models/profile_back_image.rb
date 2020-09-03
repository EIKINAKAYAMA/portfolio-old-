class ProfileBackImage < ApplicationRecord
  belongs_to :design
  mount_uploader :image, ImageUploader

  validates :image, presence: true
end
