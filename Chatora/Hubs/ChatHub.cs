using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chatora.Hubs
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(long username, string message)
        {
            await Clients.All.SendAsync("messageReceived", username, message);
        }

        public async Task Typing(long username)
        {
            await Clients.All.SendAsync("typing", username);
        }

        public async Task NotTyping(long username)
        {
            await Clients.All.SendAsync("notTyping", username);
        }
    }
}
