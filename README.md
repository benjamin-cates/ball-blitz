# [Ball Blitz](https://benjamin-cates.github.io/ball-blitz)

View the project hosted [here](https://benjamin-cates.github.io/ball-blitz)!

Ball Blitz is a 3D ball matching game where the goal is to combine two beach balls! It was originally based on [Suika game](https://suika-game.app/), but uses a sports ball theme and is in 3D. 

The game was originally written in Rust [here](https://benjamin-cates.github.io/ball_blitz_old) in 2023, but was ported to TypeScript and React for better loading times.

## Game description

The main play area has a transparent box that has an orbit camera around it. The player gets balls of random size from ping pong to tennis ball that they can spawn at the top of the box. If two balls of the same type touch, they merge to create the next largest ball. The current order of balls is:

1. Ping Pong ball
2. Golf ball
3. Billiards ball
4. Tennis ball
5. Baseball
6. Bowling ball
7. Soccer ball
8. Basketball
9. Beach ball
10. ??? (to be added later)

Points are gained when spawning balls and when merging balls, and points are lost when balls don't fit in the box and fall. The goal of the game is to create a beach ball without going into negative points.
