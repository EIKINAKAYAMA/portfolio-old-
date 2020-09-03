class Admin::MovieCategoriesController < Admin::ApplicationController
  def new
  @user = User.find(params[:user_id])
  @movie_category = MovieCategory.new
end
end
