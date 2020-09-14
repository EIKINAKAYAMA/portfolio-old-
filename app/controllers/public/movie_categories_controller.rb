class Public::MovieCategoriesController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @movie_categories =MovieCategory.where(user_id: params[:user_id])
  end
end
