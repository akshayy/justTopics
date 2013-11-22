require 'sinatra'
require 'omniauth-twitter'
require 'bundler'

Bundler.require

configure do
  enable :sessions
end

helpers do
  def admin?
    session[:admin]
  end
end

use OmniAuth::Builder do
  provider :twitter, 'e756IwG9nog9CtllDZ9tkQ', 'yG3NNjC9rbipWGPavvhDiipYI5qpMRX7JL6JigZDB8'
end


get '/' do
   puts "here I am"
	File.read('views/index.html')
end

get '/loginWithFacebook' do

end

get '/success' do
	File.read('views/homePage.html')  
end

get '/loginWithTwitter' do
  puts 'I m in loginWithTwitter'
  redirect to("/auth/twitter")
end

get '/auth/twitter/callback' do
  env['omniauth.auth'] ? session[:admin] = true : halt(401,'Not Authorized')
  
  #session[:admin] = true
  #env['omniauth.auth']
end

get '/auth/failure' do
  params[:message]
end
