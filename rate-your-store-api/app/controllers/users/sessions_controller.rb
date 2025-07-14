# app/controllers/users/sessions_controller.rb
class Users::SessionsController < Devise::SessionsController
  respond_to :json

  # ✅ This is what we call from frontend
  def show
    if current_user
      render json: current_user
    else
      render json: { error: "Not logged in" }, status: :unauthorized
    end
  end

  private

  def respond_with(resource, _opts = {})
    render json: {
      message: 'Logged in successfully!',
      user: resource
    }, status: :ok
  end

  def respond_to_on_destroy
    if current_user
      render json: { message: 'Logged out successfully!' }, status: :ok
    else
      render json: { message: 'User has no active session' }, status: :unauthorized
    end
  end
end 