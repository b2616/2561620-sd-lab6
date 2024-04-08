const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let cars = []

app.get('/cars', (req, res) => {
  res.status(200).json(cars);
});

app.get('/cars/:id', (req, res) => {
  const { id } = req.params;
  const car = cars.find(car => car.id === parseInt(id));
  
    res.status(200).json(car);
  
});


app.post('/cars', (req, res) => {
  const { id, brand, model, specifications } = req.body;
  const newCar = { id, brand, model, specifications };
  cars.push(newCar);
  res.status(201).json(newCar);
});


app.put('/cars/:id', (req, res) => {
  const { id } = req.params;
  const { brand, model, specifications } = req.body;
  const index = cars.findIndex(car => car.id === parseInt(id));

    cars[index] = { id: parseInt(id), brand, model, specifications };
    res.status(200).json(cars[index]);

});

app.delete('/cars/:id', (req, res) => {
  const { id } = req.params;
  const index = cars.findIndex(car => car.id === parseInt(id));
 
    cars.splice(index, 1);
    res.status(204).end();
  
});

app.post('/cars/:id/specifications', (req, res) => {
  const { id } = req.params;
  const { engineType, color, modelYear } = req.body;
  const index = cars.findIndex(car => car.id === parseInt(id));

    cars[index].specifications.push({ engineType, color, modelYear });
    res.status(200).json(cars[index]);
  
});


app.delete('/cars/:id/specifications/:specId', (req, res) => {
  const { id, specId } = req.params;
  const index = cars.findIndex(car => car.id === parseInt(id));

    const specIndex = cars[index].specifications.findIndex(spec => spec.id === parseInt(specId));
    if (specIndex === -1) {
      res.status(404).json({ error: 'Specification not found' });
    } else {
      cars[index].specifications.splice(specIndex, 1);
      res.status(204).end();
    }
  
});


app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
