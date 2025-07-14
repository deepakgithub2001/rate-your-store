class StoresController < ApplicationController
  before_action :authenticate_user!
  before_action :set_store, only: [:show, :update, :destroy]
  before_action :authorize_store_owner!, only: [:create, :update, :destroy]

  def index
  stores = current_user.role == 'store_owner' ? current_user.stores : Store.all

  response = stores.map do |store|
    {
      id: store.id,
      name: store.name,
      address: store.address,
      description: store.description,
      average_rating: store.ratings.average(:rating)&.round(2),
      my_rating: store.ratings.find_by(user_id: current_user.id)&.rating
    }
  end

  render json: response
  end


  def show
    render json: @store
  end

  def create
    @store = current_user.stores.build(store_params)
    if @store.save
      render json: @store, status: :created
    else
      render json: { errors: @store.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @store.user == current_user && @store.update(store_params)
      render json: @store
    else
      render json: { errors: 'Not authorized or invalid data' }, status: :unauthorized
    end
  end

  def destroy
    if @store.user == current_user
      @store.destroy
      head :no_content
    else
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end

  private

  def set_store
    @store = Store.find(params[:id])
  end

  def store_params
    params.require(:store).permit(:name, :address, :description)
  end

  def authorize_store_owner!
    unless current_user.role == 'store_owner'
      render json: { error: 'Access denied: not a store owner' }, status: :forbidden
    end
  end
end
