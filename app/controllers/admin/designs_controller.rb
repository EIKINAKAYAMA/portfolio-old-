class Admin::DesignsController < Admin::ApplicationController
  before_action :authenticate_user!

  def index
    @user = User.find(params[:user_id])
    @design_check = Design.find_by(id: params[:user_id])
    if @design_check.present?
      @design = Design.find(params[:user_id])
      respond_to do |format|
        format.html
        format.json
      end
    else
      redirect_to action: "new"
    end
  end

  def new
    @user = User.find(params[:user_id])
    @design_check = Design.find_by(user_id: params[:user_id])
    if @design_check.present?
      redirect_to action: "edit", id: params[:user_id]
    else
      @design = Design.new
      @design.top_back_images.build
      @gallery_back_image = @design.build_gallery_back_image
      @contact_back_image = @design.build_contact_back_image
      @profile_back_image = @design.build_profile_back_image
    end
  end

  def create
    @design = Design.new(create_params)
    if @design.save
      # 関連するtop_back_imagesを作成
      image_params[:images].each do |image|
        if image !=""
          @design.top_back_images.create(image: image)
        else 
          next
        end
      end
      # redirect_to request.referrer, notice: 'succeded sending'
      respond_to do |format|
        format.json
      end
    else
      render :new
    end
  end

  def edit
    @user = User.find(params[:user_id])
    @design = Design.find(params[:id])
    @top_back_images = TopBackImage.where(design_id: params[:id])
    @gallery_back_image = GalleryBackImage.find_by(design_id: params[:id])
    @contact_back_image = ContactBackImage.find_by(design_id: params[:id])
    @profile_back_image = ProfileBackImage.find_by(design_id: params[:id])
    
    respond_to do |format|
      format.html
      format.json
    end
  end

  def update
    @user = User.find(params[:user_id])
    @design = Design.find(params[:id])
    @top_back_images = TopBackImage.where(design_id: params[:id])
    array_length = @top_back_images.length 

    if @design.update(create_params)
      # 関連するtop_back_imagesを作成
      image_params[:images].each_with_index do |image, i|
        # DBに既に保存されている部分についての処理
        if i < array_length
          # 対象が削除された場合
          if image == ""
            @design.top_back_images[i].destroy
            # 対象が存在する場合
          elsif image == "exist"
            next
            # 対象が変更された場合
          else
            @design.top_back_images[i].update(image: image)
          end
          # DBには保存されていない部分についての処理
        else
          if image !=""
            @design.top_back_images.create(image: image)
          else
            next
          end
        end
      end
      # redirect_to request.referrer, notice: 'succeded sending'
      respond_to do |format|
        format.json
      end
    end
  end

  private
    # 全体のパラメータからtop_back_imagesテーブルのimageを除いたパラメータでdesignテーブルを作成
    def create_params
      create_params = params.require(:design).permit(
        gallery_back_image_attributes: [:image],
        contact_back_image_attributes: [:image],
        profile_back_image_attributes: [:image]
      ).merge(user_id: params[:user_id])
      return create_params
    end

    # 全体のパラメータからtop_back_imagesテーブルのimage分を配列で抽出
    def image_params
      params.require(:top_back_images).permit({images: []})
    end
end