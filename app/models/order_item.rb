class OrderItem < ActiveRecord::Base
  belongs_to :client
  belongs_to :product
  belongs_to :user

  validates :client, :product, :user, :quantity, :status, presence: true
end
