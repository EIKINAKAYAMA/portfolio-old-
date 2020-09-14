class CategoryMovie < ApplicationRecord
  belongs_to :movie_category
  mount_uploader :video, VideoUploader
  
  validates :video, presence: true
end