class Client < ActiveRecord::Base
  has_many :order_items
  belongs_to :user

  validates :user, :name, presence: true
end
