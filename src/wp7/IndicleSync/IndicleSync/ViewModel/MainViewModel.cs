using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Windows;
using System.Windows.Input;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Messaging;
using IndicleSync.Communication;
using IndicleSync.Entities;
using MyToolkit.Networking;
using Newtonsoft.Json;

namespace IndicleSync.ViewModel
{
    public class MainViewModel : ViewModelBase
    {
        public ICommand RefreshCommand { get; private set; }
        public ObservableCollection<LinkEntity> Links { get; private set; }


        public MainViewModel()
        {
            RefreshCommand = new RelayCommand(LoadLinks);
            
            Links = new ObservableCollection<LinkEntity>(); 
            LoadLinks();
        }

        public void LoadLinks()
        {
            if (Account.Auth == null)
            {
                MessengerInstance.Send<object>(null, "NavigateBack");
            }

            Links.Clear();

            var uri = "https://indiclesync.firebaseIO.com/users/" +
                      Account.Auth.user.id + "/urls/.json?auth=" + Account.Auth.token;

            var request = new HttpGetRequest(uri);

            Http.Get(request, (response) =>
            {
                if (response.Successful)
                {
                    var links = JsonConvert.DeserializeObject<Dictionary<string,LinkEntity>>(response.Response);
                    Deployment.Current.Dispatcher.BeginInvoke(() =>
                        {
                            foreach (var link in links.Values)
                            {
                                Links.Add(link);
                            }
                        });
                }
            });
        }
    }
}