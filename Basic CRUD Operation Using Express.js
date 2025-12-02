const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan=require('morgan');
const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Creating own middleware
// A middleware is basically a function that can modify the req and res objects and it shold call next() to pass control to the next middleware in the stack.
// Middlewares are executed in the order they are defined in the code.So the order of app.use() calls matters.    
app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) =>{
  req.requestTime=new Date().toISOString();
  next();
} )

const tours = JSON.parse(fs.readFileSync(path.join(__dirname,'dev-data','data','tours-simple.json')));

// Route Handlers
const getAllTours= (req, res) => {
  res.status(200).json({
    status:'success',
    requestedAt:req.requestTime,
    results:tours.length,
    data:{
      tours:tours
    }
  })
}

const getTour=(req, res) => {
  const id=req.params.id*1;
  const tour=tours.find(el=>el.id===id);
  if(!tour){
    return res.status(404).json({
      status:'fail',
      message:'Invalid ID'
    })
  } else {
    
    res.status(200).json({
      status:'success',
      data:{
        tour:tour
      }
    })
  }
}

const createTour=(req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({id: newId}, req.body);
  tours.push(newTour);
  fs.writeFile(path.join(__dirname,'dev-data','data','tours-simple.json'), JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
}

const updateTour=(req, res) => {
  if(req.params.id*1 > tours.length){
    return res.status(404).json({
      status:'fail',
      message:'Invalid ID'
    })
  }
  res.status(200).json({
    status:'success',
    data:{
      tour:'Updated tour here...'
    }
  })
}

const deleteTour=(req, res) => {
  if(req.params.id*1 > tours.length){
    return res.status(404).json({
      status:'fail',
      message:'Invalid ID'
    })
  }
  res.status(204).json({
    status:'success',
    data:null
  })
}

// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id',getTour)
// app.post('/api/v1/tours',createTour)
// app.patch('/api/v1/tours/:id',updateTour );
// app.delete('/api/v1/tours/:id',deleteTour );

// ROUTES
app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
