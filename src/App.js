import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Row, Col} from 'react-bootstrap'
import React, { useRef, useEffect, useState, Fragment } from "react";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; 
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
  let box;

  const onSceneReady = (scene) => {
    // This creates and positions a free camera (non-mesh)
    var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  
    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());
  
    const canvas = scene.getEngine().getRenderingCanvas();
  
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
  
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
  
    // Our built-in 'box' shape.
    box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
  
    // Move the box upward 1/2 its height
    box.position.y = 1;
  
    // Our built-in 'ground' shape.
    MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
  };
  
  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender = (scene) => {
    if (box !== undefined) {
      var deltaTimeInMillis = scene.getEngine().getDeltaTime();
  
      const rpm = 10;
      box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
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
                <Card.Title>Special title treatment</Card.Title>
                <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
                
                
              </Card.Body>          
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>Orientation from Raspberry Pi</Card.Header>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional content.
                </Card.Text>
              </Card.Body>          
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
