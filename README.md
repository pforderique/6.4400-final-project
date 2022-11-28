# Pool Game
### **MIT 6.4400 Computer Graphics Final Project**  

## How to setup
1. `git clone` the repo into your desired folder. Before you can run the project, you need to add one file.
2. Start by making sure you have the [p5.js extension](https://marketplace.visualstudio.com/items?itemName=samplavigne.p5-vscode) for vscode. 
3. In another folder, open up command palette in VSCode (Ctrl+Shift+P) and select "Create P5.js Project". This will generate a `jsconfig.json` file in the root directory. Add this file to the root directory of you project folder.
4. Start a [live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) or simply open up `index.html` to see the output.

## Making Changes
If implementing a function or writing in a pre-existing files, simply push changes to main once you've verified intended behavior.  

If adding a new file, first make sure you've included it in the index.html file in order to import it correctly, then push to main.

## Skeleton
`sketch.js` is like the `main.cpp` file from the projects. This will update the Game's State via a finite state machine and calculate the time delta.  

`Game.js` is like the scene node - contains the current state of the `PoolSystem` and the major `update()` method that calls the `Integrator`, and updates the current state. This method is where collision detection and response (bouncing, speed reduction) needs to be handled! 

`PoolSystem.js` is the game system that just contains the method for computing the time derivative given the current state.  

`Integrator.js` has one method for performing the integration on the given system at a certain state.

## Implementation Plan
1. **MVP: Pool Simulation**  
Get a simple system working where a ball hits another ball into the wall and other balls. No user input, but all forces and physics applied (except for force from cue, this is simulated at first) like air drag and friction, and collision handling with inelastic collisions.
2. **Playable Game**  
Implement an interactive cue where the user can control angle of hit and hit force (maybe by showing an arrow from white ball to cursor location?).   
2. **Adding Complexity**  
Implement slight Motion Blur on balls, textures, (and soft shadows?) for better visuals. Addtionally, but not as important, could add game obstacles.