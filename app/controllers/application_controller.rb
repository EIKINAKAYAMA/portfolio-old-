class ApplicationController < ActionController::Base
  before_action :basic_auth
  
  # # if you want to require image when users sign up, use below codes
  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :image]) 
  # end
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, profile_attributes: [:user_image, :user_comment]])
  end

  private

  # 以下、basic認証用のコード
  def production?
    Rails.env.production?
  end

  def basic_auth
    authenticate_or_request_with_https_basic do |username, password|
      username == ENV["BASIC_AUTH_USER"] && password == ENV["BASIC_AUTH_PASSWORD"]
    end
  end
end