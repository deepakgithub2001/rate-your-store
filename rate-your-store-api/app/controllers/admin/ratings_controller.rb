# app/controllers/admin/ratings_controller.rb
class Admin::RatingsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin!

  def index
  ratings = Rating.includes(:user, :store).order(created_at: :desc)

  render json: ratings.as_json(
    only: [:id, :rating, :comment, :created_at],
    include: {
      user: { only: [:id, :name] },
      store: { only: [:id, :name] }
    }
  )
  end

  def destroy
    rating = Rating.find(params[:id])
    rating.destroy
    render json: { message: "Rating deleted successfully" }
  end
end 

