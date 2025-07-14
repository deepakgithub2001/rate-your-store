class Store < ApplicationRecord
  belongs_to :user
  has_many :ratings, dependent: :destroy
  
  validates :name, presence: true
  validates :address, presence: true
  validates :description, presence: true
end
