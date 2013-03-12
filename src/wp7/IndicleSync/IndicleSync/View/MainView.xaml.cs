using System;
using System.Collections.Generic;
using System.Diagnostics;
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
using IndicleSync.ViewModel;
using Microsoft.Phone.Controls;
using IndicleSync.ViewModel;

namespace IndicleSync.View
{
    public partial class MainPage : PhoneApplicationPage
    {
        // Constructor
        public MainPage()
        {
            InitializeComponent();
        }

        private void Refresh_Click(object sender, EventArgs e)
        {
            var vm = DataContext as MainViewModel;
            Debug.Assert(vm != null, "View Model Must Be Set");

            vm.RefreshCommand.Execute(null);
        }
    }
}