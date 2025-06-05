import * as tf from '@tensorflow/tfjs';

export async function predictNext7DaysFeelsLike(pastData) {
  const xs = tf.tensor1d(pastData.map((_, i) => i + 1)); // Days 1 to N
  const ys = tf.tensor1d(pastData.map(d => d.feelslike));

  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
  model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

  await model.fit(xs, ys, { epochs: 200 });

  // Predict next 7 days
  const nextDays = tf.tensor1d([
    pastData.length + 1,
    pastData.length + 2,
    pastData.length + 3,
    pastData.length + 4,
    pastData.length + 5,
    pastData.length + 6,
    pastData.length + 7,
  ]);

  const predictions = model.predict(nextDays);
  const predictedValues = await predictions.array();

  return predictedValues.map((feelslike, index) => ({
    day: `Day ${index + 1}`,
    feelslike: Number(feelslike[0]).toFixed(1),
  }));
}
