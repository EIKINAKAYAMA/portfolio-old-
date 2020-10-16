class Profile < ApplicationRecord
  belongs_to :user

  validates :user_image, presence: true

  mount_uploader :user_image, ImageUploader
  before_destroy :remove_image

  private
    def remove_image
      user_image.remove!
      user_image.thumb.remove! # サムネイルを持っていない場合は不要
    rescue Exception => e
      logger.error(e.message)
   end
end
