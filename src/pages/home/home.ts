import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { Observable } from 'rxjs';
import { Item } from '../../models/item/item.model';
import 'rxjs/add/operator/map'


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingList$: Observable<Item[]>;

  constructor(public navCtrl: NavController, private shopping: ShoppingListService,
    public loadingCtrl: LoadingController) {

    this.shoppingList$ = this.shopping.getShoppingList().snapshotChanges().map((datas) => { 

      return datas.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))

    },(err)=>{
       console.log("problem : ", err)
    });
  }

}
