class Public::DesignsController < Public::ApplicationController
  before_action :set_user

  def index
    # @user = User.find(params[:user_id])
    # @designs = Design.where(user_id: params[:user_id]).select(:top_back_image)
    @top_back_images = TopBackImage.where(design: @user.id)
    @top_back_images_json = @top_back_images.to_json.html_safe

    respond_to do |format|
      format.html
      format.json
    end
  end

  private

  def set_user
    @user = User.key(params[:user_id])
  end

end
