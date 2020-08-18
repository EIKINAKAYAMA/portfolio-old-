class ProfileBackImage < ApplicationRecord
  belongs_to :design
  mount_uploader :image, ImageUploader
end
