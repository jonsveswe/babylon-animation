import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Row, Col} from 'react-bootstrap'
import React, { useRef, useEffect, useState, Fragment } from "react";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; 
import apiRequest from "./apiRequest";
/* import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

// Side-effects only imports allowing the standard material to be used as default.
import "@babylonjs/core/Materials/standardMaterial";
// Side-effects only imports allowing Mesh to create default shapes (to enhance tree shaking, the construction methods on mesh are not available if the meshbuilder has not been imported).
import "@babylonjs/core/Meshes/Builders/sphereBuilder";
import "@babylonjs/core/Meshes/Builders/boxBuilder";
import "@babylonjs/core/Meshes/Builders/groundBuilder"; 
import * as BABYLON from '@babylonjs/core/Legacy/legacy';*/


function App() {
  const [orientation, setOrientation] = useState({pitch: 0, roll: 45, yaw: 45});
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = 'http://169.254.18.186:5000/orientation';
  let X = 0;
  let Y = 0;
  let Pitch = 0;
  let Roll = 0;
  let Yaw = 0;
  useEffect(() => {
    console.log("useEffect main app");
    const fetchOrientation = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const data = await response.json();
        Pitch = data.pitch;
        Roll = data.roll;
        Yaw = data.yaw;
        //setOrientation(data);
        //setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        //setIsLoading(false);
        //console.log(orientation);
      }
    }
    setInterval(()=>{
      fetchOrientation();
/*       const newOrientation = {
        pitch: 0,
        roll: orientation.roll + 20,
        yaw: orientation.yaw + 20,
      };
  
      setOrientation(newOrientation); */

      //console.log("Hej");
      //X = X + 0.04;
      //Y = Y + 0.04;

      //console.log(orientation);
    }, 100);
    
  }, [])

  let box1;
  let box2;

  const onSceneReady1 = (scene) => {
    //scene.clearColor = Color3(1,1,1);
   
    // This creates and positions a free camera (non-mesh)
    var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  
    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());
  
    const canvas = scene.getEngine().getRenderingCanvas();
  
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
  
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 1), scene);
  
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
  
    // Our built-in 'box' shape.
    box1 = MeshBuilder.CreateBox("box", { size: 2 }, scene);
  
    // Move the box upward 1/2 its height
    box1.position.y = 1;
  
    // Our built-in 'ground' shape.
    MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
  };
  const onSceneReady2 = (scene) => {
    // This creates and positions a free camera (non-mesh)
    var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  
    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());
  
    const canvas = scene.getEngine().getRenderingCanvas();
  
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
  
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
  
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
  
    // Our built-in 'box' shape.
    box2 = MeshBuilder.CreateBox("box", { size: 2 }, scene);
  
    // Move the box upward 1/2 its height
    box2.position.y = 1;
  
    // Our built-in 'ground' shape.
    MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
  };
  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender1 = (scene) => {
    if (box1 !== undefined) {
      var deltaTimeInMillis = scene.getEngine().getDeltaTime(); 
      const rpm = 10;
      box1.rotation.x += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
      box1.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
      box1.rotation.z += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
  }; 
  const onRender2 = (scene) => {
    if (box2 !== undefined) {
      box2.rotation.x = Pitch*Math.PI/180;
      box2.rotation.y = Yaw*Math.PI/180;
      box2.rotation.z = Roll*Math.PI/180;
      //box2.rotation.x = orientation.roll*Math.PI/180;
      //box2.rotation.y = orientation.pitch*Math.PI/180;
      //box2.rotation.x = X;
      //box2.rotation.y = Y;
     // box2.rotation.z += orientation.yaw*Math.PI/180;
 /*      setTimeout(()=>{
        const fetchOrientation = async () => {
          try {
            const response = await fetch(API_URL);
            if (!response.ok) throw Error('Did not receive expected data');
            const data = await response.json();
            setOrientation(data);
            setFetchError(null);
          } catch (error) {
            setFetchError(error.message);
          } finally {
            setIsLoading(false);
            console.log(orientation);
            box2.rotation.x = orientation.pitch;
            box2.rotation.y = orientation.roll;
            box2.rotation.z = orientation.yaw;
          }
        }
        fetchOrientation();
      }, 200); */
    }
  }; 

  return (
    <div className="App">
      
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>Simulation</Card.Header>
              <Card.Body>
                <SceneComponent antialias onSceneReady={onSceneReady1} onRender={onRender1} id="my-canvas" />  
              </Card.Body>          
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>Orientation from Raspberry Pi</Card.Header>
              <Card.Body>
                <SceneComponent antialias onSceneReady={onSceneReady2} onRender={onRender2} id="my-canvas2" />  
              </Card.Body>          
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
