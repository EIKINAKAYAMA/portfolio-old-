class Admin::ProfilesController < ApplicationController
  def edit
    @user = User.find(params[:user_id])
    @profile = Profile.find(params[:user_id])
  end

  def update
    profile = Profile.find(params[:user_id])
    profile.update(profile_params)

  end

  private
  def profile_params
    params.require(:profile).permit(:user_image,:user_comment).merge(user_id: params[:user_id])
  end
end
