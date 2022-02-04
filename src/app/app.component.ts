import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


  constructor(private http:HttpClient){

  }

  username:string = ""
  message:any = ""
  messages:any = []

  
  ngOnInit(){
    Pusher.logToConsole = true;
    
    var pusher = new Pusher('8a7089caddeb19d8a2ab', {
      cluster: 'us2'
    });
    
    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (data:any) => {
      this.messages.push(data)
    });
  }
  
  enviarForm(){
    this.http.post('http://localhost:8000/api/messages', body: {
      username: this.username,
      message: this.message
    })
  }
  
}
