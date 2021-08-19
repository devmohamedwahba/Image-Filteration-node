import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req: Request, res: Response ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  app.get( "/filteredimage", async ( req: Request, res: Response ) => {
    let { image_url } = req.query;

    if ( !image_url ) {
      return res.status(400)
                .send(`image_url is required`);
    }

    let filteredpath = await filterImageFromURL(image_url)
    deleteLocalFiles([filteredpath])

    res.send(filteredpath)
  } );
  
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();