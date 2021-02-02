require 'thor'
class Asdf < Thor
    desc "hello NAME", "say helo to NAME"
    
    def hello(name)
        puts "Hello #{name}"
    end
end