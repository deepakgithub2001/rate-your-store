class Admin::DashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_admin!

  def dashboard
    total_users = User.count
    total_stores = Store.count
    total_ratings = Rating.count

    render json: {
      message: "System Admin Dashboard",
      total_users: total_users,
      total_stores: total_stores,
      total_ratings: total_ratings
    }, status: :ok
  end

  private

  def authorize_admin!
    unless current_user.system_admin?
      render json: { error: "Access denied: Only system admin allowed." }, status: :unauthorized
    end
  end
end
