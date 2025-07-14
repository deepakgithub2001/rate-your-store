# app/controllers/store_owner/dashboard_controller.rb
class StoreOwner::DashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_store_owner!

  def index
    stores = current_user.stores.includes(:ratings, :user)

    render json: stores.map { |store|
      {
        id: store.id,
        name: store.name,
        address: store.address,
        description: store.description,
        average_rating: store.ratings.average(:rating)&.round(2),
        ratings: store.ratings.map do |rating|
          {
            user_name: rating.user.name,
            rating: rating.rating,
            comment: rating.comment,
            created_at: rating.created_at.strftime("%b %d, %Y")
          }
        end
      }
    }
  end

  private

  def ensure_store_owner!
    unless current_user.role == "store_owner"
      render json: { error: "Access denied" }, status: :unauthorized
    end
  end
end
