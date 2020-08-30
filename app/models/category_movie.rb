class CategoryMovie < ApplicationRecord
  belongs_to :gallery_category
  mount_uploader :image, ImageUploader
end
