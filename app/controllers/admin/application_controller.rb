# class ApplicationController < ActionController::Base
class Admin::ApplicationController < ApplicationController
  
  # # if you want to require image when users sign up, use below codes
  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :image]) 
  # end
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

end