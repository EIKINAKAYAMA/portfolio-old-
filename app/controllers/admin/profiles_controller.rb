class Admin::ProfilesController < ApplicationController
  before_action :set_user

  def edit
    @profile = Profile.find(current_user.id)
  end

  def update
    @profile = Profile.find(current_user.id)
    @profile.update(profile_params)
  end

  private
  def profile_params
    params.require(:profile).permit(:user_image, :user_comment).merge(user_id: current_user.id)
  end

  def set_user
    @user = User.key(params[:user_id])
  end
  
end