using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using GalaSoft.MvvmLight.Messaging;
using Microsoft.Phone.Controls;

namespace IndicleSync.View
{
    public partial class LoginView : PhoneApplicationPage
    {
        public LoginView()
        {
            InitializeComponent();

            // Necessary for Page Navigation from the ViewModel.
            Messenger.Default.Register<Uri>(this, "Navigate",
                (uri) => NavigationService.Navigate(uri));

            // Necessary for Back - Page Navigation from the ViewModel
            Messenger.Default.Register<object>(this, "NavigateBack",
                (obj) => NavigationService.GoBack());
        }
    }
}