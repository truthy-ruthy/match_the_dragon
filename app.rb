require 'bundler'

Bundler.require()

get '/' do
    erb :layout
end
