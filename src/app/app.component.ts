import { Component } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-interface-ws';


  /**
 * Instancie un observable WebSocket
 */
private _socket: WebSocketSubject<any>;

/**
 * Tableau pour recevoir les msgs du server
 */
public serverMessages: any[];

constructor() {

  console.log('Connexion du client WebSocket');

  this._socket = new WebSocketSubject('ws://127.0.0.1:8999');

  //Initialise le tableau des messages
  this.serverMessages=[];

  //Juste pour tester la communication sortante
  this._send();
  //Souscription aux messages provenant du server
  this._socket
    .subscribe( (message)=>{
      console.log('Le server envoie : '+ JSON.stringify(message));
      this.serverMessages.push(message);
    },
    (err)=> console.error('Erreur levée : '+JSON.stringify(err)),
    ()=>console.warn('You have exited the chatroom!')
  );
}

private _send():void {
  console.log('Envoie un nouveau message vers le serveur');
  this._socket.next('Nouveau client connecté');
}
}




