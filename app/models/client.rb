class Client < ActiveRecord::Base
  has_many :order_items
  has_many :packages
  belongs_to :user

  validates :user, :name, presence: true

  def price_unit_string
    Currency::SUPPORTED_CURRENCIES[price_unit][0]
  end
end
