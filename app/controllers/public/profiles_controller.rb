class Public::ProfilesController < ApplicationController
  before_action :set_user

  def index
    @profiles = Profile.where(user_id: @user.id)
    @profile_back_image = ProfileBackImage.where(design: @user.id)

    @profile_back_image_json = @profile_back_image.to_json.html_safe

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