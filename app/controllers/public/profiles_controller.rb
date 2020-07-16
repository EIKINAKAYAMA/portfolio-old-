class Public::ProfilesController < ApplicationController
  def show
    @profiles = Profile.where(user_id: params[:user_id])
  end
end