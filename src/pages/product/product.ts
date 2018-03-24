import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from './product.service';
import { ToastController, AlertController } from 'ionic-angular';
import { Product } from './product.model';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage implements OnInit {

  toast: string;
  products: Product[];

  constructor(private productService: ProductService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(products => this.products = products)
  }

  onSave(form: NgForm) {
    this.productService.addProduct(form.value)
      .subscribe(data => {
        this.toast = data.message;
        this.toastMsg();
        form.resetForm();
        this.getProducts();
      });
  }

  toastMsg() {
    let toast = this.toastCtrl.create({
      message: this.toast,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  onUpdateProduct(product){
    let update = this.alertCtrl.create({
      title: 'Update Product',
      inputs: [
        {
        name: 'name',
        placeholder: 'Name',
        value: product.name
      },
      {
        name: 'description',
        placeholder: 'Description',
        value: product.description
      },
      {
        name: 'quantity',
        placeholder: 'Quantity',
        value: product.quantity
      }
    ],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Update',
        handler: data => {
          const update = {
            _id: product._id,
            name: data.name,
            description: data.description,
            quantity: data.quantity
          }
          this.productService.updateProduct(update)
          .subscribe(data => {
            this.toast = data.message;
            this.toastMsg();
            this.getProducts();
          })
        }
      }]
    });
    update.present();
  }

  onDeleteProduct(id) {
    this.productService.deleteProduct(id)
      .subscribe(data => {
        this.toast = data.message;
        this.toastMsg();
        this.getProducts();
      });
  }
}
