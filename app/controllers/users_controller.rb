class UsersController < ApplicationController
  inherit_resources
  actions :new, :create

  private
  def permitted_params
    params.permit(user: [:phone, :email, :firstname, :lastname])
  end
end
