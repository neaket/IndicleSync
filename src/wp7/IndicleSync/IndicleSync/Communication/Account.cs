using System;
using System.IO;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using System.Diagnostics;
using MyToolkit.Networking;
using Newtonsoft.Json;

namespace IndicleSync.Communication
{
    public class Account
    {
        public static Auth Auth { get; private set; }

        public static void Login(string email, string password)
        {
            var uri = "https://auth.firebase.com/auth/firebase?&firebase=indiclesync" +
                      "&email=" + email +
                      "&password=" + password;

            var request = new HttpGetRequest(uri);

            Http.Get(request, (response) =>
            {
                if (response.Successful)
                {
                    Auth = JsonConvert.DeserializeObject<Auth>(response.Response);
                }
            });
        }
    }

    public class Auth
    {
        public string token { get; set; }
        public User user { get; set; }
    }

    public class User
    {
        public string provider { get; set; }
        public int id { get; set; }
        public string email { get; set; }
        public string sessionKey { get; set; }
    }
}
