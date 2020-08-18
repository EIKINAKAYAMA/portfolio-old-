class Public::ProfilesController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @profiles = Profile.where(user_id: params[:user_id])
    @profile_back_image = ProfileBackImage.where(design: params[:user_id])

    @profile_back_image_json = @profile_back_image.to_json.html_safe

    respond_to do |format|
      format.html
      format.json
    end
  end
end