# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :save_user_info_to_session, only: :user_tel
  # before_action :save_user_tel_to_session, only: :user_tel_verification
  # before_action :send_sms_code, only: :user_tel_verification
  # before_action :check_sms_code, only: :profile
  # before_action :save_profile_to_session, only: :create

  # def user_info #1ページ目(userテーブル)
  #   @user = User.new
  #   @user.build_profile
  # end

  # def save_user_info_to_session #1ページ目登録後に呼び出し、sessionに値を渡す
  #   session[:user_params] = user_params
  #   @user = User.new(session[:user_params]) # インスタンス作成時にsessionを引数として渡す
  #   render '/users/registtations/user_info' unless @user.valid?
  # end 

  # def user_tel #2ページ目(user_addressテーブル)
  #   @user = User.new
  #   @user.build_profile
  # end

  # def save_user_tel_to_session #2ページ目登録後に呼び出し、sessionに値を渡す
  #   session[:profile_attributes_after_user_tel] = user_params[:profile_attributes] # この時点では[:user_address_attributes]にはtelephoneしか格納されていない
  #   @user = User.new(session[:user_params]) #　ここでもsessionを渡す
  #   @user.build_profile(session[:profile_attributes_after_user_tel]) # インスタンス作成時にsessionを引数として渡す
  #   render '/users/registtations/user_tel' unless @user.valid?
  # end

  # def send_sms_code #2ページ目で登録した携帯番号にSMSを飛ばす記述
  #   @user = User.new
  #   @user.build_profile
  #   send_phone_number = PhonyRails.normalize_number session[:profile_attributes_after_user_tel][:telephone], country_code:'JP' #入力された携帯番号を変数に渡す
  #   session[:secure_code] = random_number_generator(4) #ランダムな4桁を生成するアクションに飛んだのち、sessionに渡す
  #   begin
  #     client = Twilio::REST::Client.new
  #     result = client.messages.create(
  #       from: ENV["TWILIO_PHONE_NUMBER"], #Twilioで取得した電話番号
  #       to:   send_phone_number, # 送り先
  #       body: "認証番号：#{session[:secure_code]}" # 送る内容
  #     )
  #   rescue Twilio::REST::RestError => e #エラー時の処理
  #     @messages = "エラーコード[#{e.code}] ：”#{e.message}”"
  #     render '/users/registtations/user_tel'
  #   end
  # end

  # def random_number_generator(n) #ランダムな4桁の番号を生成するアクション
  #   ''.tap { |s| n.times { s << rand(0..9).to_s } }
  # end

  # def user_tel_verification #3ページ目(SMSで送ったコードの確認ページ)
  #   @user = User.new
  #   @user.build_profile
  # end

  # def check_sms_code #3ページ目で入力された認証コードを照らし合わせる
  #   session[:input_code] = user_params[:profile_attributes] #入力されたコードをsessionに渡す
  #   @user = User.new
  #   @user.build_profile
  #   redirect_to action: :user_tel_verification unless session[:input_code].present? #値が入力されているか確認
  #   render '/users/registtations/user_tel_verification' and return unless session[:secure_code] == session[:input_code][:telephone] #SMSで送ったコードと実際に入力されたコードの照合
  # end

  # def profile #4ページ目(user_addressテーブル)
  #   @user = User.new
  #   @user.build_profile
  # end

  # def save_user_address_to_session #4ページ目登録後に呼び出し、sessionに値を渡す
  #   session[:profile_attributes_after_user_address] = user_params[:profile_attributes]
  #   session[:profile_attributes_after_user_address].merge!(session[:profile_attributes_after_user_tel]) # ４ページ目に登録したアドレスと2ページ目に登録した電話番号を結合
  #   @user = User.new
  #   @user.build_profile
  #   render '/users/registtations/profile' unless session[:profile_attributes_after_user_address].present? #本来はここでバリデーションしたいが、上手く行かないため止むを得ずpresent?
  # end

  # def create #4ページ目までの登録が完了した時点で、一気にDBに突っ込む
  #   @user = User.new(session[:user_params])
  #   @user.build_profile(session[:profile_attributes_after_user_address])
  #   if @user.save
  #     sign_in User.find(@user.id) #ログイン状態を保持する記述
  #     redirect_to user_complete_signup_index_path #登録完了画面にリダイレクト
  #   else
  #     render user_address_signup_index_path # ダメだった場合4ページ目にリダイレクト
  #   end
  # end

  # def user_complete #登録完了ページにて、sessionの削除(明示的に消さないとずっと残ってしまうため)
  #   session[:user_params].clear
  #   session[:secure_code].clear
  #   session[:input_code].clear
  #   session[:profile_attributes_after_user_address].clear
  # end

  # private

  # def user_params #ストロングパラメーターでユーザに関わる情報を保護
  #   params.require(:user).permit(
  #     :nickname, 
  #     :email, 
  #     :password, 
  #     :password_confirmation, 
  #     :last_name, 
  #     :first_name, 
  #     :last_name_kana, 
  #     :first_name_kana, 
  #     :birthday, 
  #     user_address_attributes: [:id, :last_name, :first_name, :last_name_kana, :first_name_kana, :postal_code, :prefecture, :city, :address, :building, :telephone]
  #   )
  # end
  
  def new
    @user = User.new
    @profile = @user.build_profile
  end
  
  def create
    if params[:sns_auth] == 'true'
      pass = Devise.friendly_token
      params[:user][:password] = pass
      params[:user][:password_confirmation] = pass
    end
    super
  end
  
  # 初めてのログイン者については、ルートパスに飛ばす
  def after_sign_up_path_for(resource)
    root_path
  end


  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]
  
  # GET /resource/sign_up
  # def new
  #   super
  # end
  
  # POST /resource
  # def create
  #   super
  # end
  
  # GET /resource/edit
  # def edit
  #   super
  # end
  
  # PUT /resource
  # def update
  #   super
  # end
  
  # DELETE /resource
  # def destroy
  #   super
  # end
  
  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end
  
  # protected
  
  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end
  
  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end
  
  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end
  
  # The path used after sign up for inactive accounts.
end
