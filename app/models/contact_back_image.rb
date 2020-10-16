class ContactBackImage < ApplicationRecord
  belongs_to :design
  mount_uploader :image, ImageUploader
  before_destroy :remove_image

  validates :image, presence: true

  private

    def remove_image
      image.remove!
      image.thumb.remove! # サムネイルを持っていない場合は不要
    rescue Exception => e
      logger.error(e.message)
    end
end
