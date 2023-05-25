import { Injectable } from '@angular/core';
import { Observable, Subscriber, mergeMap } from 'rxjs';
import { initializeApp } from "firebase/app";
import { Firestore , getFirestore, onSnapshot, collection, addDoc, deleteDoc, doc, getDoc, updateDoc, DocumentReference, Unsubscribe } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATK7HrO9iF5q8eJ8VLJ_v_jeMhVMvcnd4",
  authDomain: "adweb-demos.firebaseapp.com",
  projectId: "adweb-demos",
  storageBucket: "adweb-demos.appspot.com",
  messagingSenderId: "922213293995",
  appId: "1:922213293995:web:b3058c8215848a07093cee"
};

@Injectable({
  providedIn: 'root'
})
export class EventService {

  firestore: Firestore;

  constructor() {
    const app = initializeApp(firebaseConfig);

    this.firestore = getFirestore(app);

    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, 'bfm.luijten@avans.nl', 'MijnGeheimeWachtwoord').then((response) => {
      console.log(response);
    });
  }

  getEvents(): Observable<any[]> {
    return new Observable((subscriber: Subscriber<any[]>) => {
      onSnapshot(collection(this.firestore, 'events'), (snapshot) => {
        let events: any[] = [];
        snapshot.forEach((doc) => {
          let event = doc.data();
          event['id'] = doc.id;
          events.push(event);
        });
        subscriber.next(events);
      });
    });
  }

  getEvent(id: any): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
      onSnapshot(doc(this.firestore, "events", id), (doc) => {
        let event = doc.data() ?? {};
        event['id'] = doc.id;


        subscriber.next(event);
      });
    })
  }

  addEvent(event: any) {
    addDoc(collection(this.firestore, "events"), event);
  }

  deleteEvent(event: any) {
    deleteDoc(doc(this.firestore, "events", event.id));
  }

  updateEvent(id: any, event: any) {
    updateDoc(doc(this.firestore, "events", id), event)
  }  

  unsubscribe: any;
  
  getOrganiser(organiser: any): Observable<string> {
    return new Observable((subscriber: Subscriber<any>) => {
      if (this.unsubscribe) {
        this.unsubscribe();
      }

      this.unsubscribe = onSnapshot(organiser, (doc: any) => {
        subscriber.next(doc.data()["name"]);
      });
    });
  }

  getEventOrganiser(id: any): Observable<string> {
    return this.getEvent(id).pipe(mergeMap((event) => {
      return this.getOrganiser(event.organiser);
    }));
  }

  getEventOrganiserAlternative(id: any): Observable<string> {
    return new Observable((subscriber: Subscriber<any>) => {
      this.getEvent(id).subscribe((event) => {
        this.getOrganiser(event.organiser).subscribe((organiser) => {
          subscriber.next(organiser);
        })
      })
    });
  }

  //Down the Rabbit Hole: Mojo Concerts
  //Best Kept Secret: Friendly Fire
  //Lowlands: Mojo Concerts
  //Pinkpop: Buro Pinkpop
  //Into the Great Wide Open: Stichting Into the Great Wide Open
  //North Sea Jazz: Mojo Concerts
  //Mysteryland: ID&T
  //Zwarte Cross: Feestfabriek Alles Komt Goed BV
}
