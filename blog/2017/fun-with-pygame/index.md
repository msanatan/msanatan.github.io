---
title: "Fun with Pygame"
date: 2017-10-05
categories:
- [game development]
- [tutorial]
tags:
- python
- pygame
---

Hey everyone! A lot of you don't know but I'm involved with an educational NGO called <a href="https://www.clicktostart.org" target="_blank" rel="nofollow noopener noreferrer">Click To Start</a>. Click To Start provides free digital literacy classes for senior citizens, and in 2017 it provided its first programming class aimed at teenagers! Programming is as rewarding as it is challenging so we tried to incentivise the students by teaching them how to make games - which we all love to do. Python was chosen as the language of instruction as it's one of the more English-like options out there. We then settled on Pygame to teach them game development, as it's pretty straightforward to get into once you know Python. The plus side of helping out was that I had to create games myself! I mean, we need to give them exercises that'll push and entertain them, right? One of the games they worked on was Tic Tac Toe. Creating it in Pygame was fun, so I thought I'd share how to do it.

## Simple Design

This Tic Tac Toe iteration will be pretty simple:

* X plays before O
* Each cell is numbered from 1 to 9
* The user presses the number and plays in that position
* Only 2 player, no AI
* After the game is done and winner announced (if any), a user can restart

## Setup

As it's a one screen game the setup for this is pretty basic. We'll keep all the code in one file.

```python
# Basic imports
import pygame
import sys
import os

os.environ['SDL_VIDEO_CENTERED'] = '1'
SCREEN_SIZE = (800, 640)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (50, 255, 50)
BLUE = (50, 50, 255)
RED = (255, 50, 50)
```

The imports and variables are fine for those who used Pygame before; the interesting bit is `os.environ['SDL_VIDEO_CENTERED'] = '1'`. SDL, the library which Pygame started off being a wrapper for, uses environment variables for window positioning <a href="https://www.libsdl.org/release/SDL-1.2.15/docs/html/sdlenvvars.html" target="_blank" rel="nofollow noopener noreferrer">https://www.libsdl.org/release/SDL-1.2.15/docs/html/sdlenvvars.html</a>.

```python
pygame.init()
board_font = pygame.font.SysFont('arial', 80)
game_over_font = pygame.font.SysFont('monospace', 80, bold=True)
replay_font = pygame.font.SysFont('monospace', 50)
screen = pygame.display.set_mode(SCREEN_SIZE)
pygame.display.set_caption('Tic Tac Toe')
clock = pygame.time.Clock()
```

Call `pygame.init()` as it's always required and then do other basic setup: add the fonts we'll be using (one for the Xs and Os and two for the game over screen); setup the screen size and window title; and create the Clock object to keep track of time and manage the framerate.

## Drawing The Board

Before my mind settled into one of the many ways we can represent a game of Tic Tac Toe, I decided to get a visual result to kick it off. What's Tic Tac Toe without 9 cells? Let's draw that first:

```python
def draw_lines(screen, screen_size):
    # Draw vertical lines
    # Lines go from top of screen to bottom of screen
    vertical_line_1 = int(screen_size[0] / 3) # lines mark 1/3 of the board
    pygame.draw.line(screen, BLACK, (vertical_line_1, 0), (vertical_line_1, screen_size[0]), 4)
    vertical_line_2 = vertical_line_1 * 2
    pygame.draw.line(screen, BLACK, (vertical_line_2, 0), (vertical_line_2, screen_size[0]), 4)
    # Draw horizontal lines
    horizontal_line_1 = int(screen_size[1] / 3)
    pygame.draw.line(screen, BLACK, (0, horizontal_line_1), (screen_size[0], horizontal_line_1), 4)
    horizontal_line_2 = horizontal_line_1 * 2
    pygame.draw.line(screen, BLACK, (0, horizontal_line_2), (screen_size[0], horizontal_line_2), 4)
```

To see the fruits of your (admittedly light) labour we can create the render function and setup the main loop:

```python
def render(screen, screen_size, clock):
    screen.fill(WHITE)
    draw_lines(screen_size)

    pygame.display.update()
    clock.tick(60)


def main():
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        render(screen, SCREEN_SIZE, clock)

if __name__ == '__main__':
    main()
```

In case you don't know, yes you do have to poll for events even though we're not processing any input as yet. Pygame must make a call to the event queue for each frame displayed. If you're writing code that doesn't need to accept events, you may want to consider the `pump` function. Check the <a href="https://www.pygame.org/docs/ref/event.html#pygame.event.pump" target="_blank" rel="nofollow noopener noreferrer">documentation</a> which talks more about polling events.

## Drawing Letters

Pygame make heavy use of rectangles, the Rect class is absolutely amazing and there's honestly no reason to be representing positions with tuples aside from utter simplicity - you lose out on so many spectacular methods and attributes! We got our screen to show 9 cells, so it seems natural in Pygame to have 9 rects. With that in mind, we'll be drawing our Xs and Os to the centre of a rectangle:

```python
def draw_letter(screen, letter, colour, position_rect):
    player_choice = board_font.render(letter, False, colour)
    # Fonts are draw to the top left of a Pygame rectangle
    # This game would look better if they're drawn to the centre
    # So after we generate a font image, create a special rectangle
    # that's the center of the cell's rectangle. So the image will
    # appear in the centre
    choice_rect = player_choice.get_rect(center=position_rect.center)
    # Blit is Pygame's way of drawing an image to a rectangle
    screen.blit(player_choice, choice_rect)
```

## Board Mechanics

So far we know we'll have 9 Pygame rectangles, we'll store them in a lists of lists, similar to a matrix. A 3x3 double list would allow us to easily check for winners later on. Along with the rectangle, each cell should say whether a player already used it (don't want a player stealing another one's cell) and whether it has an X or O if played. Let's setup the board.

```python
def initialise_board(screen_size):
    board = []
    counter = 1
    # First add 3 lists
    for i in range(3):
        board.append([])

    # Then we calculate the width and height of each cell
    # We want each cell to have an even amount of space
    rect_width = int(screen_size[0] / 3)
    rect_height = int(screen_size[1] / 3)
    # Now we have a list of lists, each list item will have a place to play
    # Outer list with contains each row
    top = 0
    for i in range(3):
        left = 0
        # Inner list which has 3 cells per row
        for j in range(3):
            board[i].append({
                'played': False,
                'player': str(counter), # Could be X or O, shows numbers by default
                'rect': pygame.Rect(left, top, rect_width, rect_height)
            })
            # Add more to the left values so cells don't overlap
            left += rect_width
            # Increment counter so that it goes up to 9
            counter += 1
        # Ensure that the top values are increased for every row
        top += rect_height
    return board
```

We show the numbers first to give the users a visual clue of what to press to play. A blank board to someone who doesn't know the setup would not be particularly helpful.

## Actually Playing

With our visual cues setup, we need to game to accept user input. Before we jump into mapping key presses to board positions, let's see all the mechanics and think about the game loop. Within the loop we accept user input, update the state and render the new state on the screen. For Tic Tac Toe, we'll first setup the board and other flags and then go into a loop: the user presses a number on the keyboard; if the users wins or game ends in stalemate stop the game and let them know; otherwise switch the player's turn and repeat.

Let's start with how the game is updated. From the requirements the first player is always X. After X plays we need to change the player to O and vice versa until the game ends. The game loop is always running, we need to ensure that the player change only occurs after someone made a move.

```python
def main():
    # This function sets up the game's start. It consists of the board, the
    # current turn's player and a flag to change the player's turn.
    def initialise():
        return {
                'board': initialise_board(SCREEN_SIZE),
                'player':  'X', # The first player will always be X
                'change_player': False # States whether the player attribute has to change
                }

    # Create a game object to store state
    game = initialise()

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        # First we collect all the keys pressed in this update
        keys_pressed = pygame.key.get_pressed()
        # If someone acted, update the game state to switch players
        game['change_player'] = update(game, keys_pressed)

        # Render screen will need board information, so add game to its parameters
        render(screen, SCREEN_SIZE, game, clock)

        # After the game is render, switch the current player if someone played
        if game['change_player']:
            if game['player'] == 'X':
                game['player'] = 'O'
            else:
                game['player'] = 'X'
```

Now let's define the update function:

```python
def update(game, keys_pressed):
    someone_played = False
    if ((keys_pressed[pygame.K_1] or keys_pressed[pygame.K_KP1])
            and not game['board'][0][0]['played']):
        game['board'][0][0]['played'] = True
        game['board'][0][0]['player'] = game['player']
        someone_played = True

    elif ((keys_pressed[pygame.K_2] or keys_pressed[pygame.K_KP2])
            and not game['board'][0][1]['played']):
        game['board'][0][1]['played'] = True
        game['board'][0][1]['player'] = game['player']
        someone_played = True

    elif ((keys_pressed[pygame.K_3] or keys_pressed[pygame.K_KP3])
            and not game['board'][0][2]['played']):
        game['board'][0][2]['played'] = True
        game['board'][0][2]['player'] = game['player']
        someone_played = True

    elif ((keys_pressed[pygame.K_4] or keys_pressed[pygame.K_KP4])
            and not game['board'][1][0]['played']):
        game['board'][1][0]['played'] = True
        game['board'][1][0]['player'] = game['player']
        someone_played = True

    elif ((keys_pressed[pygame.K_5] or keys_pressed[pygame.K_KP5])
            and not game['board'][1][1]['played']):
        game['board'][1][1]['played'] = True
        game['board'][1][1]['player'] = game['player']
        someone_played = True

    elif ((keys_pressed[pygame.K_6] or keys_pressed[pygame.K_KP6])
            and not game['board'][1][2]['played']):
        game['board'][1][2]['played'] = True
        game['board'][1][2]['player'] = game['player']
        someone_played = True

    elif ((keys_pressed[pygame.K_7] or keys_pressed[pygame.K_KP7])
            and not game['board'][2][0]['played']):
        game['board'][2][0]['played'] = True
        game['board'][2][0]['player'] = game['player']
        someone_played = True

    elif ((keys_pressed[pygame.K_8] or keys_pressed[pygame.K_KP8])
            and not game['board'][2][1]['played']):
        game['board'][2][1]['played'] = True
        game['board'][2][1]['player'] = game['player']
        someone_played = True

    elif ((keys_pressed[pygame.K_9] or keys_pressed[pygame.K_KP9])
            and not game['board'][2][2]['played']):
        game['board'][2][2]['played'] = True
        game['board'][2][2]['player'] = game['player']
        someone_played = True

    return someone_played
```

It's straightforward. If someone pressed a number, including those on the numpad (the keys with KP before the number), then save the player on that location and set the someone_played flag to True. Returning someone_played will allow us to switch players after someone plays.

The render function is now updated to show what's on the board: X, O or the keyboard number we set at the beginning. We'll draw X in blue and O in green. The numbers will be black.

```python
def render(screen, screen_size, game, clock):
    screen.fill(WHITE)
    draw_lines(screen, screen_size)

    # Draw the letters if they're played
    for row in game['board']:
        for cell in row:
            if cell['player'] == 'X':
                draw_letter(screen, 'X', BLUE, cell['rect'])
            elif cell['player'] == 'O':
                draw_letter(screen, 'O', GREEN, cell['rect'])
            else:
                draw_letter(screen, cell['player'], BLACK, cell['rect'])

    pygame.display.update()
    clock.tick(60)
```

## Getting The Winner

Now that we're able to play and switch players, we should look at determining the winner or the other end result - a stalemate. Let's start with the win function. It's simple enough, a player wins if she has 3 in a row, 3 in a column or 3 diagonally. All you got to remember is that the board is a list of lists, first index is the row and the second index is the column of that row.

```python
def winner(board, player):
    # Check win by row
    for row in board:
        if (row[0]['player'] == player and row[1]['player'] == player and
                row[2]['player'] == player):
            return True

    # Check win by column
    for i in range(3):
        if (board[0][i]['player'] == player and board[1][i]['player'] == player and
                board[2][i]['player'] == player):
            return True

    # Check diagonals
    if (board[0][0]['player'] == player and board[1][1]['player'] == player and
        board[2][2]['player'] == player):
        return True

    if (board[0][2]['player'] == player and board[1][1]['player'] == player and
        board[2][0]['player'] == player):
        return True

    return False
```

We also have to cater for the case that the game reaches the end and neither player wins. Given that we have a played variable, this just means we need to check whether every board position has played set to True.

```python
def is_stalemate(board):
    return all([all([r['played'] for r in row]) for row in board])
```

Let's include them to the main function now:

```python
def main():
    def initialise():
        return {
                'board': initialise_board(SCREEN_SIZE),
                'player':  'X',
                'win': False,
                'stalemate': False,
                'change_player': False
                }

    game = initialise()

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        keys_pressed = pygame.key.get_pressed()
        game['change_player'] = update(game, keys_pressed)
        game['win'] = winner(game['board'], game['player'])
        game['stalemate'] = is_stalemate(game['board'])

        render(screen, SCREEN_SIZE, game, clock)

        if game['change_player'] and not (game['win'] or game['stalemate']):
            if game['player'] == 'X':
                game['player'] = 'O'
            else:
                game['player'] = 'X'
```

We've made a few additions to main update. Firstly, the initial state now includes two flags for winning or stalemate. After the game is updated we check to see if a player won, and then check if it's a stalemate. Note that with our current logic, a game can be won and stalemate at the same time. At this point we want to use these variables to show the user who won, and all allow them to restart the match by hitting spacebar.

### Wrapping It Up

Let's allow the game to be played over and over again, we'll do this by rendering two messages: the first stating who won if someone did, the second informing the user to press spacebar to restart. After that we'll modify the main function so that if the game is ended, the user can press spacebar to restart it.

As the messages are essentially the same and just need their content changed, let's create a function to display both messages. We created two fonts earlier, so we'll ensure the function handles both as well.

```python
def end_game_message(screen, screen_size, main_message, main_font,
        replay_message, replay_font, colour):
    main_text = main_font.render(main_message, False, colour)
    main_rect = main_text.get_rect(center=(screen_size[0]/2, screen_size[1]/2))
    screen.blit(main_text, main_rect)
    replay_text = replay_font.render(replay_message, False, colour)
    replay_rect = replay_text.get_rect(center=(screen_size[0]/2,
        main_rect.bottom + 30))
    screen.blit(replay_text, replay_rect)
```

Pretty straightforward: setup the font, get it's rect and place on the screen. When including this in our render function, we need this message to appear in front of the other objects on the screen (so we render it last) and we need to ensure it only appears when the game has ended.

```python
def render(screen, screen_size, game, clock):
    screen.fill(WHITE)
    draw_lines(screen, screen_size)

    # Draw the letters if they're played
    for row in game['board']:
        for cell in row:
            if cell['player'] == 'X':
                draw_letter(screen, 'X', BLUE, cell['rect'])
            elif cell['player'] == 'O':
                draw_letter(screen, 'O', GREEN, cell['rect'])
            else:
                draw_letter(screen, cell['player'], BLACK, cell['rect'])

    if game['win']:
        win_message = 'Player ' + game['player'] + ' won!'
        end_game_message(screen, SCREEN_SIZE, win_message, game_over_font,
                REPLAY_MESSAGE, replay_font, RED)
    elif not game['win'] and game['stalemate']:
        stale_message = 'Stalemate!'
        end_game_message(screen, SCREEN_SIZE, stale_message, game_over_font,
                REPLAY_MESSAGE, replay_font, RED)

    pygame.display.update()
    clock.tick(60)
```

Recall that with our previous logic that if someone wins on the last move, then the game's win and stalemate flags would both be True. To ensure we display the right message, we always show the winning message once someone wins and we only show the stalemate message if it's also true that no one won. If you play a game you'll see the message pop up! Now all we need to do is modify it so that spacebar resets the game.

```python
def main():
    def initialise():
        return {
                'board': initialise_board(SCREEN_SIZE),
                'player':  'X',
                'win': False,
                'stalemate': False,
                'change_player': False
                }

    game = initialise()

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        keys_pressed = pygame.key.get_pressed()
        # The game only updates if no one won and there's space to play
        if not (game['win'] or game['stalemate']):
            game['change_player'] = update(game, keys_pressed)
        else:
            # Only allow a reset if the game is over
            if keys_pressed[pygame.K_SPACE]:
                game = initialise()

        game['win'] = winner(game['board'], game['player'])
        game['stalemate'] = is_stalemate(game['board'])

        render(screen, SCREEN_SIZE, game, clock)

        # Well if the last move didn't win/end the game, switch to the other player
        if game['change_player'] and not (game['win'] or game['stalemate']):
            if game['player'] == 'X':
                game['player'] = 'O'
            else:
                game['player'] = 'X'
```

We only allow the spacebar to reset the game when it's over and to ensure that the user can't play while the game is over we add some checks by the update function and the player switch logic. Without resetting the game with spacebar, the game would not update. And that's our game! If in doubt, you can compare your source code to <a href="https://gist.github.com/msanatan/fc7eb982e3f7f5842f19c8e6d5a3759d" target="_blank" rel="nofollow noopener noreferrer">mine</a>. There are slight differences in the order but this is everything.

## One More Thing

I'm sure the vast majority of your friends won't be going on the command line to run Python files and play your game. Let's package it in a format they can easily use. <a href="https://anthony-tuininga.github.io/cx_Freeze/" target="_blank" rel="nofollow noopener noreferrer">cx_Freeze</a> takes your Python scripts and makes them into executables. It's perfect for what we want. Install with pip `pip install cx_Freeze` and create a *setup.py* file in your directory with the following content:

```python
import cx_Freeze

executables = [cx_Freeze.Executable('tictactoe.py')]

cx_Freeze.setup(
        name='Tic Tac Toe',
        version='1.0.0',
        description='Tic Tac Toe for the masses',
        options={'build_exe': {
            'packages': ['pygame']
            }},
        executables=executables
        )
```

There isn't much to this script, just telling cx_Freeze where's the file, some metadata and the library needed for the file to work. I'm using macOS, to get my installer I run `python setup.py bdist_dmg`. For Windows OSes your last arugment will be bdist_msi. If you just want an executable without an installer, simply use 'build' as the last argument. Definitely read the docs and play with it!

## Next Steps

Well done on making it through this tutorial, you got a fully functional game on your hands! There are some ways we can improve it, try your hand at the following:

1. Allow for plays to be made with mouse clicks
2. Add a victory sound if someone wins
3. Make the game fullscreen
4. If using cx_Freeze, the build size is quite large. Looks for ways to reduce it (hint: check out the 'excludes' argument)

Hope you enjoyed, happy hacking!
