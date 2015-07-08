class StatController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_me

  def stat
    user_count = User.count;
    order_count = OrderItem.count;
    render plain: "User number: #{user_count} \nOrder number: #{order_count}"
  end

  private 
  def ensure_me
    render plain: "sorry" if current_user.email != 'admin@daigouben.com'
  end
end