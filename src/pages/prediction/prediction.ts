import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as tf from '@tensorflow/tfjs';
/**
 * Generated class for the PredictionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prediction',
  templateUrl: 'prediction.html',
})
export class PredictionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.train();
  }


  public ppp() {
    // Define a model for linear regression.
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    //model.add(tf.layers.dense({ units: 4}));
    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    // Generate some synthetic data for training.
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

    // Train the model using the data.
    model.fit(xs, ys, { epochs: 1 }).then(() => {
      // Use the model to do inference on a data point the model hasn't seen before:
      console.log(model.predict(tf.tensor2d([5], [1, 1])).toString())

    });

  }

  linearModel: tf.Sequential;
  prediction: any;
  async train(): Promise<any> {
    // Define a model for linear regression.
    this.linearModel = tf.sequential();
    this.linearModel.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Prepare the model for training: Specify the loss and the optimizer.
    this.linearModel.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });


    // Training data, completely random stuff
    const xs = tf.tensor1d([1, 1, 1]);
    const ys = tf.tensor1d([1, 1, 1]);


    // Train
    await this.linearModel.fit(xs, ys, { epochs: 100 })

    console.log('model trained!')
  }

  predict(val: number) {
    const output = this.linearModel.predict(tf.tensor2d([val], [1, 1])) as any;
    this.prediction = Array.from(output.dataSync())[0]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PredictionPage');
  }

}
