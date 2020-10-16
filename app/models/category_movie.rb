class CategoryMovie < ApplicationRecord
  belongs_to :movie_category
  mount_uploader :video, VideoUploader
  before_destroy :remove_video
  
  validates :video, presence: true
  private

    def remove_video
      video.remove!
      video.thumb.remove! # サムネイルを持っていない場合は不要
    rescue Exception => e
      logger.error(e.message)
    end
end