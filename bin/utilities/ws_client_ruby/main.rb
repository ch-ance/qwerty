require 'faye/websocket'
require 'eventmachine'

EM.run {
    ws = Faye::WebSocket::Client.new('http://localhost:8080')
    ws.on :open do |event|
        p [:open]
        ws.send('Hello, world!')
      end
    
    ws.send "open?"
    puts "hlelo"
}