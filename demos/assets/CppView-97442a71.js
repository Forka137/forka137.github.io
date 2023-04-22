import{_ as e,o as a,c as t,a as o}from"./index-4711dad2.js";const c=""+new URL("orbits_demo-31dba9c1.webm",import.meta.url).href,s=""+new URL("bullets_demo-034860e8.webm",import.meta.url).href,i=""+new URL("powdersim-1c544eda.webm",import.meta.url).href,d=""+new URL("solidsim-abf4e0f0.webm",import.meta.url).href,r=""+new URL("opengl_demo-82065403.webm",import.meta.url).href;const n={},l={class:"view-container"},b=o('<h1 data-v-08fcb37c>C++ Projects</h1><p data-v-08fcb37c>Here are some demos I have made in C++.</p><p data-v-08fcb37c>I learned how to program by reading <a href="https://www.stroustrup.com/4th.html" data-v-08fcb37c>&quot;The C++ Programming Language&quot;</a> by Bjarne Stroustrup.</p><br data-v-08fcb37c><div class="video-post" data-v-08fcb37c><h2 data-v-08fcb37c>Orbiting planets</h2><div class="row" data-v-08fcb37c><video muted autoplay loop controls src="'+c+'" data-v-08fcb37c></video><div class="text-container" data-v-08fcb37c><p data-v-08fcb37c>This was my first C++ project. I checked some examples from <a href="https://www.raylib.com/examples.html" data-v-08fcb37c>Raylib</a> and then came up with this idea. It has a main game loop, where the input processing, game update and drawing of objects are done separately. Making the trails was a bit challenging since I didn&#39;t want to make any memory leaks.</p><br data-v-08fcb37c><p data-v-08fcb37c><a target="_blank" href="https://github.com/Forka137/orbiting-planets" data-v-08fcb37c>Code on Github</a></p></div></div></div><div class="video-post" data-v-08fcb37c><h2 data-v-08fcb37c>Bullet generator</h2><div class="row" data-v-08fcb37c><video muted autoplay loop controls src="'+s+'" data-v-08fcb37c></video><div class="text-container" data-v-08fcb37c><p data-v-08fcb37c>For this one I was inspired in the bullet system used in Touhou games. I also wanted to learn how to load assets. The structure of the code is very similar to the orbiting planets. Every bullet deallocates its memory after leaving the screen. The code allows to add easily more bullet patterns just by creating a new class with the pattern.</p><p data-v-08fcb37c>If you press the R key you can spam thousands of bullets very quickly.</p><br data-v-08fcb37c><p data-v-08fcb37c><a target="_blank" href="https://github.com/Forka137/bullet-generator" data-v-08fcb37c>Code on Github</a></p></div></div></div><div class="video-post" data-v-08fcb37c><h2 data-v-08fcb37c>Powder Simulator</h2><div class="row" data-v-08fcb37c><video muted autoplay loop controls src="'+i+'" data-v-08fcb37c></video><div class="text-container" data-v-08fcb37c><p data-v-08fcb37c>I always wanted to make one of these simulators. It&#39;s based on the model of a &quot;Cellular Automaton&quot;. Each pixel will act different based on the pixel neighboring it.</p><p data-v-08fcb37c>In order to make it run faster I used the technique of &quot;grid based collision detection&quot;. So the pixel will only iterate with its neighbors instead of checking every pixel on the screen.</p><br data-v-08fcb37c><p data-v-08fcb37c>You can create sand, water and rock. More materials can be added easily by creating a new class.</p><br data-v-08fcb37c><p data-v-08fcb37c><a target="_blank" href="https://github.com/Forka137/powder-sim" data-v-08fcb37c>Code on Github</a></p></div></div></div><div class="video-post" data-v-08fcb37c><h2 data-v-08fcb37c>Solid Simulator</h2><div class="row" data-v-08fcb37c><video muted autoplay loop controls src="'+d+'" data-v-08fcb37c></video><div class="text-container" data-v-08fcb37c><p data-v-08fcb37c>After making the powder simulator I figure out making a physics simulator would be a nice challenge. This one works using the &quot;Verlet integration method&quot; which is more accurate and stable than Euler&#39;s method. I used the same optimization method as before (grid based collision detection). The objects will only check collision with the objects inside the neighboring spaces (9 spaces). This grid is visible on the screen.</p><br data-v-08fcb37c><p data-v-08fcb37c>You can change the object sizes and the color will cycle.</p><br data-v-08fcb37c><p data-v-08fcb37c><a target="_blank" href="https://github.com/Forka137/solid-sim" data-v-08fcb37c>Code on Github</a></p></div></div></div><div class="video-post" data-v-08fcb37c><h2 data-v-08fcb37c>OpenGL demo</h2><div class="row" data-v-08fcb37c><video muted autoplay loop controls src="'+r+'" data-v-08fcb37c></video><div class="text-container" data-v-08fcb37c><p data-v-08fcb37c>I was studying in parallel the book from <a href="https://learnopengl.com" data-v-08fcb37c>&quot;Learn OpenGL&quot;</a>. I had to learn about the rendering pipeline and shaders (GLSL). I was able to understand the view frustum, matrix transformations, and even the problems of rotation in 3D space (Euler angles).</p><p data-v-08fcb37c>In the demo you can see a demo of 3D space, where there are 10 boxes being rendered. You move around with the WASD keys and the mouse.</p><br data-v-08fcb37c><p data-v-08fcb37c>There was an excercise in the book that required you to change the opacity of a texture using an &quot;uniform&quot; variable that is inside the shader. That&#39;s the frog texture you see at the end.</p><br data-v-08fcb37c><p data-v-08fcb37c><a target="_blank" href="https://github.com/Forka137/opengl-boxes" data-v-08fcb37c>Code on Github</a></p></div></div></div>',9),h=[b];function p(v,f){return a(),t("div",l,h)}const m=e(n,[["render",p],["__scopeId","data-v-08fcb37c"]]);export{m as default};
