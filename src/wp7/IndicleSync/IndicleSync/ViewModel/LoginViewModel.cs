using System;
using System.Windows.Input;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Messaging;
using IndicleSync.Communication;

namespace IndicleSync.ViewModel
{
    public class LoginViewModel : ViewModelBase
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public ICommand LoginCommand { get; private set; }

        public LoginViewModel()
        {
            LoginCommand = new RelayCommand(Login);
        }

        private void Login()
        {
            Account.Login(Email, Password);
            if (Account.Auth != null)
            {
                Messenger.Default.Send(new Uri("/View/MainView.xaml", UriKind.Relative), "Navigate");
            }
        }
    }

    
}