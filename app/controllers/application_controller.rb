class ApplicationController < ActionController::Base
  # # if you want to require image when users sign up, use below codes
  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :image]) 
  # end
  # protect_from_forgery with: :exception

  protect_from_forgery with: :null_session
  before_action :configure_permitted_parameters, if: :devise_controller?

  private

  # ログイン後のリダイレクト先
  def after_sign_in_path_for(resource)
    if resource.is_a?(AdminUser)
      admin_users_root_path
    else
      # サインイン時のリダイレクト先をdesign_pathに変更(サインアップ時は案内サイトに飛ばす制御をregistrationsコントローラーに保持する)
      new_admin_user_design_path(resource)
    end
  end

  # ログアウト後のリダイレクト先
  def after_sign_out_path_for(resource)
    if resource == :admin_user
      new_admin_user_session_path
    else
      new_user_session_path
    end
  end



  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, profile_attributes: [:user_image, :user_comment]])
  end
end