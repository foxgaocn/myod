class MainController < ApplicationController
  before_action :authenticate_user!, except: [:try_it]

  def home
  end

  def try_it
    user = User.find_by_email('guest@test.com')
    unless user.present?
      user = User.create(email:'guest@test.com', password: 'password1', password_confirmation: 'password1')
    end
    sign_in user
    redirect_to root_path
  end

end