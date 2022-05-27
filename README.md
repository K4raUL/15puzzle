# 15puzzle
15 puzzle game (any N*N board)  
Published at https://k4raul.github.io/15puzzle/

Final goal is to recover original board state (empty tile is always at bottom right).   
Example for 4x4 board:

![langru-200px-15-puzzle svg 1](https://user-images.githubusercontent.com/7669489/170704315-9e635e94-8746-4375-b12f-ee7b1be939bd.png)

Every 4x4 puzzle can be solved in 80 (or less) single-tile moves.  
Use keyboard **↑←↓→** or **WASD** to move tiles adjacent to empty tile.

### Checking if initial board can be solved
Puzzle have (N*N)! possible initial positions. Half of them can not be transformed into original board (with fixed empty cell position).
While generating random initial board, the following algorithm was used to validate solvability:

![diagram](https://user-images.githubusercontent.com/7669489/170709880-0b353c87-4fab-4c19-a603-60fd533791d1.png)

Where:  
 - **N**    - board size  
 - **erow** - row number of empty tile (counting from upper side, starting from 0)  
 - **inv**  - number of inversions in generated board compared to original.  
It can be counted as `number of elements with larger index and smaller value (excluding empty tile) than current for each element in board, represented as 1-dimensional array`. Original board 4x4 in this case has 0 inversions and can be represented as {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0}, where 0 stands for empty tile.


### Auto-solving using A* algorithm
...
