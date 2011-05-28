class PagesController < ApplicationController  
  def home
    @title = "Home"
  end
  
  def about
    @title = "About"
  end
  
  def press
    @title = "Press"
  end
  
  def photo
    @title = "Photo"
  end
  
  def video
    @title = "Video"
  end  
  
  def contact
    @title = "Contact"
  end

end
