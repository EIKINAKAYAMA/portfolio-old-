class Public::ProfilesController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @profiles = Profile.where(user_id: params[:user_id])
    @designs = Design.where(user_id: params[:user_id]).where.not(profile_back_image: nil)

    @designs_json = @designs.to_json.html_safe

    respond_to do |format|
      format.html
      format.json
    end
  end
end