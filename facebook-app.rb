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
  provider :twitter, 'ysSuTVZW4ZSyXgCqiqNLw', 'e9WgcwGa2BFXZN2fAsowynOmFuFS4W247QtB7kBOI'
end


get '/' do
   #puts "homePage"
	File.read('views/index.html')
end

get '/loginWithTwitter' do
  puts 'I m in loginWithTwitter'
  redirect to("/auth/twitter")
end

get '/auth/twitter/callback' do
  #env['omniauth.auth'] ? session[:admin] = true : halt(401,'Not Authorized')
  session[:admin] = true
  env['omniauth.auth']
  File.read('views/home.html')
end

get '/auth/failure' do
  params[:message]
end
