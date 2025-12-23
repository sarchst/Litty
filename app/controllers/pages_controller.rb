class PagesController < ApplicationController
  def home
    if params[:preview].present?
      preview_password = ENV['PREVIEW_PASSWORD']
      if params[:preview] == preview_password
        session[:preview_access] = true
      end
    end
  end
end
