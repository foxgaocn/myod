class MainController < ApplicationController
  before_action :authenticate_user!, except: [:try_it]

  DEMO_USER = 'guest@test.com'

  def home
    @is_demo = current_user.email == DEMO_USER
  end

  def try_it
    user = User.find_by_email(DEMO_USER)
    unless user.present?
      user = User.create(email:DEMO_USER, password: 'password1', password_confirmation: 'password1')
    end
    sign_in user
    redirect_to root_path
  end

end