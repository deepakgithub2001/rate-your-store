class Admin::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin

  def index
    users = User.where.not(role: :system_admin).select(:id, :email, :role, :name, :address, :created_at)
    render json: users
  end

  def destroy
  user = User.find_by(id: params[:id])

  if user.nil?
    render json: { error: 'User not found' }, status: :not_found
  elsif user.system_admin?
    render json: { error: 'Cannot delete another system admin' }, status: :forbidden
  else
    user.destroy
    head :no_content
  end
end


  private

  def require_admin
    unless current_user&.system_admin?
      render json: { error: "Access denied: Admins only" }, status: :forbidden
    end
  end
end
