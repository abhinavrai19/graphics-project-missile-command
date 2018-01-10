CSC561 Program 4 Missile Command By Abhinav Rai. (Copied from my NCSU github repo)

GAME DESCRIPTION:
The aim of the game is to prevent the incoming missiles from hitting your cities(white orbs) and your defense missile batteries(blue orbs)

The game has a total of 4 stages starting with 0-3. When all of the incoming missiles are destroyed or have descended, the stage changes.
With each stage, the number of incoming missiles increases.
Each stages causes the revolving star to change color.

You Start with 5000 score
You will Loose
100 points for each missile battery destroyed
500 points for each city destroyed

You will gain
20 points for each offense missile destroyed
1000 points for each stage completed
2000 points for completing the game

You WIN the Game of you complete Stage #3
You LOOSE the game if all of your cities are destroyed before the end of stage #3.

CONTROLS:
Move your mouse pointer to the place you want to launch the defense missiles to and click.

CREDITS:
Code References: threejs.org example samples
Water Shader: threejs.org examples "Ocean Shader"
/**
 * @author jbouny / https://github.com/jbouny
 *
 * Work based on :
 * @author Slayvin / http://slayvin.net : Flat mirror for three.js
 * @author Stemkoski / http://www.adelphi.edu/~stemkoski : An implementation of water shader based on the flat mirror
 * @author Jonas Wagner / http://29a.ch/ && http://29a.ch/slides/2012/webglwater/ : Water shader explanations in WebGL
 */

Background Music From: https://www.bensound.com/ SCI FI

TO PLAY:
Please unzip the contents of the zip file into a new directory.
Inside the directory, open index.html
