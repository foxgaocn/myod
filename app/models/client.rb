class Client < ActiveRecord::Base
  has_many :order_items
  has_many :packages
  belongs_to :user

  validates :user, :name, presence: true
end
