class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :store

  validates :rating, presence: true, inclusion: 1..5
  validates :comment, length: { maximum: 500 }
end
