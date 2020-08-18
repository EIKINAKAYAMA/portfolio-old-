class Public::DesignsController < Public::ApplicationController

  def index
    # @user = User.find(params[:user_id])
    # @designs = Design.where(user_id: params[:user_id]).select(:top_back_image)
    @top_back_images = TopBackImage.where(design: params[:user_id])
    @top_back_images_json = @top_back_images.to_json.html_safe

    respond_to do |format|
      format.html
      format.json
    end
  end
end
