class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
has_many :stores, dependent: :destroy
has_many :ratings, dependent: :destroy
enum :role, { normal_user: 0, store_owner: 1, system_admin: 2 }


  validates :name, presence: true, length: { minimum: 20, maximum: 60 }
  validates :address, presence: true, length: { maximum: 400 }

  validates :password, format: {
    with: /\A(?=.*[A-Z])(?=.*[\W]).{8,16}\z/,
    message: 'must be 8-16 characters, include 1 uppercase and 1 special character'
  }, if: :password_required?

  before_create :set_default_role
  
  private 

  def set_default_role
  self.role ||= :normal_user
  end

end 