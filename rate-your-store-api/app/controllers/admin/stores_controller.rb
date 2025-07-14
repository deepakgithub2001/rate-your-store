class Admin::StoresController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_admin!

  def index
    stores = Store.includes(:user).all

    if stores.any?
      render json: stores.as_json(
        only: [:id, :name, :address, :description, :created_at],
        include: {
          user: { only: [:id, :name, :email, :role] }
        }
      ), status: :ok
    else
      head :no_content
    end
  end

  def destroy
  store = Store.find_by(id: params[:id])

  if store.nil?
    render json: { error: "Store not found" }, status: :not_found
  else
    store.destroy
    head :no_content
  end
  end
  
  private

  def authorize_admin!
    return if current_user&.system_admin?
    render json: { error: "Access denied: Admins only" }, status: :forbidden
  end
end
