class RatingsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_store

  def create
    existing_rating = Rating.find_by(user: current_user, store: @store)

    if existing_rating
      existing_rating.update(rating_params)
      render json: { message: "Rating updated", rating: existing_rating }
    else
      rating = current_user.ratings.build(rating_params.merge(store: @store))
      if rating.save
        render json: { message: "Rating submitted", rating: rating }, status: :created
      else
        render json: { errors: rating.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  private

  def set_store
    @store = Store.find(params[:store_id])
  end

  def rating_params
    params.require(:rating).permit(:rating, :comment) # ✅ include :comment
  end
end
