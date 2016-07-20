class MagazinesController < ApplicationController
  def index
    @magazines = Magazine.includes(:cover).order(released_at: :desc).group_by { |magazine| magazine.released_at.year }
  end

  def show
    @magazine = Magazine.find(params[:id])
    @sheets = @magazine.sheets
  end
end