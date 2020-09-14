class Admin::GalleryCategoriesController < Admin::ApplicationController
before_action :authenticate_user!

def index
  @user = User.find(params[:user_id])
  @gallery_category = GalleryCategory.new
  # @gallery_categories = GalleryCategory.where(id: params[:user_id])
end

def new
  @user = User.find(params[:user_id])
  @gallery_category_check = GalleryCategory.find_by(user_id: params[:user_id])
    if @gallery_category_check.present?
      redirect_to action: "edit", id: params[:user_id]
    else
      @gallery_category = GalleryCategory.new
    end
end
 
def create
  create_gallery_params[:name].each_with_index do |name, i|
    @gallery_category = GalleryCategory.new(name: name, user_id: params[:user_id])
    if @gallery_category.save
      category_image_params(i)[:images].each do |image|
        if image !=""
          @gallery_category.category_images.create(image: image)
        else
          next
        end
      end
    end
  end
  
  respond_to do |format|
    format.json
  end
end

def edit
  @user = User.find(params[:user_id])
  @gallery_categories = GalleryCategory.where(user_id: params[:user_id])

  respond_to do |format|
    format.html
    format.json
  end
end

def update
  @gallery_categories = GalleryCategory.where(user_id: params[:user_id])
  name_length = @gallery_categories.length
  create_gallery_params[:name].each_with_index do |name, i|
    # カテゴリーが追加されてない場合の挙動
    if i < name_length
      @gallery_categories[i].update(name: name)
      if @gallery_categories[i].save
        image_length = @gallery_categories[i].category_images.length 
        category_image_params(i)[:images].each_with_index do |image, j|
          if j < image_length
            if image == ""
              @gallery_categories[i].category_images[j].destroy
            elsif image == "exist"
              next
            else
              @gallery_categories[i].category_images[j].update(image: image)
            end
          else
            if image !=""
              @gallery_categories[i].category_images.create(image: image)
            else
              next
            end
          end
        end
      end
    # カテゴリーが追加された場合の挙動
    else
      @gallery_category = GalleryCategory.new(name: name, user_id: params[:user_id])

      if @gallery_category.save
        category_image_params(i)[:images].each do |image|
          if image !=""
            @gallery_category.category_images.create(image: image)
          else
            next
          end
        end
      end
    end

  end
  
  respond_to do |format|
    format.json
  end
end

private
  def create_gallery_params
    params.require(:gallery_categories).permit(name: []).merge(user_id: params[:user_id])
  end

  def category_image_params(i)
    params.require(:category_images).require("#{i}").permit({images: []})
  end
end